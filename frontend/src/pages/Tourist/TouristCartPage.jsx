import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid2,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import {
  getUserCart,
  updateProductQuantity,
  removeProductFromCart,
} from "../../services/api"; // Adjust the API paths as needed

const TouristCartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch the cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const fetchedCart = await getUserCart(userId);
        setCart(fetchedCart);
        calculateTotalPrice(fetchedCart.products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Calculate the total price of the cart
  const calculateTotalPrice = (products) => {
    const total = products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  // Update product quantity in the cart
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) return; // Prevent setting quantity to less than 1
      await updateProductQuantity(userId, productId, newQuantity);
      const updatedCart = {
        ...cart,
        products: cart.products.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      };
      setCart(updatedCart);
      calculateTotalPrice(updatedCart.products);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove a product from the cart
  const handleRemoveProduct = async (productId) => {
    try {
      await removeProductFromCart(userId, productId);
      const updatedCart = {
        ...cart,
        products: cart.products.filter(
          (item) => item.product._id !== productId
        ),
      };
      setCart(updatedCart);
      calculateTotalPrice(updatedCart.products);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    // Implement checkout logic here
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!cart || cart.products.length === 0) {
    return <Typography>Your cart is empty.</Typography>;
  }

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid2 container spacing={2}>
        {cart.products.map((item) => (
          <Grid2 item xs={12} sm={6} md={4} key={item.product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body1">
                  Price: ${item.product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity - 1)
                  }
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={item.quantity}
                  size="small"
                  sx={{ width: "50px", textAlign: "center" }}
                  inputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity + 1)
                  }
                >
                  <Add />
                </IconButton>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleRemoveProduct(item.product._id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Typography variant="h5">Total: ${totalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default TouristCartPage;
