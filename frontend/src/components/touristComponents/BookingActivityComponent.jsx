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
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../sharedComponents/PaymentForm";
import { useNavigate } from "react-router";

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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();

  const handleWalletPayment = async () => {
    setLoading(true);
    setMessage("");
    try {
      await handleBooking(); // Calls the booking function passed from parent
      setMessage("Booking successful!");
    } catch (error) {
      setMessage(`Wallet payment failed. ${error.response?.data?.error}`);
      console.error("Wallet payment error:", error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  if (showPaymentForm) {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm
          activity={{ title: "Booking Activity" }} // Pass real activity details if available
          onBack={() => setShowPaymentForm(false)}
          handleBooking={handleBooking}
        />
      </Elements>
    );
  }

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
          <strong>Price:</strong> {price}
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
          onClick={() => setShowPaymentForm(true)}
          disabled={loading}
        >
          Pay with Card
        </Button>
      </Box>
    </Card>
  );
};

export default BookingActivityComponent;
