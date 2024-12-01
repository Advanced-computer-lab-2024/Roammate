const { ProductWishlist, Product } = require("../models");

const addProductToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlist = await ProductWishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product to wishlist", error });
  }
};

const getWishlistByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await ProductWishlist.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "No wishlist found for the user" });
    }

    res.status(200).json(wishlist.products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user's wishlist", error });
  }
};

const toggleProductInWishlist = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlist = await ProductWishlist.findOne({ user: userId });

    if (!wishlist) {
      const newWishlist = new ProductWishlist({
        user: userId,
        products: [productId],
      });
      await newWishlist.save();
      return res
        .status(200)
        .json({ message: "Product added to wishlist", wishlist: newWishlist });
    }

    const isProductWishlisted = wishlist.products.includes(productId);

    if (isProductWishlisted) {
      wishlist.products = wishlist.products.filter(
        (product) => product.toString() !== productId
      );
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product removed from wishlist", wishlist });
    } else {
      wishlist.products.push(productId);
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product added to wishlist", wishlist });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling product in wishlist", error });
  }
};

module.exports = {
  addProductToWishlist,
  getWishlistByUserId,
  toggleProductInWishlist,
};
