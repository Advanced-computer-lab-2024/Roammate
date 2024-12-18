import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ProductImage from "../productComponents/ProductImage";
import ShareLink from "./ShareLink";
import { deleteProductPurchasing, refundWallet } from "../../services/api"; // Import the required APIs

const DATE_FORMAT = "YYYY/MM/DD";

const PurchasedProductCard = ({ purchase, onPurchaseDeleted }) => {
  const purchasedProduct = purchase.product;
  const purchaseDate = purchase.date;
  const status = purchase.status;
  const paymentMethod = purchase.paymentMethod; // Assuming this field exists in the purchase object
  const [name] = useState(purchasedProduct.name);
  const [description] = useState(purchasedProduct.description);
  const [date] = useState(dayjs(purchaseDate).format(DATE_FORMAT));
  const [rating] = useState(purchasedProduct.averageRating);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleCancelPurchase = async () => {
    try {
      // Check if the payment was made via wallet
      if (paymentMethod === "Wallet") {
        // Refund the product's price back to the user's wallet
        await refundWallet(purchase.user._id, purchasedProduct.price);
      }

      // Delete the product purchasing record
      await deleteProductPurchasing(purchase._id);

      onPurchaseDeleted();
    } catch (error) {
      console.error("Error canceling purchase:", error);
    }
  };

  return (
    <Card
      sx={{
        width: "850px",
        mb: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "280px",
          height: "165px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: "20px",
          ml: "10px",
        }}
      >
        <ProductImage imageId={purchasedProduct.image} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "space-between",
              width: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "left",
              }}
            >
              {name}
            </Typography>
            <Rating
              name="read-only"
              value={rating}
              readOnly
              precision={0.5}
              icon={<StarIcon style={{ fill: "orange" }} />}
              emptyIcon={<StarIcon style={{ fill: "lightgray" }} />}
            />
            <ShareLink type={"product"} id={purchasedProduct._id} />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "left",
              mb: "10px",
              width: "100%",
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              gutterBottom
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "left",
                fontSize: "16px",
                color: "text.secondary",
                fontWeight: "bold",
              }}
            >
              {`purchased on ${dayjs(date).format(DATE_FORMAT)}`}

              <IconButton
                size="small"
                disabled
                color="primary"
                sx={{
                  ml: "10px",
                }}
              >
                {status === "Completed" ? (
                  <CheckCircleOutlineIcon sx={{ fill: "green" }} />
                ) : status === "Cancelled" ? (
                  <CancelIcon sx={{ fill: "red" }} />
                ) : status === "Preparing" ? (
                  <HourglassTopIcon sx={{ fill: "orange" }} />
                ) : (
                  <LocalShippingIcon sx={{ fill: "blue" }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: `${
                      status === "Completed"
                        ? "green"
                        : status === "Cancelled"
                        ? "red"
                        : status === "Preparing"
                        ? "orange"
                        : "blue"
                    }`,
                    ml: "5px",
                  }}
                >
                  {status}
                </Typography>
              </IconButton>
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            mb: "10px",
            mt: "-20px",
            width: "100%",
          }}
        >
          {status === "Preparing" && (
            <Button
              variant="contained"
              onClick={handleCancelPurchase}
              endIcon={<CancelIcon sx={{ fill: "white" }} />}
              sx={{ backgroundColor: "red" }}
            >
              Cancel
            </Button>
          )}
          {status === "Shipped" && (
            <Button
              color="primary"
              onClick={() => navigate(`/tourist/purchases?id=${purchase._id}`)}
            >
              View Details
              <ArrowForwardIosIcon />
            </Button>
          )}
          {status === "Completed" && (
            <Button
              variant="contained"
              onClick={() => navigate(`/tourist/purchases?id=${purchase._id}`)}
              endIcon={<ArrowForwardIosIcon />}
            >
              Review
            </Button>
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

export default PurchasedProductCard;
