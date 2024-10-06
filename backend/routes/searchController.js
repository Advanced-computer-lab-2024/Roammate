const Museum = require("../models/musuemModel");
const Activity = require("../models/activitySchema");
const Itinerary = require("../models/itineraryModel");
// const HistoricalPlace = require("../models/HistoricalPlace");
const Tag = require("../models/preferenceTagModel");
const ActivityCategory = require("../models/activityCategoryModel");

exports.searchByTagAndCategory = async (req, res) => {
  try {
    const { name, tagName, categoryName } = req.query;
    const tag = await Tag.findOne({ name: tagName });
    const category = await ActivityCategory.findOne({ name: categoryName });
    const searchCriteria = {};

    if (name) {
      searchCriteria.name = name;
    }

    if (tag) {
      searchCriteria.tags = tag._id;
    }

    if (category) {
      searchCriteria.category = category._id;
    }

    if (
      Object.keys(searchCriteria).length === 0 &&
      !tag &&
      !categoryName &&
      !name
    ) {
      return res
        .status(200)
        .json({
          activities: [],
          itineraries: [],
          musuems: [],
          historical_places: [],
        });
    }

    const activities = await Activity.find(searchCriteria)
      .populate("tags", "name")
      .populate("category", "name");

    const results = {
      activities,
    };

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while searching items" });
  }
};
