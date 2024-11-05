const { Product, Review, ProductPurchasing } = require("../models"); // Ensure this path is correct
/*name, image, price, description, seller, reviews, quantity, averageRating*/

const convertCurrency = require("./CurrencyConvertController");

const addProduct = async (req, res) => {
  const { name, image, price, description, seller, quantity } = req.body;

  const newProduct = new Product({
    name,
    image,
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
  const { currency = "USD" } = req.query;
  try {
    const products = await Product.find({ seller: id })
      .populate("seller", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

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
    res.status(500).json({ message: "Error retrieving product", error });
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
    })
      .populate("seller", "username")
      .populate("reviews")
      .sort(sortCriteria);

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
      .sort({ date: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

const addProductPurchasing = async (req, res) => {
  const { productId, userId, date, status } = req.body;

  const newProductPurchasing = new ProductPurchasing({
    product: productId,
    user: userId,
    date,
    status,
  });
  try {
    await newProductPurchasing.save();
    res.status(201).json(newProductPurchasing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductPurchasingById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProductPurchasing = await ProductPurchasing.findByIdAndDelete(
      id
    );
    if (!deletedProductPurchasing) {
      return res.status(404).json({ message: "Product Purchasing not found" });
    }
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
};
