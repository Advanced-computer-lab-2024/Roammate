import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useNavigate } from "react-router";
import { deleteMonument } from "../../services/api";

const MuseumCard = ({ museum }) => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Helper function to render opening hours
  const renderOpeningHours = (openingHours) =>
    openingHours.map(({ day, open, close }) => (
      <Typography key={day} variant="body2" color="text.secondary">
        {`${day}: ${open} - ${close}`}
      </Typography>
    ));

  // Helper function to render ticket prices
  const renderTicketPrices = (ticketPrices) =>
    ticketPrices.map((ticketPrice, index) => (
      <Typography key={index} variant="body2" color="text.secondary">
        {`${ticketPrice.for}:`}{" "}
        <strong>{`${ticketPrice.price} EGP`}</strong>
      </Typography>
    ));

  // Handle dialog open
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle delete action
  const handleDelete = async () => {
    try {
      const response = await deleteMonument(museum._id);
      if (response.status === 204) {
        alert("Monument deleted successfully");
        navigate("/tourismGovernor/musuems");
      } else {
        throw new Error("Failed to delete monument: " + response.response.data);
      }
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 650, mb: 4 }}>
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
              {museum.name}
            </Typography>
            <IconButton
              size="small"
              color="primary"
              sx={{ mt: "-5px", ml: "10px" }}
              onClick={() =>
                navigate(`/tourismGovernor/musuems?id=${museum._id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Box>

          {/* Description */}
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
            {museum.description}
          </Typography>

          {/* Opening Hours */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <Button
              startIcon={<WatchLaterIcon sx={{ fill: "darkgreen" }} />}
              variant="text"
              disabled
            >
              Opening Hours
            </Button>
            {renderOpeningHours(museum.openingHours)}
          </Box>

          {/* Ticket Prices */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "start",
              width: "100%",
              mt: "10px",
            }}
          >
            <Box>{renderTicketPrices(museum.ticketPrices)}</Box>
          </Box>
        </CardContent>

        {/* Actions */}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            mb: "10px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleOpenDialog}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() =>
              navigate(`/tourismGovernor/musuems?id=${museum._id}`)
            }
          >
            View
          </Button>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this museum? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuseumCard;
