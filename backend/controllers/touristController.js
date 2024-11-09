const mongoose = require("mongoose");
const { Tourist } = require("../models");
const {
  ActivityBooking,
  MonumentsVisiting,
  ItineraryBooking,
} = require("../models");
const AccountDeletionRequest = require("../models/AccountDeletionRequest");
const PreferenceTag = require("../models/PreferenceTag");

const register = async (req, res) => {
  const { username, email, password, mobile, nationality, DOB, job } = req.body;
  const role = "tourist";
  try {
    const tourist = new Tourist({
      username,
      email,
      password,
      role,
      mobile,
      nationality,
      DOB,
      job,
    });
    await tourist.save();
    res.status(201).send(tourist);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTouristById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }
    res.status(200).json(tourist);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTouristById = async (req, res) => {
  const { id } = req.params;
  const { password, email, mobile, nationality, job, preferredCurrency } =
    req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  // Validate preferredCurrency if provided
  const supportedCurrencies = ["USD", "EGP", "EUR"]; // Add more supported currencies as needed
  if (preferredCurrency && !supportedCurrencies.includes(preferredCurrency)) {
    return res.status(400).json({ message: "Unsupported currency" });
  }

  try {
    const tourist = await Tourist.findByIdAndUpdate(
      id,
      { password, email, mobile, nationality, job, preferredCurrency },
      { new: true, runValidators: true }
    );

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    res.status(200).json(tourist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find({});
    res.status(200).send(tourists);
  } catch (error) {
    res.status(500).send;
  }
};

// Get list of booked transportations for a tourist
const getBookedTransportations = async (req, res) => {
  const touristId = req.body.touristId;

  try {
    // Find the tourist and populate the bookedTransportations field
    const tourist = await Tourist.findById(touristId).populate(
      "bookedTransportations"
    );

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Send the list of booked transportations
    res.status(200).json(tourist.bookedTransportations);
  } catch (error) {
    console.error("Error retrieving booked transportations:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve booked transportations", error });
  }
};

const payCashFromWallet = async (touristId, amountPaid) => {
  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);

    // Check if the tourist has enough money in the wallet
    if (tourist.wallet < amountPaid) {
      throw new Error("Insufficient funds in wallet");
    }
    // Deduct the amount paid from the wallet
    tourist.wallet -= amountPaid;

    // Calculate loyalty points based on current level
    let pointsEarned;
    switch (tourist.level) {
      case 1:
        pointsEarned = amountPaid * 0.5;
        break;
      case 2:
        pointsEarned = amountPaid * 1;
        break;
      case 3:
        pointsEarned = amountPaid * 1.5;
        break;
      default:
        pointsEarned = 0;
    }

    // Update tourist's points
    tourist.points += pointsEarned;

    // Check and update level based on new points total
    if (tourist.points > 500000) {
      tourist.level = 3;
    } else if (tourist.points > 100000) {
      tourist.level = 2;
    } else {
      tourist.level = 1;
    }
    // Save changes to database
    await tourist.save();
  } catch (error) {
    throw new Error("Error paying from wallet! ", error);
  }
};
const refundCashToWallet = async (touristId, amountReturned) => {
  try {
    // console.log("refundCashToWallet", touristId, amountReturned);
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    // Add the amount returned to the wallet
    tourist.wallet += amountReturned;
    let pointsDeducted;
    switch (tourist.level) {
      case 1:
        pointsDeducted = amountReturned * 0.5;
        break;
      case 2:
        pointsDeducted = amountReturned * 1;
        break;
      case 3:
        pointsDeducted = amountReturned * 1.5;
        break;
      default:
        pointsDeducted = 0;
    }
    // Update tourist's points
    tourist.points -= pointsDeducted;
    tourist.points = tourist.points < 0 ? 0 : tourist.points;
    // Check and update level based on new points total
    if (tourist.points > 500000) {
      tourist.level = 3;
    } else if (tourist.points > 100000) {
      tourist.level = 2;
    } else {
      tourist.level = 1;
    }
    // Save changes to database
    await tourist.save();
  } catch (error) {
    // console.log("Error returning cash to wallet! ", error);
    throw new Error("Error returning cash to wallet! ", error);
  }
};

