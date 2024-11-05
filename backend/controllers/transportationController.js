const Transportation = require('../models/Transportation');
const Tourist = require('../models/Tourist');
const mongoose = require('mongoose');

// Add new transportation (for advertisers)
const addTransportation = async (req, res) => {
    try {
        const { name, vehicle, capacity, departureTime, price, from, to, advertiser } = req.body;
        const seatsAvailable = capacity; // Initialize seatsAvailable with the total capacity

        const newTransportation = new Transportation({
            name,
            vehicle,
            capacity,
            seatsAvailable,
            departureTime,
            price,
            from,
            to,
            advertiser,
        });

        await newTransportation.save();
        res.status(201).json({ message: "Transportation added successfully", transportation: newTransportation });
    } catch (error) {
        console.error("Error adding transportation:", error);
        res.status(500).json({ message: "Failed to add transportation", error });
    }
};

// Get available transportation by filters (like departure location, destination, etc.)
const getTransportationList = async (req, res) => {
    try {
        const { from, to, departureTime } = req.query;
        const filters = { availability: true }; // Only show available transportations

        if (from) filters.from = from;
        if (to) filters.to = to;
        if (departureTime) filters.departureTime = new Date(departureTime);

        const transportationList = await Transportation.find(filters);
        res.status(200).json(transportationList);
    } catch (error) {
        console.error("Error retrieving transportation list:", error);
        res.status(500).json({ message: "Failed to retrieve transportation list", error });
    }
};

const bookTransportation = async (req, res) => {
    const { touristId, transportationId, seatsRequested } = req.body;

    try {
        // Find the tourist
        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        // Find the transportation
        const transportation = await Transportation.findById(transportationId);
        if (!transportation) {
            return res.status(404).json({ message: "Transportation not found" });
        }

        // Check if there are enough seats available
        if (transportation.seatsAvailable < seatsRequested) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        // Update seatsAvailable
        transportation.seatsAvailable -= seatsRequested; // Decrease available seats
        await transportation.save(); // Save changes

        // Add the transportation to the tourist's booked transportations
        tourist.bookedTransportations.push(transportationId);
        await tourist.save(); // Save changes to the tourist

        res.status(200).json({ message: "Transportation booked successfully", tourist });
    } catch (error) {
        console.error("Error booking transportation:", error);
        res.status(500).json({ message: "Failed to book transportation", error });
    }
};


// Get all available transportation options
const getAllAvailableTransportation = async (req, res) => {
    try {
        const availableTransportation = await Transportation.find({ availability: true });
        res.status(200).json(availableTransportation);
    } catch (error) {
        console.error("Error retrieving available transportation:", error);
        res.status(500).json({ message: "Failed to retrieve available transportation", error });
    }
};

module.exports = {
    addTransportation,
    getTransportationList,
    bookTransportation,
    getAllAvailableTransportation,
};
