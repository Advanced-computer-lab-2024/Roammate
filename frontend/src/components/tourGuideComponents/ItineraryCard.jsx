import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Share as ShareIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  EventAvailable as EventAvailableIcon,
  Star as StarIcon,
  Edit as EditIcon,
  Block as BlockIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { deleteItinerary, getItineraryBookingsCount } from "../../services/api";

const DATE_FORMAT = "YYYY/MM/DD";

const ItineraryCard = ({ itinerary }) => {
  const [archived, setArchived] = useState(false);
  const [title, setTitle] = useState(itinerary.title);
  const [duration, setDuration] = useState(itinerary.duration);
  const [price, setPrice] = useState(itinerary.price);
  const [startDate, setStartDate] = useState(itinerary.startDate);
  const [endDate, setEndDate] = useState(itinerary.endDate);
  const [isBookingAvailable, setIsBookingAvailable] = useState(
    itinerary.isBookingAvailable
  );
  const [rating, setRating] = useState(itinerary.averageRating);
  const [enrollments, setEnrollments] = useState(0);
  const [appropriate, setAppropriate] = useState(itinerary.Appropriate);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const getItineraryEnrollment = async () => {
    try {
      const response = await getItineraryBookingsCount(itinerary._id);
      setEnrollments(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getItineraryEnrollment();
  }, [itinerary]);

  const handleDelete = async () => {
    try {
      const response = await deleteItinerary(itinerary._id);
      if (response.status === 204) {
        alert("Itinerary deleted successfully");
        navigate("/tourguide/my-itineraries");
      } else {
        throw new Error("Failed to delete itinerary: " + response.response.data);
      }
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <Card sx={{ width: "650px", mb: 4 }}>
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
            {title}
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
            sx={{ mt: "-5px", ml: "10px" }}
            onClick={() => navigate(`/tourguide/my-itineraries?id=${itinerary._id}`)}
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
          {duration} itinerary
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
            }}
          >
            {dayjs(startDate)
              .startOf("day")
              .isBefore(dayjs(endDate).startOf("day"))
              ? `${dayjs(startDate).format(DATE_FORMAT)} - ${dayjs(
                endDate
              ).format(DATE_FORMAT)}`
              : `${dayjs(startDate).format(DATE_FORMAT)}`}

            <IconButton size="small" disabled color="primary" sx={{ ml: "10px" }}>
              {isBookingAvailable ? (
                <EventAvailableIcon sx={{ fill: "green" }} />
              ) : (
                <BlockIcon sx={{ fill: "red" }} />
              )}
              <Typography
                fontSize={14}
                color={isBookingAvailable ? "green" : "red"}
              >
                {isBookingAvailable ? "Booking Enabled" : "Booking Disabled"}
              </Typography>
            </IconButton>
          </Typography>

          <Typography gutterBottom variant="h4" component="div">
            {price} EGP
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
          {enrollments} currently enrolled
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
          onClick={() => setOpenDialog(true)}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          sx={{ color: "white" }}
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => navigate(`/tourguide/my-itineraries?id=${itinerary._id}`)}
        >
          View
        </Button>
      </CardActions>
      <Box sx={{ width: "100%", mb: "10px", px: "10px" }}>
        {!appropriate && (
          <Alert severity="error">
            This itinerary has been flagged inappropriate by admin
          </Alert>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this itinerary? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ItineraryCard;
