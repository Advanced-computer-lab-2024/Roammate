// models/Transportation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transportationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicle: { type: String, required: true }, //  "vehicle type"
  capacity: { type: Number, required: true }, // Total capacity
  seatsAvailable: { type: Number, required: true }, // Tracks available seats
  departureTime: {type: Date,required: true,},
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  from: { type: String, required: true }, // Departure location
  to: { type: String, required: true },   // Destination location
  advertiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser' },
});

// Add a pre-save hook to ensure seatsAvailable doesn't exceed capacity
transportationSchema.pre('save', function (next) {
  if (this.seatsAvailable > this.capacity) {
    this.seatsAvailable = this.capacity;
  }
  next();
});

const Transportation = mongoose.model('Transportation', transportationSchema);
module.exports = Transportation;
