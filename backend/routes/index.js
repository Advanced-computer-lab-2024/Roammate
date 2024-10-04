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

// Search route
// router.get('/search/:query', search);

// View all upcoming content
// router.get('/upcoming', viewAllUpcoming);

module.exports = router;
