import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import {
  getUserCart,
  updateProductQuantity,
  removeProductFromCart,
  payWallet,
  addProductPurchasing,
  fetchUserAddresses,
  convertPrice,
  applyPromoCode
} from "../../services/api";
import { useOutletContext } from "react-router";

const TouristCartPage = () => {
  const userId = localStorage.getItem("userId");
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [promocodeSuccess, setPromocodeSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Wallet"); // Default payment method
  const [displayTotalPrice, setDisplayTotalPrice] = useState();
  const [productsPrices, setProductsPrices] = useState([]);
  const [subtotals, setSubtotals] = useState([]);

  const { setCartItemCount } = useOutletContext();

  const handleApplyPromo = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await applyPromoCode(promoCode, userId);

      const { discount: promoDiscount, message } = response;

      setDiscount(promoDiscount);
      setTotalPrice(totalPrice - promoDiscount * totalPrice / 100);
      setAppliedPromo(true);
      setMessage(message);
      setPromocodeSuccess(true);
    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data.message || "Failed to apply promo code."
      );
      setAppliedPromo(false);
      setPromocodeSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const fetchedCart = await getUserCart(userId);
        setCart(fetchedCart);
        calculateTotalPrice(fetchedCart.products);
        setProductsPrices(
          fetchedCart.products.map((item) => item.product.price)
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDefaultAddress = async () => {
      try {
        const addresses = await fetchUserAddresses(userId);
        const address = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(
          address
            ? `${address.addressLine1}, ${address.city}, ${address.state || ""
            } ${address.postalCode}, ${address.country}`
            : "No default address set. Please update your profile."
        );
      } catch (error) {
        console.error("Error fetching default address:", error);
      }
    };

    fetchCart();
    fetchDefaultAddress();
  }, [userId]);

  useEffect(() => {
    const getDisplayTotalPrice = async (totalPrice) => {
      const displayTotalPrice = await convertPrice(totalPrice);
      setDisplayTotalPrice(displayTotalPrice);
    };
    getDisplayTotalPrice(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    const getProductsPrices = async () => {
      const prices = await Promise.all(
        cart.products.map(
          async (item) => await convertProductPrice(item.product.price)
        )
      );
      setProductsPrices(prices);
    };

    const getSubtotals = async () => {
      const subtotals = await Promise.all(
        cart.products.map(
          async (item) =>
            await convertProductPrice(item.product.price * item.quantity)
        )
      );
      setSubtotals(subtotals);
    };
    getProductsPrices();
    getSubtotals();
  }, [cart]);

  useEffect(() => {
    if (cart) {
      //get the cart item count
      let cartItemCount = 0;
      cart.products.forEach((item) => {
        cartItemCount += item.quantity;
      });
      setCartItemCount(cartItemCount);
    }
  }, [cart]);

  // Calculate the total price of the cart
  const calculateTotalPrice = (products) => {
    const total = products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const convertProductPrice = async (price) => {
    try {
      const displayPrice = await convertPrice(price);
      return displayPrice;
    } catch (error) {
      console.error("Error converting price:", error);
    }
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
  const handleCheckout = async () => {
    if (!cart || cart.products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setCheckoutLoading(true);

    try {
      if (paymentMethod === "Wallet") {
        // Deduct the total price from the wallet if payment method is Wallet
        await payWallet(userId, totalPrice);
      }

      // Add products to the purchasing system
      for (const item of cart.products) {
        for (var i = 0; i < item.quantity; i++) {
          await addProductPurchasing({
            productId: item.product._id,
            userId,
            date: new Date(),
            status: "Preparing",
            paymentMethod, // Include the payment method
            quantity: 1,
          });
        }
        await removeProductFromCart(userId, item.product._id);
      }

      // Clear the cart (optional, depends on your backend)
      setCart({ products: [] });
      setTotalPrice(0);

      alert("Checkout successful!");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
      setCheckoutModalOpen(false); // Close the modal
    }
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
      <Box>
        {cart.products.map((item, index) => (
          <Card key={item.product._id} sx={{ marginBottom: "16px" }}>
            <CardContent>
              <Typography variant="h6">{item.product.name}</Typography>
              <Typography variant="body1">
                Price: {productsPrices[index]}
              </Typography>
              <Typography variant="body1">Quantity: {item.quantity}</Typography>
              <Typography variant="body2">
                Subtotal: {subtotals[index]}
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
        ))}
      </Box>

      {/* Promo Code Input */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Promo Code"
          variant="outlined"
          size="small"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          fullWidth
          disabled={appliedPromo}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyPromo}
          disabled={loading || appliedPromo}
        >
          Apply
        </Button>
      </Box>

      {message && promocodeSuccess && (
        <Alert severity="success">{message}</Alert>
      )}
      {message && !promocodeSuccess && (
        <Alert severity="error">{message}</Alert>
      )}

      <Box sx={{ width: "100%", marginBottom: 2, textAlign: "left" }}>
        {discount > 0 && (
          <Typography variant="h6">
            Discount: {discount}%
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Typography variant="h5">Total: {displayTotalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setCheckoutModalOpen(true)}
          disabled={checkoutLoading}
        >
          Checkout
        </Button>
      </Box>

      {/* Checkout Modal */}
      <Dialog
        open={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      >
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Default Address:
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {defaultAddress}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Payment Method:
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="Wallet"
              control={<Radio />}
              label="Wallet"
            />
            <FormControlLabel
              value="Cash"
              control={<Radio />}
              label="Pay Cash on Delivery"
            />
            <FormControlLabel value="Card" control={<Radio />} label="Card" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Processing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TouristCartPage;
