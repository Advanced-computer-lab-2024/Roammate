const mongoose = require("mongoose");
const { User } = require("../models");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// delete a user by id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted.");
  } catch (error) {
    res.status(500).send;
  }
};

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

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.notifications);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Read all notifications for a user
const readAllNotifications = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        "notifications.$[].isRead": true,
      },
    });
    res.status(200).send("All notifications marked as read.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Clear all notifications for a user
const clearAllNotifications = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      notifications: [],
    });
    res.status(200).send("All notifications read.");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllPendingUsers,
  updateAllUsersStatus,
  updateUserStatus,
  getUserNotifications,
  readAllNotifications,
  clearAllNotifications,
};
