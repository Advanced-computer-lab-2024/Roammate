const User = require("./User");
const Advertiser = require("./Advertiser");
const TourGuide = require("./TourGuide");
const Tourist = require("./Tourist");
const Seller = require("./Seller");
const Activity = require("./Activity");
const Product = require("./Product");
const Itinerary = require("./Itinerary");
const Monument = require("./Monument");
const PreferenceTag = require("./PreferenceTag");
const MonumentTag = require("./MonumentTag");
const ActivityCategory = require("./ActivityCategory");
const Review = require("./Review");
const ActivityBooking = require("./ActivityBooking");
const ItineraryBooking = require("./ItineraryBooking");
const ProductPurchasing = require("./ProductPurchasing");
const MonumentsVisiting = require("./MonumentsVisiting");
const Complaint = require("./Complaint");
const transportation = require("./Transportation");
const ProductWishlist = require("./ProductWishlist");
const UserCart = require("./UserCart");
const PromoCode = require("./PromoCode");
// Export all models
module.exports = {
  User,
  Advertiser,
  TourGuide,
  Tourist,
  Seller,
  Activity,
  Product,
  Itinerary,
  Monument,
  PreferenceTag,
  MonumentTag,
  ActivityCategory,
  Review,
  ActivityBooking,
  ItineraryBooking,
  ProductPurchasing,
  MonumentsVisiting,
  Complaint,
  transportation,
  ProductWishlist,
  UserCart,
};
