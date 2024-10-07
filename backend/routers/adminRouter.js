const {
  adminController,
  tourismGovernerController,
  touristController,
  advertiserController,
  tourGuideController,
  sellerController,
} = require("../controllers/index");
const express = require("express");
const router = express.Router();

router.get("/admins", adminController.getAdmins);
router.get("/tourismGoverners", tourismGovernerController.getTourismGoverners);
router.get("/tourists", touristController.getTourists);
router.get("/advertisers", advertiserController.getAdvertisers);
router.get("/tourGuides", tourGuideController.getTourGuides);
router.get("/sellers", sellerController.getSellers);

router.post("/admin", adminController.addAdmin);
router.post("/tourismGoverner", tourismGovernerController.addTourismGoverner);

module.exports = router;
