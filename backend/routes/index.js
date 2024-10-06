// routes/index.js
const express = require("express");
const {
  addProduct,
  viewproducts,
  searchproductbyname,
  filterbyprice,
  sortbyrating,
  editproduct,
} = require("./productsController");

const {
  createPreferenceTag,
  viewPreferenceTags,
  updatePreferenceTag,
  deletePreferenceTag,
} = require("./preferenceTagsController");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  filterActivities,
  sortActivities,
} = require("./activitiesController");

const {
  createMuseum,
  GetAllMuseums,
  GetAllMuseumsByID,
  updateMuseum,
  deleteMuseum,
  filterByTag,
  getAllCreatedItems,
} = require("./musuemController");

const { createTest, viewTest } = require("./testController");

const router = express.Router();

//Products Routes
router.post("/addproduct", addProduct);
router.get("/viewproducts", viewproducts);
router.get("/searchproduct/:name", searchproductbyname);
router.get("/filterbyprice", filterbyprice);
router.get("/sortbyrating", sortbyrating);
router.put("/editproduct/:id", editproduct);

// Routes for preference tags
router.post("/preferenceTags", createPreferenceTag);
router.get("/preferenceTags", viewPreferenceTags);
router.put("/preferenceTags/:id", updatePreferenceTag);
router.delete("/preferenceTags/:id", deletePreferenceTag);
//Routes for activities
//Routes for Activities
router.post("/activity", createActivity);
router.get("/activity", getAllActivities);
router.get("/filteractivities", filterActivities);
router.get("/activity/:id", getActivityById);
router.put("/activity/:id", updateActivity);
router.delete("/activity/:id", deleteActivity);
router.get("/sortActivites", sortActivities);

router.post("/test", createTest);
router.get("/test", viewTest);
// Search route
// router.get('/search/:query', search);

// View all upcoming content
// router.get('/upcoming', viewAllUpcoming);
const itineraryController = require("./itineraryController");
const { searchByTagAndCategory } = require("./searchController");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("./activityCategoryController");

router.post("/itinerary", itineraryController.createItinerary);
router.get("/itinerary", itineraryController.getAllItineraries);
router.get("/itinerary/:id", itineraryController.getItineraryById);
router.put("/itinerary/:id", itineraryController.updateItinerary);
router.delete("/itinerary/:id", itineraryController.deleteItinerary);
router.get("/itineraryFilter", itineraryController.filterItineraries);

router.post("/museums", createMuseum); // Create a new museum
router.get("/museums", GetAllMuseums); // Get all museums
router.get("/museums/:id", GetAllMuseumsByID); // Get a specific museum by ID
router.put("/museums/:id", updateMuseum); // Update a museum by ID
router.delete("/museums/:id", deleteMuseum); // Delete a museum by ID
router.get("/filtermuseums", filterByTag); // Filter museums by tag

router.get("/searchAll", searchByTagAndCategory);

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
