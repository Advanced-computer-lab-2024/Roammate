import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Alert, CardMedia, IconButton, Rating, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StarIcon from "@mui/icons-material/Star";
import HeartIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { useNavigate } from "react-router";
import ProductImage from "../productComponents/ProductImage";
import { convertPrice } from "../../services/api";
import ShareLink from "./ShareLink";

const ProductCard = ({ product }) => {
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [rating, setRating] = useState(product.averageRating);
  const navigate = useNavigate();
  const [displayPrice, setDisplayPrice] = useState();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getDisplayPrice = async (price) => {
      try {
        const displayPrice = await convertPrice(price);
        setDisplayPrice(displayPrice);
      } catch (error) {
        console.error("Error converting price:", error);
      }
    };
    getDisplayPrice(price);
  }, [localStorage.getItem("currency")]);


  return (
    <Card sx={{ width: '550px', mb: 4 }}>

      <ProductImage imageId={product.image} height={"250"} />

      {/* <h1>Itinerary Card</h1> */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
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
          <ShareLink type={'product'} id={product._id} />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
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
            {quantity > 0 ? (
              <ShoppingCartIcon sx={{ fill: "green" }} />
            ) : (
              <RemoveShoppingCartIcon sx={{ fill: "red" }} />
            )}
            <Typography
              fontSize={14}
              sx={{
                marginLeft: "5px",
                color: `${quantity > 0 ? "green" : "red"}`,
              }}
            >
              {quantity > 0 ? "in stock" : "out of stock"}
            </Typography>
          </IconButton>

          <Typography gutterBottom variant="h4" component="div" sx={{
            color: `${product.quantity > 0 ? 'black' : 'grey'}`,
          }}>
            {displayPrice}
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
        <Button
          variant="contained"
          onClick={
            addedToWatchlist
              ? () => setAddedToWatchlist(false)
              : () => setAddedToWatchlist(true)
          }
          endIcon={
            <HeartIcon
              sx={{
                fill: `${addedToWatchlist ? "red" : "white"}`,
              }}
            />
          }
        >
          Add to Watchlist
        </Button>

        <Button variant="contained" sx={{
          backgroundColor: `${quantity > 0 ? 'green' : 'grey'}`,
          color: 'white',
        }}
          onClick={() => navigate(`/tourist/products?id=${product._id}`)}
          endIcon={<ArrowForwardIosIcon />}>
          {quantity > 0 ? 'Buy' : 'View'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
