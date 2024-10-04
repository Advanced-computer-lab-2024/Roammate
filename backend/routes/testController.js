// controllers/tagController.js
const Test = require("../models/testModel");
const PreferenceTag = require("../models/preferenceTagModel");

// Create a preference tag
async function createTest(req, res) {
  try {
    // Find the preference tags based on the IDs passed in the request body
    const { name, preferenceTags } = req.body;

    // Optionally check if the preferenceTags array contains valid ObjectIds
    const tags = await PreferenceTag.find({ _id: { $in: preferenceTags } });

    if (!tags.length) {
      return res
        .status(404)
        .json({ message: "No valid preference tags found" });
    }

    // Create the test document with associated preference tags
    const testDoc = await Test.create({
      name,
      preferenceTags: tags.map((tag) => tag._id), // Associate tag IDs
    });

    res.status(201).json(testDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// View all tags
const viewTest = async (req, res) => {
  try {
    const testDocs = await Test.find().populate("preferenceTags", [
      "name",
      "createdAt",
    ]);
    res.status(200).json(testDocs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tags" });
  }
};

module.exports = { createTest, viewTest };
