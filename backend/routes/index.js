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
  userController,
  bookingController,
  deletionRequestsController,
  transportationController,
  passwordController,
  productWishlistController,
  userCartController,
  PromoCodeController,
  DeliveryAddressController,
} = require("../controllers");
const { requireAuth } = require("../middleware/AuthMiddleware");

const router = express.Router();

//Routes for User
router.get("/users", userController.getAllUsers); // Get all users
router.delete("/users/:id", userController.deleteUser); // Delete a user by ID
router.patch("/users/status", userController.updateAllUsersStatus); // Update the status of all users
router.patch("/users/status/:id", userController.updateUserStatus); // Update the status of a specific user by ID
router.get("/users/status/pending", userController.getAllPendingUsers); // Get all users with 'Pending' status
router.get("/users/notifications/:id", userController.getUserNotifications); // Get all notifications for a user
router.patch("/users/notifications/:id", userController.readAllNotifications); // Mark all notifications as read for a user
//--------------------------------------------------------------

//Routes for Admin
router.post("/admin", adminController.addAdmin);
router.get("/admin/:id", adminController.getAdminById);
router.patch("/admin/:id", adminController.editAdmin);
router.get("/admin", adminController.getAllAdmins);
router.delete("/admin/:id", adminController.deleteUser);
//----------------------------------------------- ---------------

//Routes for Advertiser
router.post("/advertiser", advertiserController.register);
router.get("/advertiser/:id", advertiserController.getAdvertiserById);
router.patch("/advertiser/:id", advertiserController.updateAdvertiserById);
router.get("/advertiser", advertiserController.getAllAdvertisers);
router.post(
  "/advertiser/identification/upload",
  advertiserController.uploadMiddleware,
  advertiserController.uploadId
);
router.post(
  "/advertiser/taxation/upload",
  advertiserController.uploadMiddleware,
  advertiserController.uploadTaxation
);
router.post(
  "/advertiser/logo/upload",
  advertiserController.uploadMiddleware,
  advertiserController.uploadLogo
);
router.post(
  "/advertiser/identification/upload",
  advertiserController.uploadMiddleware,
  advertiserController.uploadId
);
router.post(
  "/advertiser/taxation/upload",
  advertiserController.uploadMiddleware,
  advertiserController.uploadTaxation
);
router.post(
  "/advertiser/logo/upload",
  advertiserController.uploadMiddleware,
  advertiserController.uploadLogo
);
router.delete(
  "/request-delete-advertiser/:id",
  advertiserController.requestAdvertiserDeletionIfNoUpcomingBookings
);
//--------------------------------------------------------------

//Routes for Seller
router.post("/seller", sellerController.register);
router.get("/seller/:id", sellerController.getSellerById);
router.patch("/seller/:id", sellerController.updateSellerById);
router.get("/seller", sellerController.getAllSellers);
router.post(
  "/seller/identification/upload",
  sellerController.uploadMiddleware,
  sellerController.uploadId
);
router.post(
  "/seller/taxation/upload",
  sellerController.uploadMiddleware,
  sellerController.uploadTaxation
);
router.post(
  "/seller/logo/upload",
  sellerController.uploadMiddleware,
  sellerController.uploadLogo
);
router.post(
  "/seller/identification/upload",
  sellerController.uploadMiddleware,
  sellerController.uploadId
);
router.post(
  "/seller/taxation/upload",
  sellerController.uploadMiddleware,
  sellerController.uploadTaxation
);
router.post(
  "/seller/logo/upload",
  sellerController.uploadMiddleware,
  sellerController.uploadLogo
);
router.delete(
  "/request-delete-seller/:id",
  sellerController.requestSellerDeletionIfNoUpcomingProducts
);
//--------------------------------------------------------------

//Routes for Tourist
router.post("/tourist", touristController.register);
router.get("/tourist/:id", touristController.getTouristById);
router.patch("/tourist/:id", touristController.updateTouristById);
router.get("/tourist", touristController.getAllTourists);
router.delete(
  "/request-delete-tourist/:id",
  touristController.requestTouristDeletionIfNoUpcomingBookings
);
//--------------------------------------------------------------

//Routes for Tourism Governor
router.post("/tourismGovernor", tourismGovernorController.addTourismGovernor);
router.get(
  "/tourismGovernor",
  tourismGovernorController.getAllTourismGovernors
);
router.get(
  "/tourismGovernor/:id",
  tourismGovernorController.getTourismGovernorById
);
router.patch(
  "/tourismGovernor/:id",
  tourismGovernorController.updateTourismGovernorById
);
//--------------------------------------------------------------

