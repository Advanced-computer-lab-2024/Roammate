const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const changePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches the hashed password in the database
    // const isMatch = await bcrypt.compare(oldPassword, user.password);
    const isMatch = oldPassword === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { changePassword };
