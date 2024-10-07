const { advertiserController } = require("../controllers/index");
const express = require("express");
const router = express.Router();

router.post("/", advertiserController.register);
router.get("/:id", advertiserController.getAdvertiserById);
router.patch("/:id", advertiserController.updateAdvertiserById);

module.exports = router;
