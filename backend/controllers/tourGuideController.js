const { default: mongoose } = require("mongoose");
const { TourGuide } = require("../models");
// username, password, role, email, mobile, yearsOfExperience, previousWork, languages, about
const register = async (req, res) => {
  const {
    username,
    email,
    password,
    mobile,
    yearsOfExperience,
    previousWork,
    languages,
    about,
  } = req.body;
  const role = "tour guide";
  try {
    const tourGuide = new TourGuide({
      username,
      email,
      password,
      role,
      mobile,
      yearsOfExperience,
      previousWork,
      languages,
      about,
    });
    await tourGuide.save();
    res.status(201).send(tourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTourGuideById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourGuide = await TourGuide.findById(id);
    if (!tourGuide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }
    res.status(200).json(tourGuide);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTourGuideById = async (req, res) => {
  const { id } = req.params;
  const {
    password,
    email,
    mobile,
    yearsOfExperience,
    previousWork,
    languages,
    about,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourGuide = await TourGuide.findByIdAndUpdate(
      id,
      {
        password,
        email,
        mobile,
        yearsOfExperience,
        previousWork,
        languages,
        about,
      },
      { new: true }
    );
    if (!tourGuide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }
    res.status(200).json(tourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTourGuides = async (req, res) => {
  try {
    const tourGuides = await TourGuide.find({});
    res.status(200).send(tourGuides);
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = {
  register,
  getAllTourGuides,
  getTourGuideById,
  updateTourGuideById,
};
