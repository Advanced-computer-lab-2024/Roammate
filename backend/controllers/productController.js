const { Product } = require("../models"); // Ensure this path is correct
/*name, image, price, description, seller, reviews, quantity, averageRating*/

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
  try {
    const products = await Product.find()
      .populate("seller", "username")
      .populate("reviews");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate("seller", "username")
      .populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
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
  const { id } = req.params; // Get the product ID from the URL
  const { name, image, price, description, quantity, reviews, averageRating } =
    req.body; // Get the fields to update from the request body

  try {
    // Find the product by ID and update it with the new details
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
      { new: true, runValidators: true } // Return the updated document and run schema validators
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
  try {
    const products = await Product.find({ seller: id })
      .populate("seller", "username")
      .populate("reviews");
    res.status(200).json(products);
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
  const { query, minPrice, maxPrice, order } = req.query;
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
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
};
