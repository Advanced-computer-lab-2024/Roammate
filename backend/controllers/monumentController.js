const { Monument, MonumentTag, PreferenceTag } = require("../models");
const mongoose = require("mongoose");
/*name, description, pictures, location, openingHours,
 ticketPrices, tags, monumentTags, tourismGovernor*/
const convertCurrency = require("./CurrencyConvertController");

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
  const { currency = "USD" } = req.query;
  try {
    const monuments = await Monument.find()
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");

    const convertedMonuments = monuments.map((monument) => {
      const convertedPrices = monument.ticketPrices.map((price) => ({
        ...price,
        amount: convertCurrency(price.amount, "USD", currency),
      }));
      return {
        ...monument.toObject(),
        ticketPrices: convertedPrices,
        currency,
      };
    });
    res.status(200).send(convertedMonuments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMonumentById = async (req, res) => {
  const id = req.params.id;
  const { currency = "USD" } = req.query;
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

    const convertedPrices = monument.ticketPrices.map((price) => ({
      ...price,
      amount: convertCurrency(price.amount, "USD", currency),
    }));

    res.status(200).send({
      ...monument.toObject(),
      ticketPrices: convertedPrices,
      currency,
    });
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

// Helper function for handling filter criteria
const getFilterCriteria = (tags, monumentTags) => {
  const filterCriteria = {};
  // Only include tags and monumentTags if they contain valid ObjectIds
  if (tags && tags.length > 0) {
    const validTags = tags.filter((id) => mongoose.Types.ObjectId.isValid(id));
    if (validTags.length > 0) {
      filterCriteria.tags = { $in: validTags };
    }
  }

  if (monumentTags && monumentTags.length > 0) {
    const validMonumentTags = monumentTags.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (validMonumentTags.length > 0) {
      filterCriteria.monumentTags = { $in: validMonumentTags };
    }
  }

  return filterCriteria;
};

// Helper function for handling search criteria
const getSearchCriteria = async (query) => {
  if (!query) return {};

  const tagIds = await PreferenceTag.find({ $text: { $search: query } }).select(
    "_id"
  );
  const monumentTagIds = await MonumentTag.find({
    $text: { $search: query },
  }).select("_id");
  const monumentIds = await Monument.find({ $text: { $search: query } }).select(
    "_id"
  );

  const searchCriteria = {
    $or: [
      { _id: { $in: monumentIds } },
      { tags: { $in: tagIds.map((tag) => tag._id) } },
      { monumentTags: { $in: monumentTagIds.map((tag) => tag._id) } },
    ],
  };

  return searchCriteria;
};

const searchMonumentsWithFilters = async (req, res) => {
  const {
    query = "",
    tags = [],
    monumentTags = [],
    currency = "USD",
  } = req.query;

  const parsedTags = Array.isArray(tags) ? tags : tags.split(",");
  const parsedMonumentTags = Array.isArray(monumentTags)
    ? monumentTags
    : monumentTags.split(",");

  const searchCriteria = await getSearchCriteria(query);
  const filterCriteria = getFilterCriteria(parsedTags, parsedMonumentTags);

  try {
    const monuments = await Monument.find({
      ...searchCriteria,
      ...filterCriteria,
    })
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");

    const convertedMonuments = monuments.map((monument) => {
      const convertedPrices = monument.ticketPrices.map((price) => ({
        ...price,
        amount: convertCurrency(price.amount, "USD", currency),
      }));
      return {
        ...monument.toObject(),
        ticketPrices: convertedPrices,
        currency,
      };
    });
    res.status(200).send(convertedMonuments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getMonumentsByTourismGovernorId = async (req, res) => {
  const id = req.params.id;
  const { currency = "USD" } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  try {
    const monuments = await Monument.find({ tourismGovernor: id })
      .populate("tags", "name")
      .populate("monumentTags", "name")
      .populate("tourismGovernor", "username");

    const convertedMonuments = monuments.map((monument) => {
      const convertedPrices = monument.ticketPrices.map((price) => ({
        ...price,
        amount: convertCurrency(price.amount, "USD", currency),
      }));
      return {
        ...monument.toObject(),
        ticketPrices: convertedPrices,
        currency,
      };
    });
    res.status(200).send(convertedMonuments);
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
