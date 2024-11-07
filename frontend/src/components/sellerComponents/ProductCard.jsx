import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardMedia, IconButton, Rating } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StarIcon from "@mui/icons-material/Star";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ProductImage from "../productComponents/ProductImage";
import { useNavigate } from "react-router";
import { toggleArchivedStatus } from "../../services/api";

const ProductCard = ({ product }) => {
  const [archived, setArchived] = useState(product.archived);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [rating, setRating] = useState(product.averageRating);
  const navigate = useNavigate();

  // Handler to toggle the archived status
  const handleToggleArchived = async () => {
    try {
      const updatedArchivedStatus = await toggleArchivedStatus(product._id);
      setArchived(updatedArchivedStatus); // Update the local archived state
    } catch (error) {
      console.error("Error toggling archived status:", error);
    }
  };

  return (
    <Card sx={{ width: "90%", mb: 4 }}>
      <ProductImage imageId={product.image} height={"195"} />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          <IconButton
            size="small"
            color="primary"
            sx={{
              mt: "-5px",
              ml: "10px",
            }}
            onClick={() => {
              navigate(`/seller/my-products?id=${product._id}`);
            }}
          >
            <EditIcon />
          </IconButton>
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
            ${product.price}
          </Typography>
        </Box>

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            ml: "10px",
            textAlign: "left",
            width: "100%",
            color: "text.secondary",
          }}
        >
          purchased by _ people
        </Typography>
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
          sx={{ color: "white", backgroundColor: "red" }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          onClick={handleToggleArchived}
          endIcon={
            <InventoryIcon
              fontSize="medium"
              sx={{
                fill: `${archived ? "orange" : "white"}`,
              }}
            />
          }
          sx={{
            backgroundColor: archived ? "gray" : "grey",
            color: "white",
          }}
        >
          {archived ? "Unarchive" : "Archive"}
        </Button>

        <Button
          variant="contained"
          sx={{ color: "white" }}
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => {
            navigate(`/seller/my-products?id=${product._id}`);
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
