const { Advertiser } = require("../models");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const multer = require("multer");
const Activity = require("../models/Activity");
const ActivityBooking = require("../models/ActivityBooking");
const AccountDeletionRequest = require("../models/AccountDeletionRequest");
const bcrypt = require("bcrypt");

// username, password, role, email, website, hotline, companyProfile

const register = async (req, res) => {
  const { username, email, password, website, hotline, companyProfile } =
    req.body;
  const role = "advertiser";
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const advertiser = new Advertiser({
      username,
      email,
      password: hashedPassword,
      role,
      website,
      hotline,
      companyProfile,
    });
    await advertiser.save();
    res.status(201).send(advertiser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAdvertiserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const advertiser = await Advertiser.findById(id);
    if (!advertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateAdvertiserById = async (req, res) => {
  const { id } = req.params;
  const { password, email, website, hotline, companyProfile } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const advertiser = await Advertiser.findByIdAndUpdate(
      id,
      { password, email, website, hotline, companyProfile },
      { new: true, runValidators: true }
    );
    if (!advertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllAdvertisers = async (req, res) => {
  try {
    const advertisers = await Advertiser.find({});
    res.status(200).send(advertisers);
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
    const advertiser = await Advertiser.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!advertiser) {
      return res.status(404).send("Tour Guide not found.");
    }
    advertiser.documents.identification = req.file.id;
    await advertiser.save();
    // console.log(advertiser);
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
    const advertiser = await Advertiser.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!advertiser) {
      return res.status(404).send("Advertiser not found.");
    }
    advertiser.documents.taxation = req.file.id;
    await advertiser.save();
    res.send("File uploaded and associated with advertiser successfully.");
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
    const advertiser = await Advertiser.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!advertiser) {
      return res.status(404).send("Advertiser not found.");
    }
    advertiser.documents.logo = req.file.id;
    await advertiser.save();
    res.send("File uploaded and associated with advertiser successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

const requestAdvertiserDeletionIfNoUpcomingBookings = async (req, res) => {
  const advertiserId = req.params.id;

  try {
    // Step 1: Find upcoming activities for the advertiser
    const upcomingActivities = await Activity.find({
      advertiser: advertiserId,
      startDate: { $gte: new Date() }, // Only consider upcoming activities
    });
    // Step 2: Check if any upcoming activity has bookings
    const hasBookingsOnUpcomingActivities = await Promise.all(
      upcomingActivities.map(async (activity) => {
        const bookingExists = await ActivityBooking.exists({
          activity: activity._id,
        });
        return bookingExists; // Returns true if a booking exists for this activity
      })
    );

    console.log(hasBookingsOnUpcomingActivities.every((exists) => !exists));

    // Step 3: Determine if deletion request can be created
    const canRequestDeletion = hasBookingsOnUpcomingActivities.every(
      (exists) => !exists
    );

    if (canRequestDeletion) {
      // If criteria are met, create a deletion request for the advertiser
      const deletionRequest = new AccountDeletionRequest({
        accountType: "Advertiser",
        accountId: advertiserId,
      });
      await deletionRequest.save();

      res.status(201).json({
        message: "Account deletion request created successfully.",
        deletionRequest,
      });
    } else {
      // Else, return an error message
      res.status(400).json({
        message:
          "Cannot create account deletion request. There are upcoming activities with bookings.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  getAllAdvertisers,
  getAdvertiserById,
  updateAdvertiserById,
  uploadMiddleware,
  uploadId,
  uploadTaxation,
  uploadLogo,
  requestAdvertiserDeletionIfNoUpcomingBookings,
};
