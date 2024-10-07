const Advertiser = require("../models/Advertiser");
const mongoose = require("mongoose");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const role = "advertiser";
  try {
    const advertiser = new Advertiser({
      username,
      email,
      password,
      role,
    });
    await advertiser.save();
    res.status(201).send(advertiser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAdvertiserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const advertiser = await Advertiser.findById(id);
    if (!advertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateAdvertiserById = async (req, res) => {
  const { id } = req.params;
  const { password, email, website, hotline, companyProfile } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const advertiser = await Advertiser.findByIdAndUpdate(
      id,
      { password, email, website, hotline, companyProfile },
      { new: true }
    );
    if (!advertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAdvertisers = async (req, res) => {
  try {
    const advertisers = await Advertiser.find({});
    res.status(200).send(advertisers);
  } catch (error) {
    res.status(500).send;
  }
};

module.exports = {
  register,
  getAdvertisers,
  getAdvertiserById,
  updateAdvertiserById,
};
