const { default: mongoose } = require("mongoose");
const {
  Activity,
  PreferenceTag,
  ActivityCategory,
  ActivityBooking,
  Review,
  Tourist,
  User,
} = require("../models");
const convertCurrency = require("./CurrencyConvertController");
const {
  payCashFromWallet,
  refundCashToWallet,
} = require("./touristController");
const sendEmail = require("../utils/nodeMailer");
/* title, description, location, price, category, tags, 
discount, startDate, endDate, time, isBookingAvailable, reviews, advertiser, averageRating
*/
const createActivity = async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    category,
    tags,
    advertiser,
    discount,
    startDate,
    endDate,
    time,
    isBookingAvailable,
  } = req.body;

  try {
    const activity = new Activity({
      title,
      description,
      location,
      price,
      category,
      tags,
      advertiser,
      discount,
      startDate,
      endDate,
      time,
      isBookingAvailable,
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllActivities = (req, res) => {
  const { currency = "USD" } = req.query; // Default currency is USD
  Activity.find()
    .populate("tags", "name")
    .populate("category", "name")
    .populate("advertiser")
    .populate("reviews")
    .then((activities) => {
      const convertedActivities = activities.map((activity) => {
        const convertedPrice = convertCurrency(activity.price, "USD", currency);
        return {
          ...activity.toObject(),
          price: convertedPrice.toFixed(2),
          currency,
        };
      });
      res.status(200).json(convertedActivities);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const getActivityById = (req, res) => {
  const { currency = "USD" } = req.query;
  const activityId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ error: "Invalid activity id" });
  }
  Activity.findById(activityId)
    .populate("tags", "name")
    .populate("category", "name")
    .populate("advertiser", "username")
    .populate({
      path: "reviews",
      populate: { path: "user" },
    })
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      const convertedPrice = convertCurrency(activity.price, "USD", currency);
      res.status(200).json({
        ...activity.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const updateActivityById = async (req, res) => {
  const activityId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ error: "Invalid activity id" });
  }
  const {
    title,
    description,
    location,
    price,
    category,
    tags,
    discount,
    startDate,
    endDate,
    time,
    isBookingAvailable,
    reviews,
    averageRating,
  } = req.body;
  try {
    // Find the existing activity to check its current state
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      {
        title,
        description,
        location,
        price,
        category,
        tags,
        discount,
        startDate,
        endDate,
        time,
        isBookingAvailable,
        reviews,
        averageRating,
      },
      { new: true, runValidators: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    // Check if isBookingAvailable changed to true
    if (!activity.isBookingAvailable && isBookingAvailable) {
      for (const touristId of activity.interestedTourists) {
        const user = await User.findById(touristId); // Use the User model to find the tourist
        if (user) {
          user.notifications.push({
            message: `Booking is now available for activity: ${updatedActivity.title}`,
          });
          sendEmail(
            user.email,
            "Booking available for activity",
            `Booking is now available for activity: ${updatedActivity.title}`
          );
          await user.save();
        }
      }
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteActivityById = async (req, res) => {
  const activityId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ error: "Invalid activity id" });
  }
  //check activity has no bookings
  const activityHasBookings = await ActivityBooking.exists({
    activity: activityId,
    date: { $gte: new Date() },
  });
  // console.log(activityHasBookings);
  if (activityHasBookings) {
    return res.status(409).json({
      error: "Activity has active bookings. Cannot delete activity",
    });
  }

  try {
    const deletedActivity = await Activity.findByIdAndDelete(activityId);
    if (!deletedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//title, category and tags
const getSearchCriteria = async (query) => {
  if (query === "") return {};
  const tagIds = await PreferenceTag.find({ $text: { $search: query } }).select(
    "_id"
  );
  const categoryIds = await ActivityCategory.find({
    $text: { $search: query },
  }).select("_id");
  const activityIds = await Activity.find({ $text: { $search: query } }).select(
    "_id"
  );
  const searchCriteria = {
    $or: [
      { _id: { $in: activityIds } },
      { tags: { $in: tagIds } },
      { category: { $in: categoryIds } },
    ],
  };
  return searchCriteria;
};

//price, date, category, tags and rating
const getFilterCriteria = (
  minPrice,
  maxPrice,
  minDate,
  maxDate,
  category,
  tags,
  minRating,
  maxRating
) => {
  let filter = { Appropriate: true };
  filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
  if (minDate) {
    filter.startDate = { $gte: new Date(minDate) };
  }
  if (maxDate) {
    filter.endDate = { $lte: new Date(maxDate) };
  }
  if (category) {
    filter.category = {
      $in: category
        .split(",")
        .map((category) => new mongoose.Types.ObjectId(category)),
    };
  }
  if (tags) {
    filter.tags = {
      $in: tags.split(",").map((tag) => new mongoose.Types.ObjectId(tag)),
    };
  }
  filter.averageRating = { $gte: minRating || 0, $lte: maxRating || 5 };
  return filter;
};

//price or rating
const getSortCriteria = (order) => {
  const sortCriteria = {};
  if (order === "price") {
    sortCriteria.price = 1;
  } else if (order === "-price") {
    sortCriteria.price = -1;
  } else if (order === "rating") {
    sortCriteria.averageRating = 1;
  } else if (order === "-rating") {
    sortCriteria.averageRating = -1;
  } else {
    sortCriteria.averageRating = -1;
  }
  return sortCriteria;
};

const searchActivitiesWithFiltersAndSort = async (req, res) => {
  const {
    query,
    minPrice,
    maxPrice,
    minDate,
    maxDate,
    category,
    tags,
    minRating,
    maxRating,
    order,
    currency = "USD", // Default currency is USD
  } = req.query;
  // console.log(
  //   minPrice,
  //   maxPrice,
  //   minDate,
  //   maxDate,
  //   category,
  //   tags,
  //   minRating,
  //   maxRating,
  //   order,
  //   currency
  // );
  try {
    const searchCriteria = await getSearchCriteria(query);
    const filterCriteria = getFilterCriteria(
      minPrice,
      maxPrice,
      minDate,
      maxDate,
      category,
      tags,
      minRating,
      maxRating
    );
    const sortCriteria = getSortCriteria(order);
    const activities = await Activity.find({
      ...searchCriteria,
      ...filterCriteria,
    })
      .populate("tags", "name")
      .populate("category", "name")
      .populate("advertiser", "username")
      .populate("reviews")
      .sort(sortCriteria);

    const convertedActivities = activities.map((activity) => {
      const convertedPrice = convertCurrency(activity.price, "USD", currency);
      return {
        ...activity.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      };
    });
    res.status(200).json(convertedActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivitiesByAdvertiserId = async (req, res) => {
  const { currency = "USD" } = req.query;
  const id = req.params.id;
  try {
    const activities = await Activity.find({ advertiser: id })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("advertiser", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

    const convertedActivities = activities.map((activity) => {
      const convertedPrice = convertCurrency(activity.price, "USD", currency);
      return {
        ...activity.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      };
    });
    res.status(200).json(convertedActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addReviewToActivity = async (req, res) => {
  const activityId = req.params.id;
  const { user, rating, comment, date } = req.body;
  try {
    const newReview = new Review({
      user,
      rating,
      comment,
      date,
    });
    const reviewId = newReview._id;
    await newReview.save();
    const activity = await Activity.findById(activityId).populate("reviews");

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    const OldTtotalRating = activity.averageRating * activity.reviews.length;

    activity.reviews.push(reviewId);

    const newTotalRating = OldTtotalRating + rating;

    const newAverageRating = newTotalRating / activity.reviews.length;

    // console.log(`OldTtotalRating: ${OldTtotalRating},
    //   newTotalRating: ${newTotalRating},
    //   newAverageRating: ${newAverageRating}`);
    activity.averageRating = newAverageRating;

    const updatedActivity = await activity.save();

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookedActivitiesByTouristId = async (req, res) => {
  const id = req.params.id;
  try {
    const activities = await ActivityBooking.find({ user: id })
      .populate({
        path: "activity",
        populate: [
          { path: "advertiser", select: "username" },
          { path: "category", select: "name" },
          { path: "tags", select: "name" },
          {
            path: "reviews", // populate reviews within activity
            populate: { path: "user" }, // populate user within each review
          },
        ],
      })
      .populate("user")
      .sort({ date: -1 });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkTouristHasBookedActivity = async (
  activityId,
  userId,
  bookingDate
) => {
  try {
    const bookingExists = await ActivityBooking.exists({
      activity: activityId,
      user: userId,
      date: bookingDate,
    });
    return bookingExists;
  } catch (error) {
    throw error;
  }
};

const addActivityBooking = async (activityId, userId, bookingDate) => {
  try {
    const booking = new ActivityBooking({
      activity: activityId,
      user: userId,
      date: bookingDate,
    });
    await booking.save();
  } catch (error) {
    throw error;
  }
};

const bookActivity = async (req, res) => {
  const { activityId, userId, bookingDate, amount } = req.body;
  //check if tourist has already booked the activity
  const touristHasBookedActivityBefore = await checkTouristHasBookedActivity(
    activityId,
    userId,
    bookingDate
  );
  if (touristHasBookedActivityBefore) {
    return res.status(409).json({
      error: "You have already booked this activity on this date",
    });
  }
  //pay for the activity
  try {
    await payCashFromWallet(userId, amount);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  //add booking to the activity
  try {
    await addActivityBooking(activityId, userId, bookingDate);
    res.status(201).json({ message: "Activity booked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelActivityBooking = async (req, res) => {
  const id = req.params.id;
  const { userId, refundAmount } = req.body;
  try {
    await refundCashToWallet(userId, refundAmount);
    await ActivityBooking.findByIdAndDelete(id);
    res.status(204).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkActivityBookingExists = async (req, res) => {
  const { activityId } = req.params;
  try {
    const bookingExists = await ActivityBooking.exists({
      activity: activityId,
    });

    if (bookingExists) {
      res.status(200).json(true);
    } else {
      res.status(404).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleAppropriateActivity = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the activity and populate advertiser details
    const activity = await Activity.findById(id).populate(
      "advertiser",
      "email notifications"
    );

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const advertiser = activity.advertiser;

    // If the activity is being marked inappropriate, add a notification
    if (activity.Appropriate) {
      // Add notification to the advertiser's notifications
      advertiser.notifications.push({
        message: `Your activity "${activity.title}" has been marked inappropriate.`,
      });
      await advertiser.save();

      // Send email notification
      sendEmail(
        advertiser.email,
        "Activity marked inappropriate",
        `Your activity "${activity.title}" has been marked inappropriate. Please review it.`
      );
    }

    // Toggle the "Appropriate" property of the activity
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { Appropriate: !activity.Appropriate },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: `Activity is now ${
        updatedActivity.Appropriate ? "Appropriate" : "Inappropriate"
      }`,
      activity: updatedActivity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getActivityBookingsCount = async (req, res) => {
  const activityId = req.params.id;
  try {
    const bookingsCount = await ActivityBooking.countDocuments({
      activity: activityId,
      date: { $gte: new Date() },
    });
    res.status(200).json(bookingsCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addBookmark = async (req, res) => {
  try {
    const { touristId, activityId } = req.body;
    //console.log("Tourist ID add bookmark:", touristId); // Log to check

    // Validate that the activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Find the tourist
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Check if the activity is already bookmarked
    if (tourist.bookmarkedActivities.includes(activityId)) {
      return res.status(400).json({ message: "Activity already bookmarked" });
    }

    // Add the activity to bookmarkedActivities
    tourist.bookmarkedActivities.push(activityId);
    await tourist.save();

    res.status(200).json({
      message: "Activity bookmarked successfully",
      bookmarkedActivities: tourist.bookmarkedActivities,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error bookmarking activity", error: error.message });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const { touristId, activityId } = req.query;
    // console.log("Tourist ID remove bookmark:", touristId); // Log to check
    // Find the tourist
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Check if the activity is bookmarked
    if (!tourist.bookmarkedActivities.includes(activityId)) {
      return res.status(400).json({ message: "Activity not bookmarked" });
    }

    // Remove the activity from bookmarkedActivities
    tourist.bookmarkedActivities = tourist.bookmarkedActivities.filter(
      (id) => id.toString() !== activityId
    );
    await tourist.save();

    res.status(200).json({
      message: "Activity removed from bookmarks",
      bookmarkedActivities: tourist.bookmarkedActivities,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing bookmark", error: error.message });
  }
};

const getBookmarkedActivities = async (req, res) => {
  try {
    const { touristId } = req.query;
    //console.log("Tourist ID:", touristId); // Log to check

    // Find the tourist and populate the bookmarked activities
    const tourist = await Tourist.findById(touristId).populate(
      "bookmarkedActivities"
    );

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    //console.log("Bookmarked activities:", tourist.bookmarkedActivities); // Log to check the data
    res
      .status(200)
      .json({ bookmarkedActivities: tourist.bookmarkedActivities });
  } catch (error) {
    console.error("Error retrieving bookmarked activities:", error); // Log the actual error
    res.status(500).json({
      message: "Error retrieving bookmarked activities",
      error: error.message,
    });
  }
};

const addInterestToActivity = async (req, res) => {
  try {
    const { touristId, activityId } = req.body;

    // Find the activity and check if the tourist is already interested
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.interestedTourists.includes(touristId)) {
      return res
        .status(400)
        .json({ message: "Tourist already interested in this activity" });
    }

    // Add the tourist to the interestedTourists array
    activity.interestedTourists.push(touristId);
    await activity.save();

    res
      .status(200)
      .json({ message: "Tourist added to the interested list", activity });
  } catch (error) {
    res.status(500).json({
      message: "Error adding tourist to activity",
      error: error.message,
    });
  }
};

const removeInterestFromActivity = async (req, res) => {
  try {
    const { touristId, activityId } = req.query;

    // Find the activity and check if the tourist is interested
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (!activity.interestedTourists.includes(touristId)) {
      return res
        .status(400)
        .json({ message: "Tourist is not interested in this activity" });
    }

    // Remove the tourist from the interestedTourists array
    activity.interestedTourists = activity.interestedTourists.filter(
      (id) => id.toString() !== touristId
    );
    await activity.save();

    res
      .status(200)
      .json({ message: "Tourist removed from the interested list", activity });
  } catch (error) {
    res.status(500).json({
      message: "Error removing tourist from activity",
      error: error.message,
    });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
  searchActivitiesWithFiltersAndSort,
  getActivitiesByAdvertiserId,
  addReviewToActivity,
  getBookedActivitiesByTouristId,
  bookActivity,
  cancelActivityBooking,
  checkActivityBookingExists,
  toggleAppropriateActivity,
  getActivityBookingsCount,
  addBookmark,
  getBookmarkedActivities,
  addInterestToActivity,
  removeBookmark,
  removeInterestFromActivity,
};
