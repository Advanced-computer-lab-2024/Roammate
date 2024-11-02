const { User } = require("../models");

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
    res.status(400).send({ error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).send;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { addAdmin, getAllAdmins, deleteUser };
