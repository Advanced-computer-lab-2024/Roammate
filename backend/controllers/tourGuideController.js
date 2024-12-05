const { default: mongoose } = require("mongoose");
const { TourGuide, Review } = require("../models");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const AccountDeletionRequest = require("../models/AccountDeletionRequest");
const ItineraryBooking = require("../models/ItineraryBooking");
const bcrypt = require("bcrypt");

// username, password, role, email, mobile, yearsOfExperience, previousWork, languages, about
const register = async (req, res) => {
  const {
    username,
    email,
    password,
    mobile,
    yearsOfExperience,
    previousWork,
    languages,
    about,
  } = req.body;
  const role = "tour guide";
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const tourGuide = new TourGuide({
      username,
      email,
      password: hashedPassword,
      role,
      mobile,
      yearsOfExperience,
      previousWork,
      languages,
      about,
    });
    await tourGuide.save();
    res.status(201).send(tourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTourGuideById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourGuide = await TourGuide.findById(id);
    if (!tourGuide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }
    res.status(200).json(tourGuide);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTourGuideById = async (req, res) => {
  const { id } = req.params;
  const {
    password,
    email,
    mobile,
    yearsOfExperience,
    previousWork,
    languages,
    about,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourGuide = await TourGuide.findByIdAndUpdate(
      id,
      {
        password,
        email,
        mobile,
        yearsOfExperience,
        previousWork,
        languages,
        about,
      },
      { new: true }
    );
    if (!tourGuide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }
    res.status(200).json(tourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTourGuides = async (req, res) => {
  try {
    const tourGuides = await TourGuide.find({});
    res.status(200).send(tourGuides);
  } catch (error) {
    res.send({ message: error.message });
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
    const tourGuide = await TourGuide.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!tourGuide) {
      return res.status(404).send("Tour Guide not found.");
    }
    tourGuide.documents.identification = req.file.id;
    await tourGuide.save();
    // console.log(tourGuide);
    res.send("File uploaded and associated with tour guide successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

// Uploading Certificate
const uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const tourGuide = await TourGuide.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!tourGuide) {
      return res.status(404).send("Tour Guide not found.");
    }
    tourGuide.documents.certificate = req.file.id;
    await tourGuide.save();
    res.send("File uploaded and associated with tour guide successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

// Uploading Photo
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const tourGuide = await TourGuide.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.userId)
    );
    if (!tourGuide) {
      return res.status(404).send("Tour Guide not found.");
    }
    tourGuide.documents.photo = req.file.id;
    await tourGuide.save();
    res.send("File uploaded and associated with tour guide successfully.");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during the file upload.");
  }
};

const addReviewToTourguide = async (req, res) => {
  const tourguideId = req.params.id;
  const { user, rating, comment, date } = req.body;
  try {
    const newReview = new Review({
      user,
      rating,
      comment,
      date,
    });
    const reviewId = newReview._id;
    await newReview.save();
    const tourguide = await TourGuide.findById(tourguideId).populate("reviews");

    if (!tourguide) {
      return res.status(404).json({ error: "Tour guide not found" });
    }

    const OldTtotalRating = tourguide.averageRating * tourguide.reviews.length;

    tourguide.reviews.push(reviewId);

    const newTotalRating = OldTtotalRating + rating;

    const newAverageRating = newTotalRating / tourguide.reviews.length;

    // console.log(`OldTtotalRating: ${OldTtotalRating},
    //   newTotalRating: ${newTotalRating},
    //   newAverageRating: ${newAverageRating}`);
    tourguide.averageRating = newAverageRating;

    const updatedTourguide = await tourguide.save();

    res.status(200).json(updatedTourguide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTourGuideIfNoUpcomingBookings = async (req, res) => {
  const { id } = req.params;
  const currentDate = new Date();

  try {
    // Check if the tour guide exists
    const tourGuide = await TourGuide.findById({ _id: id });
    if (!tourGuide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }
    // Find any upcoming bookings for itineraries created by this tour guide
    const upcomingBooking = await ItineraryBooking.findOne({
      date: { $gte: currentDate },
    })
      .populate({
        path: "itinerary",
        match: { tourGuide: id }, // Match only itineraries created by this tour guide
      })
      .exec();

    // If there is an upcoming booking for one of their itineraries, deny deletion
    if (upcomingBooking && upcomingBooking.itinerary) {
      return res.status(403).json({
        message: "Deletion denied: Tour guide has upcoming booked itineraries.",
      });
    }

    // No upcoming bookings found, proceed with creating a deletion request
    const deletionRequest = new AccountDeletionRequest({
      accountType: "Tour Guide",
      accountId: id,
      status: "pending",
    });
    await deletionRequest.save();

    res.status(201).json({
      message: "Account deletion request for tour guide created successfully.",
      deletionRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calcTourguideRevenue = async (req, res) => {
  const { id, startDate, endDate, activityId } = req.query;

  try {
    const matchFilter = {
      ...(id && {
        "itineraryDetails.tourGuide": new mongoose.Types.ObjectId(id),
      }),
      ...(activityId && {
        "itineraryDetails._id": new mongoose.Types.ObjectId(activityId),
      }),
    };

    if (startDate || endDate) {
      matchFilter.date = {
        ...(startDate && { $gte: new Date(startDate) }),
        ...(endDate && { $lte: new Date(endDate) }),
      };
    }

    const revenueData = await ItineraryBooking.aggregate([
      {
        $lookup: {
          from: "itineraries",
          localField: "itinerary",
          foreignField: "_id",
          as: "itineraryDetails",
        },
      },
      { $unwind: "$itineraryDetails" },
      { $match: matchFilter },
      {
        $group: {
          _id: "$itineraryDetails._id",
          itineraryTitle: { $first: "$itineraryDetails.title" },
          itineraryPrice: { $first: "$itineraryDetails.price" },
          totalRevenue: { $sum: "$itineraryDetails.price" },
          bookingCount: { $sum: 1 },
        },
      },
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
  getAllTourGuides,
  getTourGuideById,
  updateTourGuideById,
  uploadMiddleware,
  uploadId,
  uploadCertificate,
  uploadPhoto,
  addReviewToTourguide,
  deleteTourGuideIfNoUpcomingBookings,
  calcTourguideRevenue,
};
