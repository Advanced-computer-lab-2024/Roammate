const { User } = require("../models");
const bcrypt = require("bcrypt");

const getAllTourismGovernors = async (req, res) => {
  try {
    const tourismGovernors = await User.find({ role: "tourism governor" });
    res.status(200).send(tourismGovernors);
  } catch (error) {
    res.status(500).send;
  }
};

const getTourismGovernorById = async (req, res) => {
  try {
    const { id } = req.params;
    const tourismGovernor = await User.findOne({
      _id: id,
      role: "tourism governor",
    });

    if (!tourismGovernor) {
      return res.status(404).send({ message: "Tourism Governor not found" });
    }

    res.status(200).send(tourismGovernor);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const updateTourismGovernorById = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const updatedTourismGovernor = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

    if (!updatedTourismGovernor) {
      return res.status(404).send({ message: "Tourism Governor not found" });
    }

    res.status(200).send(updatedTourismGovernor);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addTourismGovernor = async (req, res) => {
  const { username, password } = req.body;
  const role = "tourism governor";
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const tourismGovernor = new User({
      username,
      password: hashedPassword,
      role,
    });
    await tourismGovernor.save();
    res.status(201).send(tourismGovernor);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllTourismGovernors,
  addTourismGovernor,
  getTourismGovernorById,
  updateTourismGovernorById,
};
