const mongoose = require("mongoose");
const { Tourist } = require("../models");

const register = async (req, res) => {
  const { username, email, password, mobile, nationality, DOB, job } = req.body;
  const role = "tourist";
  try {
    const tourist = new Tourist({
      username,
      email,
      password,
      role,
      mobile,
      nationality,
      DOB,
      job,
    });
    await tourist.save();
    res.status(201).send(tourist);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTouristById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }
    res.status(200).json(tourist);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTouristById = async (req, res) => {
  const { id } = req.params;
  const { password, email, mobile, nationality, job } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourist = await Tourist.findByIdAndUpdate(
      id,
      { password, email, mobile, nationality, job },
      { new: true }
    );
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }
    res.status(200).json(tourist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find({});
    res.status(200).send(tourists);
  } catch (error) {
    res.status(500).send;
  }
};

module.exports = {
  register,
  getAllTourists,
  getTouristById,
  updateTouristById,
};
