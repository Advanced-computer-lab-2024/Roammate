const UserCart = require("../models/UserCart");

// Add a product to the cart
const addProductToCart = async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters
  const { productId, quantity } = req.body; // Extract productId and quantity from request body

  try {
    const cart = await UserCart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists for the user, create a new one with the product
      const newCart = new UserCart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
      await newCart.save();
      return res.status(200).json(newCart);
    }

    // If cart exists, check if the product is already in the cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex >= 0) {
      // If product exists, increment its quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // If product does not exist, add it to the cart
      cart.products.push({ product: productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

// Update product quantity in the cart
const updateProductQuantity = async (req, res) => {
  const { userId } = req.params; // Extract userId from the request parameters
  const { productId, quantity } = req.body; // Extract productId and quantity from the request body

  if (quantity === 0) {
    removeProductFromCart(req, res);
    return;
  }

  try {
    const cart = await UserCart.findOneAndUpdate(
      { user: userId, "products.product": productId },
      {
        $set: {
          "products.$.quantity": quantity, // Update the quantity of the specific product
        },
      },
      { new: true } // Return the updated document
    );
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating product quantity in cart:", error);
    res.status(500).json({ message: "Error updating product quantity", error });
  }
};

// Remove a product from the cart
const removeProductFromCart = async (req, res) => {
  const { userId } = req.params; // Extract userId from the request parameters
  const { productId } = req.body; // Extract productId from the request body

  try {
    const cart = await UserCart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          products: { product: productId }, // Remove the specific product from the cart
        },
      },
      { new: true } // Return the updated document
    );
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res
      .status(500)
      .json({ message: "Error removing product from cart", error });
  }
};

// Get the user's cart
const getUserCart = async (req, res) => {
  const { userId } = req.params; // Extract userId from the request parameters

  try {
    const cart = await UserCart.findOne({ user: userId }).populate(
      "products.product" // Populate the product details in the cart
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ message: "Error fetching user cart", error });
  }
};

module.exports = {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  getUserCart,
};
