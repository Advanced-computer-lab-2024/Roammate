import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  TextField,
  Stack,
  LinearProgress,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe public key
const stripePromise = loadStripe("your-public-stripe-key");

const BookingActivityComponent = ({
  onBack,
  address,
  price,
  handleBooking,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          { price: "price_id_from_stripe_dashboard", quantity: 1 }, // Replace with your Stripe price ID
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });
      if (error) {
        setMessage("Stripe payment failed. Please try again.");
        console.error("Stripe payment error:", error);
      } else {
        setMessage("Payment successful!");
      }
    } catch (error) {
      setMessage("An error occurred during payment. Please try again.");
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletPayment = async () => {
    setLoading(true);
    setMessage("");
    try {
      await handleBooking(); // Calls the booking function passed from parent
      setMessage("Booking successful!");
    } catch (error) {
      setMessage(`Wallet payment failed. ${error.response.data.error}`);
      console.error("Wallet payment error:", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        padding: 3,
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        marginTop: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Confirm Booking
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Please confirm your default address and proceed to payment.
      </Typography>
      <Stack spacing={2} sx={{ textAlign: "left", marginBottom: 3 }}>
        <Typography variant="body2">
          <strong>Default Address:</strong>
        </Typography>
        <TextField
          value={address}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <Typography variant="body2">
          <strong>Price:</strong> ${price}
        </Typography>
      </Stack>

      {loading && (
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <LinearProgress />
        </Box>
      )}

      {message && (
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleWalletPayment}
          disabled={loading}
        >
          Pay with Wallet
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={loading}
        >
          Pay with Stripe
        </Button>
      </Box>
    </Card>
  );
};

export default BookingActivityComponent;