//Routes for Tour Guide
router.post("/tourGuide", tourGuideController.register);
router.get("/tourGuide/:id", tourGuideController.getTourGuideById);
router.patch("/tourGuide/:id", tourGuideController.updateTourGuideById);
router.get("/tourGuide", tourGuideController.getAllTourGuides);
router.post(
  "/tourGuide/identification/upload",
  tourGuideController.uploadMiddleware,
  tourGuideController.uploadId
);
router.post(
  "/tourGuide/certificate/upload",
  tourGuideController.uploadMiddleware,
  tourGuideController.uploadCertificate
);
router.post(
  "/tourGuide/photo/upload",
  tourGuideController.uploadMiddleware,
  tourGuideController.uploadPhoto
);
router.post(
  "/tourGuide/identification/upload",
  tourGuideController.uploadMiddleware,
  tourGuideController.uploadId
);
router.post(
  "/tourGuide/certificate/upload",
  tourGuideController.uploadMiddleware,
  tourGuideController.uploadCertificate
);
router.post(
  "/tourGuide/photo/upload",
  tourGuideController.uploadMiddleware,
  tourGuideController.uploadPhoto
);
router.post("/tourGuide/review/:id", tourGuideController.addReviewToTourguide);

router.delete(
  "/request-delete-tourguide/:id",
  tourGuideController.deleteTourGuideIfNoUpcomingBookings
);

//--------------------------------------------------------------

