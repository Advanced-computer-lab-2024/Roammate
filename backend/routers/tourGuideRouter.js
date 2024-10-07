const { tourGuideController } = require("../controllers/index");
const express = require("express");
const router = express.Router();

router.post("/", tourGuideController.register);
router.get("/:id", tourGuideController.getTourGuideById);
router.patch("/:id", tourGuideController.updateTourGuideById);

module.exports = router;
