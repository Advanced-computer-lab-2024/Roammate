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

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findOne({ _id: id, role: "admin" });

    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
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

const editAdmin = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send(updatedAdmin);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  deleteUser,
  getAdminById,
  editAdmin,
};