const redeemPointsToCash = async (req, res) => {
  const { touristId } = req.params; // Get touristId from URL parameters
  const { pointsToRedeem } = req.body;
  const conversionRate = 100; // EGP for every 10,000 points
  const pointsRequiredForRedemption = 10000;
  // console.log("redeemPointsToCash", touristId, pointsToRedeem);
  try {
    // Fetch the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).send({ message: "Tourist not found" });
    }
    if (pointsToRedeem <= 0) {
      return res
        .status(400)
        .send({ message: "Points to redeem must be greater than 0." });
    }
    // Check if tourist has enough points to redeem
    if (tourist.points < pointsToRedeem) {
      return res
        .status(400)
        .send({ message: "Insufficient points to redeem." });
    }
    if (pointsToRedeem % pointsRequiredForRedemption !== 0) {
      return res.status(400).send({
        message: `Points must be in multiples of ${pointsRequiredForRedemption}.`,
      });
    }

    // Calculate the amount to add to the wallet
    const cashAmount =
      (pointsToRedeem / pointsRequiredForRedemption) * conversionRate;

    // Deduct points and update wallet balance
    tourist.points -= pointsToRedeem;
    tourist.wallet += cashAmount;

    // Check and update level based on new points total
    if (tourist.points > 500000) {
      tourist.level = 3;
    } else if (tourist.points > 100000) {
      tourist.level = 2;
    } else {
      tourist.level = 1;
    }

    // Save changes to the database
    await tourist.save();

    // Send the updated tourist object as response
    res.status(200).send(tourist);
  } catch (error) {
    res.status(500).send({ message: "Error redeeming points to cash", error });
  }
};

const requestTouristDeletionIfNoUpcomingBookings = async (req, res) => {
  const touristId = req.params.id;

  try {
    // Step 1: Check for upcoming itineraries with bookings for the tourist
    const upcomingItineraries = await ItineraryBooking.exists({
      user: touristId,
      date: { $gte: new Date() }, // Only consider upcoming dates
    });

    // Step 2: Check for upcoming activities with bookings for the tourist
    const upcomingActivities = await ActivityBooking.exists({
      user: touristId,
      date: { $gte: new Date() }, // Only consider upcoming dates
    });

    // Step 3: Check for upcoming monument visits for the tourist
    const upcomingMonuments = await MonumentsVisiting.exists({
      user: touristId,
      date: { $gte: new Date() }, // Only consider upcoming dates
    });

    // Step 4: Check if the tourist has booked any transportations
    const tourist = await Tourist.findById(touristId).select(
      "bookedTransportations"
    );
    const hasBookedTransportations =
      tourist && tourist.bookedTransportations.length > 0;

    // Step 5: Determine if deletion request can be created
    const canRequestDeletion =
      !upcomingItineraries &&
      !upcomingActivities &&
      !upcomingMonuments &&
      !hasBookedTransportations;

    if (canRequestDeletion) {
      // If no upcoming bookings or transportations, create a deletion request for the tourist
      const deletionRequest = new AccountDeletionRequest({
        accountType: "Tourist",
        accountId: touristId,
      });
      await deletionRequest.save();

      res.status(201).json({
        message: "Account deletion request created successfully.",
        deletionRequest,
      });
    } else {
      // If there are upcoming bookings or transportations, return an error message
      res.status(400).json({
        message:
          "Cannot create account deletion request. There are upcoming bookings or transportations.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add preferences to a tourist's profile
const setPreferences = async (req, res) => {
  const touristId = req.params.id;
  const { preferences } = req.body;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    // Add preferences, avoiding duplicates
    tourist.preferences = preferences;
    await tourist.save();
    res.status(200).json(tourist.preferences);
  } catch (error) {
    res.status(500).json({ message: "Error adding preferences", error });
  }
};

const setActivityCategories = async (req, res) => {
  const touristId = req.params.id;
  const { activityCategories } = req.body;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    // Add activity categories, avoiding duplicates
    tourist.activityCategories = activityCategories;
    await tourist.save();
    res.status(200).json(tourist.activityCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding activity categories", error });
  }
};

module.exports = {
  register,
  getAllTourists,
  getTouristById,
  updateTouristById,
  getBookedTransportations,
  payCashFromWallet,
  refundCashToWallet,
  redeemPointsToCash,
  requestTouristDeletionIfNoUpcomingBookings,
  setPreferences,
  setActivityCategories,
};
