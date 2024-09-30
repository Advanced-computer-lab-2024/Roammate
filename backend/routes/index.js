// routes/index.js
const express = require("express");
const {
  addProduct,
  viewproducts,
  searchproductbyname,
} = require("./productsController");

const {
  createTag,
  viewTags,
  updateTag,
  deleteTag,
} = require("./tagsController");

const router = express.Router();

//Products Routes
router.post("/addproduct", addProduct);
router.get("/viewproducts", viewproducts);
router.get("/searchproduct/:name", searchproductbyname);

// Routes for preference tags
router.post("/tags", createTag);
router.get("/tags", viewTags);
router.put("/tags/:id", updateTag);
router.delete("/tags/:id", deleteTag);

// Search route
// router.get('/search/:query', search);

// View all upcoming content
// router.get('/upcoming', viewAllUpcoming);

module.exports = router;
