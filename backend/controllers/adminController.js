const User = require("../models/User");

const addAdmin = async (req, res) => {
  const { username, password } = req.body;
  const role = "admin";
  try {
    const admin = new User({
      username,
      password,
      role,
    });
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).send;
  }
};

module.exports = { addAdmin, getAdmins };
