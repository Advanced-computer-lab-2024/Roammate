// controllers/tagController.js
const Tag = require("../models/tagModel");

// Create a preference tag
const createTag = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Tag name is required" });

  const newTag = new Tag({ name: name });
  try {
    const existingTag = await Tag.findOne({ name: name });
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
const viewTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tags" });
  }
};

// Update a tag by ID
const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: "Error updating tag" });
  }
};

// Delete a tag by ID
const deleteTag = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tag" });
  }
};

module.exports = { createTag, viewTags, updateTag, deleteTag };
