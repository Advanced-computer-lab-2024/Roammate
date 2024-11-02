const { MonumentTag } = require("../models");
const mongoose = require("mongoose");

const createMonumentTag = async (req, res) => {
  const { name } = req.body;

  const newTag = new MonumentTag({ name });
  try {
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllMonumentTags = async (req, res) => {
  try {
    const tags = await MonumentTag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving tags" });
  }
};

const updateMonumentTagById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const updatedTag = await MonumentTag.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating tag" });
  }
};

const deleteMonumentTagById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const deletedTag = await MonumentTag.findByIdAndDelete(id);
    if (!deletedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting tag" });
  }
};

module.exports = {
  createMonumentTag,
  getAllMonumentTags,
  updateMonumentTagById,
  deleteMonumentTagById,
};
