import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Rating,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CircularProgress,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import {
  convertPrice,
  getProductById,
  addProductToCart,
} from "../../services/api";
import ProductImage from "../../components/productComponents/ProductImage";

const TouristViewProduct = ({ id }) => {
  const touristId = localStorage.getItem("userId");
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [displayPrice, setDisplayPrice] = useState();
  const [cartQuantity, setCartQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const getDisplayPrice = async () => {
      if (product?.price) {
        try {
          const displayPrice = await convertPrice(product.price);
          setDisplayPrice(displayPrice);
        } catch (error) {
          console.error("Error converting price:", error);
        }
      }
    };
    getDisplayPrice();
  }, [product]);

  const handleAddToCart = async () => {
    try {
      await addProductToCart(touristId, product._id, cartQuantity);
      //   setCartItemCount((prev) => prev + 1);
      setOpen(true); // Show success message
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      <CircularProgress size="4rem" />
    </Box>
  ) : product ? (
    <Box sx={{ padding: 3 }}>
      <Card elevation={3} sx={{ padding: 2, marginBottom: 3, width: "650px" }}>
        <Box sx={{ mb: "20px" }}>
          <ProductImage imageId={product.image} />
        </Box>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: `${
                product.seller.role === "admin" ? "green" : "purple"
              }`,
              width: "25px",
              height: "25px",
              fontSize: "14px",
            }}
          >
            {product.seller.role === "admin" ? (
              <CheckIcon />
            ) : (
              product.seller.username.charAt(0)
            )}
          </Avatar>
          <Typography
            sx={{
              marginLeft: 1,
              color: "text.secondary",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {product.seller.role === "admin"
              ? "by Roammate"
              : product.seller.username}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
            width: "100%",
          }}
        >
          <Rating
            value={product.averageRating}
            readOnly
            precision={0.5}
            icon={<StarIcon style={{ fill: "orange" }} fontSize="large" />}
            emptyIcon={
              <StarIcon style={{ fill: "lightgray" }} fontSize="large" />
            }
          />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            ({product.reviews.length})
          </Typography>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          {product.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Purchase and Cart Section */}
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <IconButton
            size="small"
            disabled
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {product.quantity > 0 ? (
              <ShoppingCartIcon sx={{ fill: "green" }} />
            ) : (
              <RemoveShoppingCartIcon sx={{ fill: "red" }} />
            )}
            <Typography
              fontSize={14}
              sx={{
                marginLeft: "5px",
                color: `${product.quantity > 0 ? "green" : "red"}`,
              }}
            >
              {product.quantity > 0 ? "in stock" : "out of stock"}
            </Typography>
          </IconButton>

          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{
              color: `${product.quantity > 0 ? "black" : "grey"}`,
            }}
          >
            {displayPrice}
          </Typography>

          {product.quantity > 0 && (
            <TextField
              type="number"
              size="small"
              value={cartQuantity}
              onChange={(e) =>
                setCartQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              sx={{ width: "60px", mb: 1 }}
              disabled={product.quantity <= 0}
            />
          )}
          {product.quantity > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  ) : (
    <Typography variant="h4" color="textSecondary">
      Product not found
    </Typography>
  );
};

export default TouristViewProduct;
