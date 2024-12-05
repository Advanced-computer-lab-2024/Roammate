const { Itinerary, Review, ItineraryBooking,Tourist } = require("../models");
const mongoose = require("mongoose");
const { PreferenceTag } = require("../models");
const convertCurrency = require("./CurrencyConvertController");
const {
  payCashFromWallet,
  refundCashToWallet,
} = require("./touristController");
const sendEmail = require("../utils/nodeMailer");
/* title, duration, startDate, endDate, timeline(day,startTime, activity,location,description,accessibility),
 price, lang, pickUpLocation, dropOffLocation, isBookingAvailable, tags, reviews, averageRating, tourGuide
  */

// Create an itinerary
const createItinerary = async (req, res) => {
  const {
    title,
    duration,
    startDate,
    endDate,
    timeline,
    price,
    lang,
    pickUpLocation,
    dropOffLocation,
    isBookingAvailable,
    tags,
    tourGuide,
  } = req.body;

  try {
    const newItinerary = new Itinerary({
      title,
      duration,
      startDate,
      endDate,
      timeline,
      price,
      lang,
      pickUpLocation,
      dropOffLocation,
      isBookingAvailable,
      tags,
      tourGuide,
    });
    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all itineraries
const getAllItineraries = async (req, res) => {
  const { currency = "USD" } = req.query; // Default currency is USD
  try {
    const itineraries = await Itinerary.find()
      .populate("tags")
      .populate("tourGuide")
      .populate("reviews");

    const convertedItineraries = itineraries.map((itinerary) => {
      const convertedPrice = convertCurrency(itinerary.price, "USD", currency);
      return {
        ...itinerary.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      };
    });
    res.status(200).json(convertedItineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an itinerary by ID
const getItineraryById = async (req, res) => {
  const { id } = req.params;
  const { currency = "USD" } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const itinerary = await Itinerary.findById(id)
      .populate("tags", "name")
      .populate("tourGuide", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    const convertedPrice = convertCurrency(itinerary.price, "USD", currency);
    res.status(200).json({
      ...itinerary.toObject(),
      price: convertedPrice.toFixed(2),
      currency,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an itinerary by ID
const updateItineraryById = async (req, res) => {
  const { id } = req.params;
  const updatedData = ({
    title,
    duration,
    startDate,
    endDate,
    timeline,
    price,
    lang,
    pickUpLocation,
    dropOffLocation,
    isBookingAvailable,
    tags,
    reviews,
    averageRating,
    tourGuide,
  } = req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!updatedItinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete an itinerary by ID
const deleteItineraryById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const result = await Itinerary.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//search itineraries by title, tags
const getSearchCriteria = async (query) => {
  if (!query) return {};
  // First, find the tags by name
  const tagIds = await PreferenceTag.find({ $text: { $search: query } }).select(
    "_id"
  );
  // console.log(`tags matching ${query}:`, tagIds);

  const itineraryIds = await Itinerary.find({
    $text: { $search: query },
  }).select("_id");
  // console.log(`itineraries matching ${query}:`, itineraryIds);

  const searchCriteria = {
    $or: [{ tags: { $in: tagIds } }, { _id: { $in: itineraryIds } }],
  };

  return searchCriteria;
};

// price or rating
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

//budget, date, lang, and preference tags
const getFilterCriteria = (
  minPrice,
  maxPrice,
  minDate,
  maxDate,
  lang,
  tags
) => {
  let filter = { Appropriate: true };
  filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
  if (minDate) filter.startDate = { $gte: new Date(minDate) };
  if (maxDate) filter.endDate = { $lte: new Date(maxDate) };
  if (lang) {
    filter.lang = lang;
  }
  if (tags) {
    filter.tags = {
      $in: tags.split(",").map((tag) => new mongoose.Types.ObjectId(tag)),
    };
  }
  return filter;
};

const searchItinerariesWithFiltersAndSort = async (req, res) => {
  const {
    query,
    minPrice,
    maxPrice,
    minDate,
    maxDate,
    lang,
    tags,
    order,
    currency = "USD",
  } = req.query;
  const searchCriteria = await getSearchCriteria(query);
  const filterCriteria = getFilterCriteria(
    minPrice,
    maxPrice,
    minDate,
    maxDate,
    lang,
    tags
  );
  const sortCriteria = getSortCriteria(order);

  try {
    const itineraries = await Itinerary.find({
      ...searchCriteria,
      ...filterCriteria,
    })
      .sort(sortCriteria)
      .populate("tags", "name")
      .populate("tourGuide", "username")
      .populate("reviews");

    const convertedItineraries = itineraries.map((itinerary) => {
      const convertedPrice = convertCurrency(itinerary.price, "USD", currency);
      return {
        ...itinerary.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      };
    });
    res.status(200).json(convertedItineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItinerariesByTourGuideId = async (req, res) => {
  const { id } = req.params;
  const { currency = "USD" } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const itineraries = await Itinerary.find({ tourGuide: id })
      .populate("tags", "name")
      .populate("tourGuide", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

    const convertedItineraries = itineraries.map((itinerary) => {
      const convertedPrice = convertCurrency(itinerary.price, "USD", currency);
      return {
        ...itinerary.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      };
    });
    res.status(200).json(convertedItineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReviewToItinerary = async (req, res) => {
  const itineraryId = req.params.id;
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
    const itinerary = await Itinerary.findById(itineraryId)
      .populate("reviews")
      .populate("tourGuide");

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    const OldTtotalRating = itinerary.averageRating * itinerary.reviews.length;

    itinerary.reviews.push(reviewId);

    const newTotalRating = OldTtotalRating + rating;

    const newAverageRating = newTotalRating / itinerary.reviews.length;

    // console.log(`OldTtotalRating: ${OldTtotalRating},
    //   newTotalRating: ${newTotalRating},
    //   newAverageRating: ${newAverageRating}`);
    itinerary.averageRating = newAverageRating;

    const updatedItinerary = await itinerary.save();

    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookedItinerariesByTouristId = async (req, res) => {
  const id = req.params.id;
  try {
    const itineraries = await ItineraryBooking.find({ user: id })
      .populate({
        path: "itinerary",
        populate: [
          { path: "tourGuide" },
          { path: "tags", select: "name" },
          {
            path: "reviews", // populate reviews within activity
            populate: { path: "user" }, // populate user within each review
          },
        ],
      })
      .populate("user")
      .sort({ date: -1 });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkTouristHasBookedItinerary = async (
  itineraryId,
  userId,
  bookingDate
) => {
  try {
    const bookingExists = await ItineraryBooking.exists({
      itinerary: itineraryId,
      user: userId,
      date: bookingDate,
    });
    return bookingExists;
  } catch (error) {
    throw error;
  }
};

const addItineraryBooking = async (itineraryId, userId, bookingDate) => {
  try {
    const booking = new ItineraryBooking({
      itinerary: itineraryId,
      user: userId,
      date: bookingDate,
    });
    await booking.save();
  } catch (error) {
    throw error;
  }
};

const bookItinerary = async (req, res) => {
  const { itineraryId, userId, bookingDate, amount } = req.body;
  // Check if the user has already booked the itinerary on the same date
  const bookingExists = await checkTouristHasBookedItinerary(
    itineraryId,
    userId,
    bookingDate
  );
  if (bookingExists) {
    return res.status(409).json({
      error: "You have already booked this itinerary on this date",
    });
  }
  //pay for the itinerary
  try {
    await payCashFromWallet(userId, amount);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // Add the booking to the itinerary
  try {
    await addItineraryBooking(itineraryId, userId, bookingDate);
    res.status(201).json({ message: "Itinerary booked successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const cancelItineraryBooking = async (req, res) => {
  const id = req.params.id;
  const { userId, refundAmount } = req.body;
  try {
    await refundCashToWallet(userId, refundAmount);
    await ItineraryBooking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleItineraryActivation = async (req, res) => {
  try {
    const { id } = req.params.id;

    // Retrieve the current itinerary to get the current `isActive` value
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Toggle the `isActive` value
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      { _id: id },
      { isActive: !itinerary.isActive },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: `Itinerary successfully ${
        updatedItinerary.isActive ? "activated" : "deactivated"
      }`,
      itinerary: updatedItinerary,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const toggleAppropriateItinerary = async (req, res) => {
  try {
    const { id } = req.params;

    const itinerary = await Itinerary.findById(id)
      .populate("tourGuide", "email notifications");;

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    const tourGuide = itinerary.tourGuide;

    // If the itinerary is being marked inappropriate, add a notification
    if (itinerary.Appropriate) {
      // Add notification to the tourGuide's notifications
      tourGuide.notifications.push({
        message: `Your itinerary "${itinerary.title}" has been marked inappropriate.`,
      });
      await tourGuide.save();

      // Send email notification
      sendEmail(
        tourGuide.email,
        "Itinerary marked inappropriate",
        `Your itinerary "${itinerary.title}" has been marked inappropriate. Please review it.`
      );
    }

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      { _id: id },
      { Appropriate: !itinerary.Appropriate },
      { new: true }
    );

    res.status(200).json({
      message: `Itinerary is now ${
        updatedItinerary.Appropriate ? "Appropriate" : "inAppropriate"
      }`,
      itinerary: updatedItinerary,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getItineraryBookingsCount = async (req, res) => {
  const itineraryId = req.params.id;
  try {
    const bookingsCount = await ItineraryBooking.countDocuments({
      itinerary: itineraryId,
      date: { $gte: new Date() },
    });
    res.status(200).json(bookingsCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBookmark = async (req, res) => {
  try {
    const { touristId, itineraryId } = req.body;

    // Validate that the itinerary exists
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: "itinerary not found" });
    }

    // Find the tourist
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Check if the itinerary is already bookmarked
    if (tourist.bookmarkedItineraries.includes(itineraryId)) {
      return res.status(400).json({ message: "itinerary already bookmarked" });
    }

    // Add the itinerary to bookmarkeditinerary
    tourist.bookmarkedItineraries.push(itineraryId);
    await tourist.save();

    res.status(200).json({ message: "itinerary bookmarked successfully", bookmarkedItineraries: tourist.bookmarkedItineraries });
  } catch (error) {
    res.status(500).json({ message: "Error bookmarking itinerary", error: error.message });
  }
};

const getBookmarkeditinerary = async (req, res) => {
  try {
    const { touristId } = req.query;

    // Find the tourist and populate the bookmarked Itineraries
    const tourist = await Tourist.findById(touristId).populate("bookmarkedItineraries");

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    console.log("Bookmarked Itineraries:", tourist.bookmarkedItineraries); // Log to check the data
    res.status(200).json({ bookmarkedItineraries: tourist.bookmarkedItineraries });
  } catch (error) {
    console.error("Error retrieving bookmarked Itineraries:", error); // Log the actual error
    res.status(500).json({ message: "Error retrieving bookmarked Itineraries", error: error.message });
  }
};

module.exports = {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItineraryById,
  deleteItineraryById,
  searchItinerariesWithFiltersAndSort,
  getItinerariesByTourGuideId,
  addReviewToItinerary,
  getBookedItinerariesByTouristId,
  bookItinerary,
  cancelItineraryBooking,
  toggleItineraryActivation,
  toggleAppropriateItinerary,
  getItineraryBookingsCount,
  addBookmark,
  getBookmarkeditinerary,
};
