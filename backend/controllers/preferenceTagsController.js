const { PreferenceTag } = require("../models");
const mongoose = require("mongoose");

// Create a preference tag
const createPreferenceTag = async (req, res) => {
  const { name } = req.body;

  const newTag = new PreferenceTag({ name: name });
  try {
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating tag" });
  }
};

// View all tags
const getAllPreferenceTags = async (req, res) => {
  try {
    const tags = await PreferenceTag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tags" });
  }
};

// Update a tag by ID
const updatePreferenceTagById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const updatedTag = await PreferenceTag.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: "Error updating tag" });
  }
};

// Delete a tag by ID
const deletePreferenceTagById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
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
  getAllPreferenceTags,
  updatePreferenceTagById,
  deletePreferenceTagById,
};
