const mongoose = require("mongoose");
const { Tourist } = require("../models");
const {
  ActivityBooking,
  MonumentsVisiting,
  ItineraryBooking,
} = require("../models");
const AccountDeletionRequest = require("../models/AccountDeletionRequest");

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

const updateUserOnOrder = async (userId, orderPrice) => {
  try {
    // Find the user by ID
    let user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Step 1: Decrement wallet by the price of the order
    if (user.wallet < orderPrice) {
      throw new Error("Insufficient funds in wallet");
    }
    user.wallet -= orderPrice;

    // Step 2: Add 50,000 points to the user's current points
    user.points += 50000;

    // Step 3 & 4: Check and adjust level if needed
    if (user.points > 500000) {
      user.level = 3;
    } else if (user.points > 100000) {
      user.level = 2;
    } else {
      user.level = 1;
    }

    // Save the user after updates
    await user.save();

    // Return updated user information
    return user;
  } catch (error) {
    throw new Error(`Error updating user on order: ${error.message}`);
  }
};

const redeemPointsToCash = async (userId, pointsToRedeem) => {
  try {
    // Find the user by ID
    let user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user has enough points to redeem
    if (user.points < pointsToRedeem) {
      throw new Error("Insufficient points to redeem");
    }

    // Calculate cash equivalent (10,000 points = 100 EGP)
    const cashEquivalent = (pointsToRedeem / 10000) * 100;

    // Update wallet and points balance
    user.wallet += cashEquivalent;
    user.points -= pointsToRedeem;

    // Save the updated user
    await user.save();

    // Return updated user information
    return user;
  } catch (error) {
    throw new Error(`Error redeeming points: ${error.message}`);
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

module.exports = {
  register,
  getAllTourists,
  getTouristById,
  updateTouristById,
  getBookedTransportations,
  updateUserOnOrder,
  redeemPointsToCash,
  requestTouristDeletionIfNoUpcomingBookings,
};
