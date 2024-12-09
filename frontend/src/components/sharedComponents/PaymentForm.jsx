import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import StripeLogo from "../../assets/images/StripeLogo.png"; // Correctly imported logo

const PaymentForm = ({ activity, onBack, handleBooking }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation hook

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Simulate a successful booking action
      await handleBooking();
      setMessage("Payment successful! Your activity is booked.");

      // Navigate back to activities page after a delay
      setTimeout(() => {
        // navigate("/tourist"); // Adjust the path to match your activities page route
      }, 2000); // Delay for user feedback
    } catch (error) {
      setMessage(`Payment failed. ${error.response.data.error}`);
      console.error(
        "Error during payment simulation:",
        error.response.data.error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Stripe Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <img
          src={StripeLogo} // Using the imported Stripe logo
          alt="Stripe Logo"
          style={{ maxWidth: "150px", height: "auto" }}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Complete your payment
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, color: "gray" }}>
        Enter your payment details<strong></strong>.
      </Typography>

      {/* Simulated Payment Input */}
      <Stack spacing={2}>
        <TextField
          label="Cardholder Name"
          fullWidth
          placeholder="Enter your name"
        />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </Stack>

      {message && (
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: message.includes("successful") ? "green" : "red",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {message.includes("successful") ? (
            <CheckCircleOutlineIcon />
          ) : (
            <ErrorOutlineIcon />
          )}
          {message}
        </Typography>
      )}

      {loading && <CircularProgress sx={{ marginTop: 3 }} />}

      <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={loading}
          fullWidth
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={loading}
          fullWidth
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;
