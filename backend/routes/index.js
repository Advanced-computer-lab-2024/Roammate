const express = require("express");
const {
  activityCategoryController,
  activityController,
  adminController,
  advertiserController,
  itineraryController,
  monumentController,
  monumentTagsController,
  preferenceTagsController,
  productController,
  sellerController,
  tourGuideController,
  touristController,
  tourismGovernorController,
} = require("../controllers");

const router = express.Router();

//Routes for Admin
router.post("/admin", adminController.addAdmin);
router.get("/admin", adminController.getAllAdmins);
router.delete("/admin/:id", adminController.deleteUser);
//----------------------------------------------- ---------------

//Routes for Advertiser
router.post("/advertiser", advertiserController.register);
router.get("/advertiser/:id", advertiserController.getAdvertiserById);
router.patch("/advertiser/:id", advertiserController.updateAdvertiserById);
router.get("/advertiser", advertiserController.getAllAdvertisers);
//--------------------------------------------------------------

//Routes for Seller
router.post("/seller", sellerController.register);
router.get("/seller/:id", sellerController.getSellerById);
router.patch("/seller/:id", sellerController.updateSellerById);
router.get("/seller", sellerController.getAllSellers);
//--------------------------------------------------------------

//Routes for Tourist
router.post("/tourist", touristController.register);
router.get("/tourist/:id", touristController.getTouristById);
router.patch("/tourist/:id", touristController.updateTouristById);
router.get("/tourist", touristController.getAllTourists);
//--------------------------------------------------------------

//Routes for Tourism Governor
router.post("/tourismGovernor", tourismGovernorController.addTourismGovernor);
router.get(
  "/tourismGovernor",
  tourismGovernorController.getAllTourismGovernors
);
//--------------------------------------------------------------

//Routes for Tour Guide
router.post("/tourGuide", tourGuideController.register);
router.get("/tourGuide/:id", tourGuideController.getTourGuideById);
router.patch("/tourGuide/:id", tourGuideController.updateTourGuideById);
router.get("/tourGuide", tourGuideController.getAllTourGuides);
//--------------------------------------------------------------

//Routes for Product
router.post("/product", productController.addProduct);
router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.get("/product-seller/:id", productController.getProductsBySellerId);
router.delete("/product/:id", productController.deleteProductById);
router.patch("/product/:id", productController.updateProductById);
router.get("/product-search", productController.searchProductWithFilters);
//--------------------------------------------------------------

//Routes for activity
router.post("/activity", activityController.createActivity);
router.get("/activity", activityController.getAllActivities);
router.get("/activity/:id", activityController.getActivityById);
router.patch("/activity/:id", activityController.updateActivityById);
router.delete("/activity/:id", activityController.deleteActivityById);
router.get(
  "/activity-search",
  activityController.searchActivitiesWithFiltersAndSort
);
router.get(
  "/activity-advertiser/:id",
  activityController.getActivitiesByAdvertiserId
);
//--------------------------------------------------------------

//Routes for Itinerary
router.post("/itinerary", itineraryController.createItinerary);
router.get("/itinerary", itineraryController.getAllItineraries);
router.get("/itinerary/:id", itineraryController.getItineraryById);
router.patch("/itinerary/:id", itineraryController.updateItineraryById);
router.delete("/itinerary/:id", itineraryController.deleteItineraryById);
router.get(
  "/itinerary-search",
  itineraryController.searchItinerariesWithFiltersAndSort
);
router.get(
  "/itinerary/tourGuide/:id",
  itineraryController.getItinerariesByTourGuideId
);
//--------------------------------------------------------------

//Routes for Preference Tags
router.post("/preferenceTags", preferenceTagsController.createPreferenceTag);
router.get("/preferenceTags", preferenceTagsController.getAllPreferenceTags);
router.patch(
  "/preferenceTags/:id",
  preferenceTagsController.updatePreferenceTagById
);
router.delete(
  "/preferenceTags/:id",
  preferenceTagsController.deletePreferenceTagById
);
//--------------------------------------------------------------

//Routes for Activity Category
router.post("/activityCategory", activityCategoryController.createCategory);
router.get("/activityCategory", activityCategoryController.getAllCategories);
router.patch(
  "/activityCategory/:id",
  activityCategoryController.updateCategoryById
);
router.delete(
  "/activityCategory/:id",
  activityCategoryController.deleteCategoryById
);
//--------------------------------------------------------------

//Routes for Monument
router.post("/monument", monumentController.createMonument);
router.get("/monument", monumentController.getAllMonuments);
router.get("/monument/:id", monumentController.getMonumentById);
router.patch("/monument/:id", monumentController.updateMonumentById);
router.delete("/monument/:id", monumentController.deleteMonumentById);
router.get("/monument-search", monumentController.searchMonumentsWithFilters);
router.get(
  "/monument/tourismGovernor/:id",
  monumentController.getMonumentsByTourismGovernorId
);
//--------------------------------------------------------------

//Routes for Monument Tags
router.post("/monumentTags", monumentTagsController.createMonumentTag);
router.get("/monumentTags", monumentTagsController.getAllMonumentTags);
router.patch("/monumentTags/:id", monumentTagsController.updateMonumentTagById);
router.delete(
  "/monumentTags/:id",
  monumentTagsController.deleteMonumentTagById
);
//--------------------------------------------------------------

module.exports = router;
