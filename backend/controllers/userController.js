const mongoose = require("mongoose");
const { User } = require("../models");

// get all users with pending status
const getAllPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send;
  }
};

// update all users status to guest
const updateAllUsersStatus = async (req, res) => {
  try {
    const status = req.body.status;
    if (!status)
        return res.status(400).send("Please provide a status to update to.");
    await User.updateMany({}, { status: status });
    res.status(200).send(`Updated all users to ${status}.`);
  } catch (error) {
    res.status(500).send;
  }
};

// update a single user status by id
const updateUserStatus = async (req, res) => {
  try {
    const status = req.body.status;
    if (!status)
        return res.status(400).send("Please provide a status to update to.");
    await User.findByIdAndUpdate(req.params.id, { status: status });
    res.status(200).send("Updated user to ppending.");
  } catch (error) {
    res.status(500).send;
  }
};

module.exports = {
  getAllPendingUsers,
  updateAllUsersStatus,
  updateUserStatus,
};
