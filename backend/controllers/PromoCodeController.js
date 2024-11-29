const PromoCode = require("../models/PromoCode");
const Tourist = require("../models/Tourist");
const nodemailer = require("nodemailer");

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

// Send promo code on user's birthday
const sendBirthdayPromoCode = async (req, res) => {
  try {
    const today = new Date();
    const tourists = await Tourist.find({
      DOB: {
        $eq: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      },
    });

    if (!tourists.length)
      return res.status(200).json({ message: "No birthdays today" });

    tourists.forEach(async (tourist) => {
      const promoCode = new PromoCode({
        code: `HBD-${tourist.username.toUpperCase()}-${Date.now()}`,
        discount: 20, // 20% discount
        expirationDate: new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate()
        ), // 1 month validity
        usageLimit: 1,
        applicableRoles: ["tourist"],
      });

      await promoCode.save();

      // Send email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: tourist.email,
        subject: "Happy Birthday! Here's Your Promo Code 🎉",
        text: `Dear ${
          tourist.username
        },\n\nCelebrate your special day with this exclusive promo code: ${
          promoCode.code
        }.\nEnjoy a 20% discount on your next booking. Code valid until ${promoCode.expirationDate.toDateString()}.\n\nBest Wishes,\nVirtual Trip Planner Team`,
      };

      await transporter.sendMail(mailOptions);
    });

    res.status(200).json({ message: "Birthday promo codes sent!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    if (!promoCode.applicableRoles.includes(user.role))
      return res
        .status(403)
        .json({ message: "Promo code not applicable for your role" });

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
    console.log("Fetching all promo codes created by admin..."); // Debug message

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
};