//Routes for Product
router.post("/product", productController.addProduct);
router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.get("/product-seller/:id", productController.getProductsBySellerId);
router.delete("/product/:id", productController.deleteProductById);
router.patch("/product/:id", productController.updateProductById);
router.get("/product-search", productController.searchProductWithFilters);
router.put(
  "/product/:id/toggle-archived",
  productController.toggleArchivedStatus
);
router.get("/product/:id/check-archived", productController.checkIfArchived);
router.post(
  "/product/image/upload",
  productController.uploadMiddleware,
  productController.uploadImage
);
router.get(
  "/product/:id/product-sales",
  productController.getProductStockAndSales
);

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
router.get(
  "/activity-tourist/:id",
  activityController.getBookedActivitiesByTouristId
);
router.get(
  "/check-activity-booking/:activityId",
  activityController.checkActivityBookingExists
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

//Routes for activity reviews
router.post("/activityReviews/:id", activityController.addReviewToActivity);
//--------------------------------------------------------------

//Routes for activity booking
router.get(
  "/activityBookings/:id",
  requireAuth,
  activityController.getBookedActivitiesByTouristId
);
router.post("/bookActivity", activityController.bookActivity);
router.delete(
  "/activityBookings/:id",
  activityController.cancelActivityBooking
);
router.get(
  "/activityBookings-count/:id",
  activityController.getActivityBookingsCount
);
//--------------------------------------------------------------

//Routes for itinerary reviews
router.post("/itineraryReviews/:id", itineraryController.addReviewToItinerary);
//--------------------------------------------------------------

//Routes for itinerary booking
router.get(
  "/itineraryBookings/:id",
  itineraryController.getBookedItinerariesByTouristId
);
router.post("/bookItinerary", itineraryController.bookItinerary);
router.delete(
  "/itineraryBookings/:id",
  itineraryController.cancelItineraryBooking
);
router.get(
  "/itineraryBookings-count/:id",
  itineraryController.getItineraryBookingsCount
);
//--------------------------------------------------------------

//Routes for product reviews
router.post("/productReviews/:id", productController.addReviewToProduct);
//--------------------------------------------------------------

//Routes for product purchasing
router.get(
  "/productPurchasings/:id",
  productController.getPurchasedProductsByTouristId
);
router.post("/productPurchasings", productController.addProductPurchasing);
router.delete(
  "/productPurchasings/:id",
  productController.deleteProductPurchasingById
);
router.patch(
  "/productPurchasings/:id",
  productController.updateProductPurchasedStatusById
);
//--------------------------------------------------------------

//Routes for Files Download
router.get("/image/:id", filesController.getImage);
router.get("/pdf/:id", filesController.getPdf);

//Routes for booking
router.post("/search-flights", bookingController.searchFlights);
router.get("/search-hotel", bookingController.getHotelDetails);
router.get("/list-hotels", bookingController.getHotelsByCity);

//--------------------------------------------------------------

//Routes for Deletion Requests

router.get(
  "/deletion-requests",
  deletionRequestsController.searchDeletionRequestsWithFiltersAndSort
);
router.get(
  "/deletion-requests/user/:userId",
  deletionRequestsController.getDeletionRequestsByUserId
);
router.delete(
  "/deletion-requests/:id",
  deletionRequestsController.deleteDeletionRequest
);
router.patch(
  "/deletion-requests/:id",
  deletionRequestsController.editDeletionRequestStatus
);
router.put(
  "/deletion-requests/:deletionRequestId/approve",
  deletionRequestsController.approveDeletionRequest
);
router.put(
  "/deletion-requests/:deletionRequestId/deny",
  deletionRequestsController.denyDeletionRequest
);

router.get(
  "/deletion-request-status",
  deletionRequestsController.checkDeletionRequestStatus
);

//--------------------------------------------------------------

//Routes for Transportation

// Route to add a new transportation
router.post("/addTransportation", transportationController.addTransportation);
// Route to get transportation list
router.get(
  "/listTransportation",
  transportationController.getTransportationList
);
// Route to book transportation
router.post("/bookTransportation", transportationController.bookTransportation);
// Route to get all available transportations
router.get(
  "/availableTransportation",
  transportationController.getAllAvailableTransportation
);

router.get(
  "/touristTransportationBookings",
  touristController.getBookedTransportations
);

router.patch(
  "/activity/:id/toggle-appropriate",
  activityController.toggleAppropriateActivity
);
router.patch(
  "/itinerary/:id/toggle-active",
  itineraryController.toggleItineraryActivation
);
router.patch(
  "/itinerary/:id/toggle-appropriate",
  itineraryController.toggleAppropriateItinerary
);
//--------------------------------------------------------------

// Routes for Wallet
router.post("/redeem-points/:touristId", touristController.redeemPointsToCash);

//--------------------------------------------------------------

//Change Password of Users
router.post("/change-password", passwordController.changePassword);

//--------------------------------------------------------------

// Login User
router.post("/login", userController.loginUser);
//--------------------------------------------------------------

// Logout User
router.post("/logout", userController.logoutUser);
//--------------------------------------------------------------

// Get user role
router.get("/userRole", userController.getUserRole);
//--------------------------------------------------------------

//--------------------------------------------------------------

// Login User
router.post("/login", userController.loginUser);
//--------------------------------------------------------------

// Logout User
router.post("/logout", userController.logoutUser);
//--------------------------------------------------------------

// Get user role
router.get("/userRole", userController.getUserRole);
//--------------------------------------------------------------

//--------------------------------------------------------------

// Routes for Product Wishlisting
router.post(
  "/wishlist/:userId/add",
  productWishlistController.addProductToWishlist
);
router.get("/wishlist/:userId", productWishlistController.getWishlistByUserId);
router.post(
  "/wishlist/:userId/toggle",
  productWishlistController.toggleProductInWishlist
);

// Create a new delivery address
router.post(
  "/delivery-address",
  DeliveryAddressController.createDeliveryAddress
);
//--------------------------------------------------------------

// Get all delivery addresses for a user
router.get(
  "/delivery-address/:userId",
  DeliveryAddressController.getDeliveryAddressesByUser
);
//--------------------------------------------------------------

// Update a delivery address by ID
router.put(
  "/delivery-address/:id",
  DeliveryAddressController.updateDeliveryAddressById
);

router.put(
  "/delivery-address/:userId/set-default",
  DeliveryAddressController.setDefaultAddress
);
//--------------------------------------------------------------

// Delete a delivery address by ID
router.delete(
  "/delivery-address/:id",
  DeliveryAddressController.deleteDeliveryAddressById
);
//--------------------------------------------------------------

// Routes for User Cart
router.post("/cart/:userId/add", userCartController.addProductToCart);
router.patch("/cart/:userId/update", userCartController.updateProductQuantity);
router.delete("/cart/:userId/remove", userCartController.removeProductFromCart);
router.get("/cart/:userId", userCartController.getUserCart);

// Promo Code Routes
router.post("/promoCodes", PromoCodeController.createPromoCode);
router.post("/promoCodes/birthday", PromoCodeController.sendBirthdayPromoCode);
router.post("/promoCodes/apply", PromoCodeController.applyPromoCode);
router.get("/promoCodes", PromoCodeController.getAllPromoCodes);
router.get("/promoCodes/user/:userId", PromoCodeController.getPromoCodesByUser);
router.post(
  "/reset-birthday-promo",
  PromoCodeController.resetBirthdayPromoSent
);
module.exports = router;
