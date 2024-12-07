const mongoose = require("mongoose");
const { Seller, ProductPurchasing, Product } = require("../models");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const AccountDeletionRequest = require("../models/AccountDeletionRequest");
const bcrypt = require("bcrypt");

// username, password, role, email, name, about
const register = async (req, res) => {
  const { username, email, password, name, about } = req.body;
  const role = "seller";
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const seller = new Seller({
      username,
      email,
      password: hashedPassword,
      name,
      about,
      role,
    });
    await seller.save();
    res.status(201).send(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSellerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateSellerById = async (req, res) => {
  const { id } = req.params;
  const { password, email, name, about } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const seller = await Seller.findByIdAndUpdate(
      id,
      { password, email, name, about },
      { new: true }
    );
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.status(200).send(sellers);
  } catch (error) {
    res.status(500).send;
  }
};

// GridFsStorage Configuration
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

// Multer Middleware
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");

// upload identification, certificate, photo
// Uploading Identification
const uploadId = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const seller = await Seller.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!seller) {
      return res.status(404).send("Tour Guide not found.");
    }
    seller.documents.identification = req.file.id;
    await seller.save();
    // console.log(seller);
    res.send("File uploaded and associated with tour guide successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

// Uploading taxation
const uploadTaxation = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const seller = await Seller.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!seller) {
      return res.status(404).send("Advertiser not found.");
    }
    seller.documents.taxation = req.file.id;
    await seller.save();
    res.send("File uploaded and associated with seller successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

// Uploading logo
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const seller = await Seller.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!seller) {
      return res.status(404).send("Seller not found.");
    }
    seller.documents.logo = req.file.id;
    await seller.save();
    res.send("File uploaded and associated with seller successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

const requestSellerDeletionIfNoUpcomingProducts = async (req, res) => {
  const sellerId = req.params.id;

  try {
    // Step 1: Check for active products (statuses "Preparing" or "Shipped") for the seller
    const hasActiveProducts = await ProductPurchasing.exists({
      product: { $in: await Product.find({ seller: sellerId }).select("_id") },
      status: { $in: ["Preparing", "Shipped"] },
    });

    // Step 2: Determine if deletion request can be created
    if (!hasActiveProducts) {
      // If no active products, create a deletion request for the seller
      const deletionRequest = new AccountDeletionRequest({
        accountType: "Seller",
        accountId: sellerId,
      });
      await deletionRequest.save();

      res.status(201).json({
        message: "Account deletion request created successfully.",
        deletionRequest,
      });
    } else {
      // If there are active products, return an error message
      res.status(400).json({
        message:
          "Cannot create account deletion request. There are active products.",
      });
    }
  } catch (error) {
    console.error("Error checking seller's active products:", error);
    res.status(500).json({ error: error.message });
  }
};

const calcSellerRevenue = async (req, res) => {
  const { id, startDate, endDate, productId } = req.query;

  try {
    const matchFilter = {
      ...(id && {
        "productDetails.seller": new mongoose.Types.ObjectId(id),
      }),
      ...(productId && {
        "productDetails._id": new mongoose.Types.ObjectId(productId),
      }),
    };

    if (startDate || endDate) {
      matchFilter.date = {
        ...(startDate && { $gte: new Date(startDate) }),
        ...(endDate && { $lte: new Date(endDate) }),
      };
    }

    matchFilter.status = { $ne: "Cancelled" };

    const revenueData = await ProductPurchasing.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      { $match: matchFilter },
      {
        $group: {
          _id: "$productDetails._id",
          productName: { $first: "$productDetails.name" },
          productPrice: { $first: "$productDetails.price" },
          totalRevenue: { $sum: "$productDetails.price" },
          bookingCount: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.status(200).json(revenueData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching grouped revenue data", error });
  }
};

module.exports = {
  register,
  getAllSellers,
  getSellerById,
  updateSellerById,
  uploadMiddleware,
  uploadId,
  uploadTaxation,
  uploadLogo,
  requestSellerDeletionIfNoUpcomingProducts,
  calcSellerRevenue,
};
