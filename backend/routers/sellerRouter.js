const { sellerController } = require("../controllers/index");
const express = require("express");
const router = express.Router();

router.post("/", sellerController.register);
router.get("/:id", sellerController.getSellerById);
router.patch("/:id", sellerController.updateSellerById);

module.exports = router;
