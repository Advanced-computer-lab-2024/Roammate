const Itinerary = require("../models/itineraryModel");

// Create a preference tag
const createItinerary = async (req, res) => {
  res.status(201).json(5);
};

module.exports = {
  createItinerary,
};