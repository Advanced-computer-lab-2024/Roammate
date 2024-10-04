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
  sortActivities
} = require("./activitiesController");

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
router.post("/activity",createActivity);
router.get("/activity",getAllActivities);
router.get('/filteractivities',filterActivities);
router.get("/activity/:id",getActivityById);
router.put("/activity/:id",updateActivity);
router.delete("/activity/:id",deleteActivity);
router.get("/sortActivites",sortActivities);

router.post("/test", createTest);
router.get("/test", viewTest);
// Search route
// router.get('/search/:query', search);

// View all upcoming content
// router.get('/upcoming', viewAllUpcoming);
const itineraryController = require('./itineraryController');

router.post('/create', itineraryController.createItinerary);
router.get('/', itineraryController.getAllItineraries);
router.get('/:id', itineraryController.getItineraryById);
router.put('/:id', itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);
router.get('/filter', itineraryController.filterItineraries);


module.exports = router;
