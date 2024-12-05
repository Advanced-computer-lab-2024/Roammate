const mongoose = require('mongoose');

const flightBookingSchema = new mongoose.Schema({
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true }, // Reference to Tourist
    bookingCode: { type: String, unique: true, required: true },
    flightData: { type: Object, required: true } // Generic field for all flight details
});

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);
module.exports = FlightBooking;
