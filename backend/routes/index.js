// routes/index.js
const express = require("express");
const {
  addProduct,
  viewproducts,
  searchproductbyname,
} = require("./productsController");

const {
  createPreferenceTag,
  viewPreferenceTags,
  updatePreferenceTag,
  deletePreferenceTag,
} = require("./preferenceTagsController");

const router = express.Router();

//Products Routes
router.post("/addproduct", addProduct);
router.get("/viewproducts", viewproducts);
router.get("/searchproduct/:name", searchproductbyname);

// Routes for preference tags
router.post("/tags", createPreferenceTag);
router.get("/tags", viewPreferenceTags);
router.put("/tags/:id", updatePreferenceTag);
router.delete("/tags/:id", deletePreferenceTag);

// Search route
// router.get('/search/:query', search);

// View all upcoming content
// router.get('/upcoming', viewAllUpcoming);

module.exports = router;
