const { User } = require("../models");

const getAllTourismGovernors = async (req, res) => {
  try {
    const tourismGovernors = await User.find({ role: "tourism governor" });
    res.status(200).send(tourismGovernors);
  } catch (error) {
    res.status(500).send;
  }
};

const addTourismGovernor = async (req, res) => {
  const { username, password } = req.body;
  const role = "tourism governor";
  try {
    const tourismGovernor = new User({
      username,
      password,
      role,
    });
    await tourismGovernor.save();
    res.status(201).send(tourismGovernor);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getAllTourismGovernors, addTourismGovernor };
