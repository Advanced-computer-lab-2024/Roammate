const { Itinerary } = require("../models");
const mongoose = require("mongoose");
const { PreferenceTag } = require("../models");
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
  try {
    const itineraries = await Itinerary.find()
      .populate("tags")
      .populate("tourGuide", "username")
      .populate("reviews");
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an itinerary by ID
const getItineraryById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const itinerary = await Itinerary.findById(id)
      .populate("tags", "name")
      .populate("tourGuide", "username")
      .populate("reviews");
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.status(200).json(itinerary);
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
  console.log(`tags matching ${query}:`, tagIds);

  const itineraryIds = await Itinerary.find({
    $text: { $search: query },
  }).select("_id");
  console.log(`itineraries matching ${query}:`, itineraryIds);

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
  let filter = {};
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
  const { query, minPrice, maxPrice, minDate, maxDate, lang, tags, order } =
    req.query;
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
  console.log("combined criteria: ", {
    ...searchCriteria,
    ...filterCriteria,
  });
  try {
    const itineraries = await Itinerary.find({
      ...searchCriteria,
      ...filterCriteria,
    })
      .sort(sortCriteria)
      .populate("tags", "name")
      .populate("tourGuide", "username")
      .populate("reviews");
    console.log("itineraries", itineraries);
    res.status(200).json(itineraries);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const getItinerariesByTourGuideId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const itineraries = await Itinerary.find({ tourGuide: id })
      .populate("tags", "name")
      .populate("tourGuide", "username")
      .populate("reviews");
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
};
