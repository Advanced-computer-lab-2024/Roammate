const { Monument, MonumentTag, PreferenceTag } = require("../models");
const mongoose = require("mongoose");
/*name, description, pictures, location, openingHours,
 ticketPrices, tags, monumentTags, tourismGovernor*/

const createMonument = async (req, res) => {
  const {
    name,
    description,
    pictures,
    location,
    openingHours,
    ticketPrices,
    tags,
    monumentTags,
    tourismGovernor,
  } = req.body;
  const monument = new Monument(req.body);
  try {
    await monument.save();
    res.status(201).send(monument);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllMonuments = async (req, res) => {
  try {
    const monuments = await Monument.find()
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");
    res.status(200).send(monuments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMonumentById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const monument = await Monument.findById(id)
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");
    if (!monument)
      return res.status(404).send({ message: "Monument not found" });
    res.status(200).send(monument);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateMonumentById = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    pictures,
    location,
    openingHours,
    ticketPrices,
    tags,
    monumentTags,
    tourismGovernor,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const monument = await Monument.findByIdAndUpdate(
      id,
      {
        name,
        description,
        pictures,
        location,
        openingHours,
        ticketPrices,
        tags,
        monumentTags,
        tourismGovernor,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!monument)
      return res.status(404).send({ message: "Monument not found" });
    res.status(200).send(monument);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteMonumentById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const monument = await Monument.findByIdAndDelete(id);
    if (!monument)
      return res.status(404).send({ message: "Monument not found" });
    res.send(monument);
  } catch (error) {
    res.status(500).send(error);
  }
};

//tags, monumentTags
const getFilterCriteria = (tags, monumentTags) => {
  const filterCriteria = {};
  if (tags) filterCriteria.tags = { $in: tags };
  if (monumentTags) filterCriteria.monumentTags = { $in: monumentTags };
  return filterCriteria;
};

//name, tags, monumentTags
const getSearchCriteria = async (query) => {
  if (query === "") return {};
  const tagIds = await PreferenceTag.find({ $text: { $search: query } }).select(
    "_id"
  );
  const monummentTagIds = await MonumentTag.find({
    $text: { $search: query },
  }).select("_id");
  const monumentIds = await Monument.find({ $text: { $search: query } }).select(
    "_id"
  );
  const searchCriteria = {
    $or: [
      { _id: { $in: monumentIds } },
      { tags: { $in: tagIds } },
      { monumentTags: { $in: monummentTagIds } },
    ],
  };
  return searchCriteria;
};

const searchMonumentsWithFilters = async (req, res) => {
  const { query, tags, monumentTags } = req.query;
  const searchCriteria = await getSearchCriteria(query);
  const filterCriteria = getFilterCriteria(tags, monumentTags);
  try {
    const monuments = await Monument.find({
      ...searchCriteria,
      ...filterCriteria,
    })
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");
    res.status(200).send(monuments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMonumentsByTourismGovernorId = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const monuments = await Monument.find({ tourismGovernor: id })
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");
    res.status(200).send(monuments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createMonument,
  getAllMonuments,
  getMonumentById,
  updateMonumentById,
  deleteMonumentById,
  searchMonumentsWithFilters,
  getMonumentsByTourismGovernorId,
};
