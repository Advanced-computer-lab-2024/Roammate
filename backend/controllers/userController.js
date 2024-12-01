const mongoose = require("mongoose");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let auth = await bcrypt.compare(password, user.password);

    //TODO: remove this line after testing
    if (password === user.password) {
      auth = true;
    }

    if (auth) {
      const token = jwt.sign(
        { username: user.username, id: user._id, role: user.role },
        process.env.JWT_SECRET
      ); //JWT_SECRET is a secret key stored in the .env file to sign the token with it to make it secure and valid
      res.cookie("token", token, {
        httpOnly: true, //true for production
        maxAge: 1000 * 60 * 60 * 3, //3 hours
      });
      //return role to frontend
      res.status(200).json({ userId: user._id, role: user.role });
    } else {
      res.status(400).send("Incorrect password");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

const logoutUser = async (req, res) => {
  if (req.cookies.token) {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "You are logged out" });
  } else {
    res.status(401).json({ message: "You are not logged in." });
  }
};

const getUserRole = async (req, res) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const role = decoded.role;
      //console.log(role);
      res.status(200).json({ role: role });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "You are not logged in" });
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
  loginUser,
  logoutUser,
  getUserRole,
  getUserNotifications,
  readAllNotifications,
  clearAllNotifications,
};
