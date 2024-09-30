// controllers/tagController.js
const PreferenceTag = require("../models/preferenceTagModel");

// Create a preference tag
const createPreferenceTag = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Tag name is required" });

  const newTag = new PreferenceTag({ name: name });
  try {
    const existingTag = await PreferenceTag.findOne({ name: name });
    if (existingTag) {
      res.status(400).json({ message: "Tag with this name already exists" });
      return;
    }

    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating tag" });
  }
};

// View all tags
const viewPreferenceTags = async (req, res) => {
  try {
    const tags = await PreferenceTag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tags" });
  }
};

// Update a tag by ID
const updatePreferenceTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTag = await PreferenceTag.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: "Error updating tag" });
  }
};

// Delete a tag by ID
const deletePreferenceTag = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedTag = await PreferenceTag.findByIdAndDelete(id);
    if (!deletedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tag" });
  }
};

module.exports = {
  createPreferenceTag,
  viewPreferenceTags,
  updatePreferenceTag,
  deletePreferenceTag,
};
