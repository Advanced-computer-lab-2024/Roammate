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
  complaintController,
  filesController,
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
router.post("/advertiser/identification/upload", advertiserController.uploadMiddleware, advertiserController.uploadId);
router.post("/advertiser/taxation/upload", advertiserController.uploadMiddleware, advertiserController.uploadTaxation);
router.post("/advertiser/logo/upload", advertiserController.uploadMiddleware, advertiserController.uploadLogo);
//--------------------------------------------------------------

//Routes for Seller
router.post("/seller", sellerController.register);
router.get("/seller/:id", sellerController.getSellerById);
router.patch("/seller/:id", sellerController.updateSellerById);
router.get("/seller", sellerController.getAllSellers);
router.post("/seller/identification/upload", sellerController.uploadMiddleware, sellerController.uploadId);
router.post("/seller/taxation/upload", sellerController.uploadMiddleware, sellerController.uploadTaxation);
router.post("/seller/logo/upload", sellerController.uploadMiddleware, sellerController.uploadLogo);
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
router.post("/tourGuide/identification/upload", tourGuideController.uploadMiddleware, tourGuideController.uploadId);
router.post("/tourGuide/certificate/upload", tourGuideController.uploadMiddleware, tourGuideController.uploadCertificate);	
router.post("/tourGuide/photo/upload", tourGuideController.uploadMiddleware, tourGuideController.uploadPhoto);
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

//Routes for Complaints
router.post("/complaint", complaintController.createComplaint);
router.get("/complaints", complaintController.getAllComplaints);
router.get(
  "/complaints/:issuerId",
  complaintController.getAllComplaintsByIssuerId
);
router.get("/complaint/:id", complaintController.getComplaintById);
router.delete("/complaint/:id", complaintController.deleteComplaintById);
router.put("/complaint/:id", complaintController.resolveComplaintById);
//--------------------------------------------------------------

//Routes for Files Download
router.get("/image/:id", filesController.getImage);
router.get("/pdf/:id", filesController.getPdf);

module.exports = router;
