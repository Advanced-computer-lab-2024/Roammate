const PromoCode = require("../models/PromoCode");
const Tourist = require("../models/Tourist");
const sendEmail = require("../utils/nodeMailer");

// Create a promo code
const createPromoCode = async (req, res) => {
  const {
    code,
    discount,
    expirationDate,
    usageLimit,
    userId, // Assumes `userId` can be null if not provided
  } = req.body;

  try {
    const promoCode = new PromoCode({
      code,
      discount,
      expirationDate,
      usageLimit,
      userId, // Include if provided
    });

    await promoCode.save();
    res.status(201).json(promoCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Send promo code on user's birthday
const sendBirthdayPromoCode = async () => {
  // console.log("Running birthday promo code function...");
  try {
    const today = new Date();

    // Calculate MM-DD for yesterday, today, and tomorrow
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const yesterdayMMDD = `${String(yesterday.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(yesterday.getDate()).padStart(2, "0")}`;
    const todayMMDD = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
    const tomorrowMMDD = `${String(tomorrow.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(tomorrow.getDate()).padStart(2, "0")}`;

    // console.log("Checking birthdays for:", yesterdayMMDD, todayMMDD, tomorrowMMDD);

    // Fetch all tourists and compare their MM-DD values
    const allTourists = await Tourist.find({});
    // console.log("Total tourists:", allTourists.length);

    const matchedTourists = allTourists.filter((tourist) => {
      const dobMMDD = tourist.DOB.toISOString().slice(5, 10); // Extract MM-DD from DOB
      // console.log(`Tourist: ${tourist.username}, DOB: ${dobMMDD}`);
      if ([yesterdayMMDD, todayMMDD, tomorrowMMDD].includes(dobMMDD)) {
        // console.log(`Match found: ${tourist.username} with DOB: ${dobMMDD}`);
        return true;
      } else {
        // console.log(`No match for: ${tourist.username} with DOB: ${dobMMDD}`);
        return false;
      }
    });

    if (!matchedTourists.length) {
      // console.log("No matching birthdays found.");
      return;
    }

    for (const tourist of matchedTourists) {
      // console.log("Processing birthday for:", tourist.username);

      // Check if promo code was already sent this year
      if (tourist.birthdayPromoSent) {
        if (tourist.birthdayPromoSent.getFullYear() === today.getFullYear()) {
          // console.log("Promo code already sent this year.");
          continue; // Skip if already sent
        }
      }

      const promoCode = new PromoCode({
        code: Math.random().toString(36).substring(2, 7).toUpperCase(), // Generate a 5-char alphanumeric code

        discount: 20, // 20% discount
        expirationDate: new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate()
        ), // 1 month valid
        usageLimit: 1,
        userId: tourist._id,
      });

      await promoCode.save();

      try {
        tourist.notifications.push({
          message: `Happy Birthday! Enjoy your promo code: ${
            promoCode.code
          }.\n20% discount on your next booking, until ${promoCode.expirationDate.toDateString()}.`,
        });
        sendEmail(
          tourist.email,
          "Happy Birthday! Here's Your Promo Code 🎉",
          `Dear ${
            tourist.username
          },\n\nCelebrate your special day with this exclusive promo code: ${
            promoCode.code
          }.\nEnjoy a 20% discount on your next booking. Code valid until ${promoCode.expirationDate.toDateString()}.\n\nBest Wishes,\nVirtual Trip Planner Team`
        );
        // console.log(`Promo email sent to: ${tourist.email}`);
      } catch (emailError) {
        console.error(
          `Failed to send email to ${tourist.email}:`,
          emailError.message
        );
        continue; // Skip updating if email fails
      }

      // Update `birthdayPromoSent` flag
      tourist.birthdayPromoSent = new Date();
      await tourist.save();
      console.log(`Promo sent status updated for: ${tourist.username}`);
    }

    // console.log("Birthday promo codes process completed!");
  } catch (error) {
    console.error("Error in sendBirthdayPromoCode:", error.message);
  }
};

const resetBirthdayPromoSent = async (req, res) => {
  try {
    const result = await Tourist.updateMany(
      {},
      { $set: { birthdayPromoSent: null } }
    );
    res.status(200).json({
      message: `Reset birthdayPromoSent for ${result.modifiedCount} tourists.`,
    });
  } catch (error) {
    console.error("Error resetting birthdayPromoSent:", error.message);
    res.status(500).json({
      message: "Error resetting birthdayPromoSent.",
      error: error.message,
    });
  }
};

// Apply promo code
const applyPromoCode = async (req, res) => {
  const { code, userId } = req.body;

  try {
    const promoCode = await PromoCode.findOne({ code });
    if (!promoCode)
      return res.status(404).json({ message: "Promo code not found" });

    if (new Date(promoCode.expirationDate) < new Date())
      return res.status(400).json({ message: "Promo code has expired" });

    if (promoCode.usageCount >= promoCode.usageLimit)
      return res
        .status(400)
        .json({ message: "Promo code usage limit reached" });

    // Optional: Check if the user role matches the promo code's applicable roles
    const user = await Tourist.findById(userId);
    if (promoCode.userId	&& promoCode.userId.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Promo code not applicable for this user" });

    // Increment usage count
    promoCode.usageCount += 1;
    await promoCode.save();

    res.status(200).json({
      message: "Promo code applied successfully",
      discount: promoCode.discount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find(); // Retrieve all promo codes
    res.status(200).json(promoCodes);
  } catch (error) {
    console.error("Error fetching promo codes:", error.message); // Log error
    res.status(500).json({
      message: "Server error: Failed to fetch promo codes",
      error: error.message,
    });
  }
};

const getPromoCodesByUser = async (req, res) => {
  const { userId } = req.params; // Retrieve userId from request parameters

  try {
    console.log(`Fetching promo codes assigned to user with ID: ${userId}`); // Debug message

    const promoCodes = await PromoCode.find({ userId: userId }); // Filter by userId
    res.status(200).json(promoCodes);
  } catch (error) {
    console.error("Error fetching user's promo codes:", error.message); // Log error
    res.status(500).json({
      message: "Server error: Failed to fetch user's promo codes",
      error: error.message,
    });
  }
};

module.exports = {
  createPromoCode,
  sendBirthdayPromoCode,
  applyPromoCode,
  getAllPromoCodes,
  getPromoCodesByUser,
  resetBirthdayPromoSent,
};
