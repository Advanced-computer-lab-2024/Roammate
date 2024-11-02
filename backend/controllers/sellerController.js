const mongoose = require("mongoose");
const { Seller } = require("../models");

// username, password, role, email, name, about
const register = async (req, res) => {
  const { username, email, password, name, about } = req.body;
  const role = "seller";
  try {
    const seller = new Seller({
      username,
      email,
      password,
      name,
      about,
      role,
    });
    await seller.save();
    res.status(201).send(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSellerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateSellerById = async (req, res) => {
  const { id } = req.params;
  const { password, email, name, about } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const seller = await Seller.findByIdAndUpdate(
      id,
      { password, email, name, about },
      { new: true }
    );
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.status(200).send(sellers);
  } catch (error) {
    res.status(500).send;
  }
};

module.exports = { register, getAllSellers, getSellerById, updateSellerById };
