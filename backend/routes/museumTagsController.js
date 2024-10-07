const MuseumTag = require("../models/musuemTagsModel");

// Create a museum tag
const createMuseumTag = async (req, res) => {
  const { type, value } = req.body;

  const newTag = new MuseumTag({ type, value });
  try {
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating tag" });
  }
};

// View all museum tags
const viewMuseumTags = async (req, res) => {
  try {
    const tags = await MuseumTag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving tags" });
  }
};

// Update a museum tag by ID
const updateMuseumTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Tag name is required" });

  try {
    const updatedTag = await MuseumTag.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating tag" });
  }
};

// Delete a museum tag by ID
const deleteMuseumTag = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTag = await MuseumTag.findByIdAndDelete(id);
    if (!deletedTag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting tag" });
  }
};

module.exports = {
  createMuseumTag,
  viewMuseumTags,
  updateMuseumTag,
  deleteMuseumTag,
};
