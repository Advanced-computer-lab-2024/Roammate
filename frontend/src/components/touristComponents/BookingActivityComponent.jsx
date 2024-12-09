import React, { useEffect, useState } from "react";
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
import { applyPromoCode, convertPrice } from "../../services/api";

// Replace with your actual Stripe public key
const stripePromise = loadStripe("your-public-stripe-key");

const BookingActivityComponent = ({
  onBack,
  address,
  price,
  setDiscountedPrice,
  handleBooking,
}) => {
  const userId = localStorage.getItem("userId");
  const [discount, setDiscount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(price);
  const [displayPrice, setDisplayPrice] = useState('');
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [promocodeSuccess, setPromocodeSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDisplayPrice = async () => {
      if (priceAfterDiscount) {
        try {
          const displayPrice = await convertPrice(priceAfterDiscount);
          setDisplayPrice(displayPrice);
        } catch (error) {
          console.error("Error converting price:", error);
        }
      }
    };
    getDisplayPrice();
  }, [priceAfterDiscount]);

  const handleApplyPromo = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await applyPromoCode(promoCode, userId);

      const { discount: promoDiscount, message } = response;

      setDiscount(promoDiscount);
      const discountedPrice = price - (promoDiscount * price) / 100;
      setPriceAfterDiscount(discountedPrice);
      setDiscountedPrice(discountedPrice);
      setAppliedPromo(true);
      setMessage(message);
      setPromocodeSuccess(true);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data.message || "Failed to apply promo code.");
      setAppliedPromo(false);
      setPromocodeSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!localStorage.getItem("userId")) {
      setMessage("Please login to continue booking.");
      navigate("/login");
      return;
    }
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
      throw error;
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
      setMessage(`Wallet payment failed. ${error.response?.data?.error}`);
      console.log(error);
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
          <strong>Price:</strong>{" "}
          {displayPrice}
          {appliedPromo && (
            <Typography component="span" color="green" sx={{ ml: 1 }}>
              ({`Discount Applied - ${discount}%`})
            </Typography>
          )}
        </Typography>

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
            color:
              message.includes("successful") || promocodeSuccess
                ? "green"
                : "red",
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
