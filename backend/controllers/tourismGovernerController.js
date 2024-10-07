const User = require("../models/User");

const getTourismGoverners = async (req, res) => {
  try {
    const tourismGoverners = await User.find({ role: "tourism governer" });
    res.status(200).send(tourismGoverners);
  } catch (error) {
    res.status(500).send;
  }
};

const addTourismGoverner = async (req, res) => {
  const { username, password } = req.body;
  const role = "tourism governer";
  try {
    const tourismGoverner = new User({
      username,
      password,
      role,
    });
    await tourismGoverner.save();
    res.status(201).send(tourismGoverner);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getTourismGoverners, addTourismGoverner };
