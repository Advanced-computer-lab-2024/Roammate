const mongoose = require("mongoose");
const { Seller } = require("../models");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

// username, password, role, email, name, about
const register = async (req, res) => {
  const { username, email, password, name, about } = req.body;
  const role = "seller";
  try {
    const seller = new Seller({
      username,
      email,
      password,
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

module.exports = {
  register,
  getAllSellers,
  getSellerById,
  updateSellerById,
  uploadMiddleware,
  uploadId,
  uploadTaxation,
  uploadLogo,
};
