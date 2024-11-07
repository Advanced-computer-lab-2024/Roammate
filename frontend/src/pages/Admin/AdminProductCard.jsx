import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Rating } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { toggleArchivedStatus } from "../../services/api";

const AdminProductCard = ({ product }) => {
  const [archived, setArchived] = useState(product.archived);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [rating, setRating] = useState(product.averageRating);

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
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Header */}
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
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
          <IconButton
            size="small"
            color="primary"
            sx={{
              mt: "-5px",
              ml: "10px",
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        {/* Product Description */}
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

        {/* Stock and Price Info */}
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

          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{
              textDecoration: `${
                product.quantity > 0 ? "none" : "line-through"
              }`,
              color: `${product.quantity > 0 ? "black" : "grey"}`,
            }}
          >
            ${price}
          </Typography>
        </Box>

        {/* Seller Information */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "left",
            width: "100%",
            mt: 1,
          }}
        >
          Seller: {product.seller.username} | Id: {product.seller._id}
        </Typography>

        {/* Purchases Info */}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            textAlign: "left",
            width: "100%",
            color: "text.secondary",
          }}
        >
          purchased by _ people
        </Typography>
      </CardContent>

      {/* Actions */}
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
      </CardActions>
    </Card>
  );
};

export default AdminProductCard;
