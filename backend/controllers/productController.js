const { Product, Review, ProductPurchasing, User } = require("../models");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

/*name, image, price, description, seller, reviews, quantity, averageRating*/

const convertCurrency = require("./CurrencyConvertController");
const { default: mongoose } = require("mongoose");
const sendEmail = require("../utils/nodeMailer");

const addProduct = async (req, res) => {
  const { name, image, price, description, seller, quantity } = req.body;

  const newProduct = new Product({
    name,
    // image,
    price,
    description,
    seller,
    quantity,
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  const { currency = "USD" } = req.query; // Default currency is USD
  try {
    const products = await Product.find()
      .populate("seller", "username")
      .populate("reviews");

    const convertedProducts = products.map((product) => {
      const convertedPrice = convertCurrency(product.price, "USD", currency);
      return {
        ...product.toObject(),
        price: convertedPrice.toFixed(2),
        currency,
      };
    });
    res.status(200).json(convertedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { currency = "USD" } = req.query;
  try {
    const product = await Product.findById(id)
      .populate("seller", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const convertedPrice = convertCurrency(product.price, "USD", currency);
    res.status(200).json({
      ...product.toObject(),
      price: convertedPrice.toFixed(2),
      currency,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, image, price, description, quantity, reviews, averageRating } =
    req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        price,
        description,
        quantity,
        reviews,
        averageRating,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

const getProductsBySellerId = async (req, res) => {
  const { id } = req.params;
  const { query, minPrice, maxPrice, order } = req.query;
  try {
    const searchCriteria = getSearchCriteria(query);
    const filterCriteria = getFilterCriteria(minPrice, maxPrice);
    const sortCriteria = getSortCriteria(order);
    const products = await Product.find({
      ...searchCriteria,
      ...filterCriteria,
      seller: id,
    })
      .populate("seller", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      })
      .sort(sortCriteria);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//price
const getFilterCriteria = (minPrice, maxPrice) => {
  const filterCriteria = {};
  filterCriteria.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
  return filterCriteria;
};

//price, rating
const getSortCriteria = (order) => {
  const sortCriteria = {};
  if (order === "price") {
    sortCriteria.price = 1;
  } else if (order === "-price") {
    sortCriteria.price = -1;
  } else if (order === "rating") {
    sortCriteria.averageRating = 1;
  } else if (order === "-rating") {
    sortCriteria.averageRating = -1;
  } else {
    sortCriteria.averageRating = -1;
  }
  return sortCriteria;
};

const getSearchCriteria = (query) => {
  if (!query) return {};
  const searchCriteria = { $text: { $search: query } };
  return searchCriteria;
};

const searchProductWithFilters = async (req, res) => {
  const { query, minPrice, maxPrice, order, currency = "USD" } = req.query;
  try {
    const searchCriteria = getSearchCriteria(query);
    const filterCriteria = getFilterCriteria(minPrice, maxPrice);
    const sortCriteria = getSortCriteria(order);
    const products = await Product.find({
      ...searchCriteria,
      ...filterCriteria,
      archived: false,
    })
      .populate("seller", "username")
      .populate("reviews")
      .sort(sortCriteria);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReviewToProduct = async (req, res) => {
  const productId = req.params.id;
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
    const product = await Product.findById(productId).populate("reviews");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const OldTtotalRating = product.averageRating * product.reviews.length;

    product.reviews.push(reviewId);

    const newTotalRating = OldTtotalRating + rating;

    const newAverageRating = newTotalRating / product.reviews.length;

    product.averageRating = newAverageRating;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasedProductsByTouristId = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await ProductPurchasing.find({ user: id })
      .populate({
        path: "product",
        populate: [
          { path: "seller" },
          {
            path: "reviews",
            populate: { path: "user" },
          },
        ],
      })
      .populate("user")
      .sort({ date: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

const addProductPurchasing = async (req, res) => {
  const { productId, userId, date, status, paymentMethod, quantity } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId).populate("seller");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the requested quantity exceeds available quantity
    if (quantity > product.quantity) {
      return res.status(400).json({
        error: `Requested quantity (${quantity}) exceeds available stock (${product.quantity}).`,
      });
    }

    product.quantity -= quantity;

    // Notify the seller if the product runs out of stock
    if (product.quantity === 0) {
      // If the seller is an admin, notify all admins
      if (product.seller.role === "admin") {
        const admins = await User.find({ role: "admin" });
        admins.forEach(async (admin) => {
          admin.notifications.push({
            message: `Product ${product.name} is out of stock.`,
          });
          // // clear notifications for one run
          // admin.notifications = [];
          await admin.save();
        });
      } else {
        // If the seller is not an admin, notify the seller
        product.seller.notifications.push({
          message: `Product ${product.name} is out of stock.`,
        });
        await product.seller.save();
        sendEmail(
          product.seller.email,
          "Product Out of Stock",
          `Product ${product.name} is out of stock.`
        );
      }
    }

    // Save the updated product
    await product.save();

    // Create a new purchase
    const newProductPurchasing = new ProductPurchasing({
      product: productId,
      user: userId,
      date,
      status,
      paymentMethod,
      quantity,
    });

    // Save the purchase to the database
    await newProductPurchasing.save();

    res.status(201).json(newProductPurchasing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProductPurchasingById = async (req, res) => {
  const { id } = req.params;

  try {
    const productPurchasing = await ProductPurchasing.findById(id);

    if (!productPurchasing) {
      return res.status(404).json({ message: "Product Purchasing not found" });
    }

    const product = await Product.findById(productPurchasing.product);

    if (product) {
      product.quantity += 1;
      await product.save();
    }

    console.log(product);

    await ProductPurchasing.findByIdAndRemove(productPurchasing._id);

    res
      .status(200)
      .json({ message: "Product Purchasing deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product purchasing", error });
  }
};

const updateProductPurchasedStatusById = async (req, res) => {
  const { id } = req.params; // Get the product ID from the URL
  const { status } = req.body; // Get the fields to update from the request body

  try {
    // Find the product by ID and update it with the new details
    const updatedProductPurchasing = await ProductPurchasing.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedProductPurchasing) {
      return res.status(404).json({ message: "Product Purchasing not found" });
    }

    res.status(200).json({
      message: "Product Purchasing updated successfully",
      productPurchasing: updatedProductPurchasing,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product purchasing", error });
  }
};

const toggleArchivedStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Toggle the archived status
    product.archived = !product.archived;
    await product.save();

    res.status(200).json({
      message: `Product ${
        product.archived ? "archived" : "unarchived"
      } successfully`,
      archived: product.archived,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Function to check if a product is archived
const checkIfArchived = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById({ _id: id }, "archived"); // Only fetches the archived field
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      archived: product.archived,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Uploading Photo
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const product = await Product.findById(
      mongoose.Types.ObjectId.createFromHexString(req.query.productId)
    );
    if (!product) {
      return res.status(404).send("Product not found.");
    }
    product.image = req.file.id;
    await product.save();
    res.send("Image uploaded and associated with product successfully.");
  } catch (error) {
    console.error("Error during image upload:", error);
    res.status(500).send("An error occurred during the image upload.");
  }
};

// Function to view available quantity, sales, and sale dates of products for admins/sellers
const getProductStockAndSales = async (req, res) => {
  const { id } = req.params;

  try {
    // Get product details
    const product = await Product.findById(id).populate("seller", "username");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Retrieve completed purchases for the product to get total sales and sale dates
    const completedPurchases = await ProductPurchasing.find({
      product: id,
      // status: "Completed",
    });

    const totalSales = completedPurchases.length;
    const salesDates = completedPurchases.map((purchase) => purchase.date);

    // Return product quantity, total sales, and sale dates
    res.status(200).json({
      product: {
        name: product.name,
        availableQuantity: product.quantity,
        totalSales,
        salesDates,
        price: product.price,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product stock and sales", error });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  getProductsBySellerId,
  deleteProductById,
  updateProductById,
  searchProductWithFilters,
  addReviewToProduct,
  getPurchasedProductsByTouristId,
  addProductPurchasing,
  deleteProductPurchasingById,
  updateProductPurchasedStatusById,
  toggleArchivedStatus,
  checkIfArchived,
  uploadMiddleware,
  uploadImage,
  getProductStockAndSales,
};
