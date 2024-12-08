const {
  User,
  ActivityBooking,
  ItineraryBooking,
  ProductPurchasing,
} = require("../models");
const bcrypt = require("bcrypt");
const { populate } = require("../models/User");

const addAdmin = async (req, res) => {
  const { username, password } = req.body;
  const role = "admin";
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const admin = new User({
      username,
      password: hashedPassword,
      role,
    });
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findOne({ _id: id, role: "admin" });

    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).send;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editAdmin = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send(updatedAdmin);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const calcGiftShopRevenue = async (req, res) => {
  const { startDate, endDate, productId } = req.query;

  try {
    // Build the match filter for date and productId
    const matchFilter = {
      ...(productId && {
        "productDetails._id": new mongoose.Types.ObjectId(productId),
      }),
      ...(startDate || endDate
        ? {
            date: {
              ...(startDate && { $gte: new Date(startDate) }),
              ...(endDate && { $lte: new Date(endDate) }),
            },
          }
        : {}),
      status: { $ne: "Cancelled" },
      "sellerDetails.role": "admin", // Ensure only 'admin' sellers are included
    };

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
      {
        $lookup: {
          from: "users",
          localField: "productDetails.seller",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      { $unwind: "$sellerDetails" },
      {
        $match: matchFilter,
      },
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

const calcVTPRevenue = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    //sum 10% of all bookings in ActivityBooking
    const bookings = await ActivityBooking.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("activity");
    let activityRevenue = 0;
    bookings.forEach((booking) => {
      activityRevenue += booking.activity.price * 0.1;
    });
    //sum 10% of all bookings in ItineraryBooking
    const itineraries = await ItineraryBooking.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("itinerary");
    let itineraryRevenue = 0;
    itineraries.forEach((itinerary) => {
      itineraryRevenue += itinerary.itinerary.price * 0.1;
    });
    //sum all revenue from gift shop
    const purchases = await ProductPurchasing.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate({
      path: "product",
      populate: [{ path: "seller", select: "role" }],
    });
    let productRevenue = 0;
    purchases.forEach((purchase) => {
      if (purchase.product.seller.role === "admin")
        productRevenue += purchase.product.price;
    });
    res.status(200).json({
      totalRevenue: activityRevenue + itineraryRevenue + productRevenue,
      activityRevenue,
      itineraryRevenue,
      productRevenue,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const calcSystemUsers = async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = {};
  if (startDate) {
    filter.createdAt = { $gte: new Date(startDate) };
  }
  if (endDate) {
    filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate) };
  }
  //console.log(filter);
  try {
    const users = await User.find(filter, { _id: 1, createdAt: 1 });

    //console.log(users);
    res.status(200).json(users.length);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  deleteUser,
  getAdminById,
  editAdmin,
  calcGiftShopRevenue,
  calcVTPRevenue,
  calcSystemUsers,
};
