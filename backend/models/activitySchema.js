
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Adventure', 'Cultural', 'Relaxation', 'Outdoor', 'Entertainment', 'Other'] //to be modified lateron
  },
  tags: {
    type: [String], // Array of strings to store multiple tags
    default: []
  },
  discount: {
    type: Number,
    default: 0, // Default no discount
    min: 0,
    max: 100 // Discount in percentage
  },
  availability: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    daysOfWeek: {
      type: [String], // Array of days for availability, e.g. ['Monday', 'Wednesday']
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to auto-update the 'updatedAt' field before saving the document


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
