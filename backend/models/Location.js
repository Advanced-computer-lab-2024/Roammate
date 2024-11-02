const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
