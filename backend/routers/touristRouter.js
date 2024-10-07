const { touristController } = require("../controllers/index");
const express = require("express");
const router = express.Router();

router.post("/", touristController.register);
router.get("/:id", touristController.getTouristById);
router.patch("/:id", touristController.updateTouristById);

module.exports = router;
