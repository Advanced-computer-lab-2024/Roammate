const { default: mongoose } = require("mongoose");
const {
  Activity,
  PreferenceTag,
  ActivityCategory,
  ActivityBooking,
  Review,
} = require("../models");
const convertCurrency = require("./CurrencyConvertController");
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
    .populate("advertiser", "username")
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
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteActivityById = (req, res) => {
  const activityId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).json({ error: "Invalid activity id" });
  }
  Activity.findByIdAndDelete(activityId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.status(204).send({ message: "Activity deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
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
  let filter = {};
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
      .sort({ date: 1 });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addActivityBooking = async (req, res) => {
  const { activityId, userId, date } = req.body;
  try {
    const booking = new ActivityBooking({
      activity: activityId,
      user: userId,
      date,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteActivityBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await ActivityBooking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  addActivityBooking,
  deleteActivityBooking,
};
