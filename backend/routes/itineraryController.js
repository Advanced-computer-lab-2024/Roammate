const Itinerary = require("../models/itineraryModel");

// Create an itinerary
exports.createItinerary = async (req, res) => {
  const {
    name,
    activities,
    location,
    price,
    language,
    availableDates,
    pickUpDropOffLocation,
    accessibility,
    duration,
  } = req.body;

  try {
    const newItinerary = new Itinerary({
      name,
      activities,
      location,
      price,
      language,
      availableDates,
      pickUpDropOffLocation,
      accessibility,
      duration,
    });

    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate("activities");
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an itinerary by ID
exports.getItineraryById = async (req, res) => {
  const { id } = req.params;

  try {
    const itinerary = await Itinerary.findById(id).populate("activities");
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an itinerary by ID
exports.updateItinerary = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    ).populate("activities");
    if (!updatedItinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an itinerary by ID
exports.deleteItinerary = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Itinerary.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Filter itineraries by budget, date, location, language, etc.
exports.filterItineraries = async (req, res) => {
  const { budget, date, location, language } = req.query;
  let filter = {};

  // Filter by budget (price range)
  if (budget) {
    const [minPrice, maxPrice] = budget.split(",");
    filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
  }

  // Filter by date (check if the itinerary is available on or after a given date)
  if (date) {
    filter["availableDates.startDate"] = { $lte: new Date(date) };
    filter["availableDates.endDate"] = { $gte: new Date(date) };
  }

  // Filter by location
  if (location) {
    filter.location = location;
  }

  // Filter by language
  if (language) {
    filter.language = language;
  }

  try {
    const itineraries = await Itinerary.find(filter).populate("activities");
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
