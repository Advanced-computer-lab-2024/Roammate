import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Rating, ToggleButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StarIcon from "@mui/icons-material/Star";
import HeartIcon from "@mui/icons-material/Favorite";
import BlockIcon from "@mui/icons-material/Block";
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router";
import { updateItineraryStatus, flagItinerary } from "../../services/api";

const DATE_FORMAT = "YYYY/MM/DD";

const AdminItineraryCard = ({ itinerary }) => {
  const [isActive, setIsActive] = useState(itinerary.isActive || true);
  const [isFlagged, setIsFlagged] = useState(itinerary.isFlagged || false);
  const navigate = useNavigate();

  const handleToggleActive = async () => {
    try {
      await updateItineraryStatus(itinerary._id, { isActive: !isActive });
      setIsActive(!isActive);
    } catch (error) {
      console.error("Failed to update itinerary status:", error);
    }
  };

  const handleToggleFlag = async () => {
    try {
      await flagItinerary(itinerary._id, { isFlagged: !isFlagged });
      setIsFlagged(!isFlagged);
    } catch (error) {
      console.error("Failed to flag itinerary:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: "90%", mb: 4 }}>
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
            {itinerary.title}
          </Typography>
          <Rating
            name="read-only"
            value={itinerary.averageRating}
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
          >
            <ShareIcon />
          </IconButton>
        </Box>

        {/* Tour Guide Info */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "left",
            mb: "10px",
            width: "100%",
          }}
        >
          Tour Guide: {itinerary.tourGuide.username} (ID:{" "}
          {itinerary.tourGuide._id})
        </Typography>

        {/* Duration */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "left",
            mb: "10px",
            width: "100%",
          }}
        >
          {itinerary.duration} itinerary
        </Typography>

        {/* Booking Status and Date */}
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
            {dayjs(itinerary.startDate)
              .startOf("day")
              .isBefore(dayjs(itinerary.endDate).startOf("day"))
              ? `${dayjs(itinerary.startDate).format(DATE_FORMAT)} - ${dayjs(
                  itinerary.endDate
                ).format(DATE_FORMAT)}`
              : `${dayjs(itinerary.startDate).format(DATE_FORMAT)}`}
            <IconButton
              size="small"
              disabled
              color="primary"
              sx={{
                ml: "10px",
              }}
            >
              {itinerary.isBookingAvailable ? (
                <EventAvailableIcon sx={{ fill: "green" }} />
              ) : (
                <BlockIcon sx={{ fill: "red" }} />
              )}
              <Typography
                fontSize={14}
                sx={{
                  color: `${itinerary.isBookingAvailable ? "green" : "red"}`,
                }}
              >
                {itinerary.isBookingAvailable
                  ? "booking available"
                  : "booking closed"}
              </Typography>
            </IconButton>
          </Typography>

          <Typography gutterBottom variant="h4" component="div">
            ${itinerary.price}
          </Typography>
        </Box>
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
        {/* View Itinerary Button */}
        <Button
          variant="contained"
          onClick={() => navigate(`/admin/itineraries?id=${itinerary._id}`)}
          endIcon={<ArrowForwardIosIcon />}
        >
          View
        </Button>

        {/* Toggle Flag Button */}
        <ToggleButton
          value="flagged"
          selected={isFlagged}
          onChange={handleToggleFlag}
          sx={{
            ml: 1,
            backgroundColor: isFlagged ? "red" : "gray",
            color: "white",
            "&:hover": {
              backgroundColor: isFlagged ? "darkred" : "lightgray",
            },
          }}
        >
          <FlagIcon sx={{ mr: 1 }} />
          {isFlagged ? "Inappropriate" : "Appropriate"}
        </ToggleButton>

        {/* Toggle Active Status Button */}
        <ToggleButton
          value="active"
          selected={isActive}
          onChange={handleToggleActive}
          sx={{
            ml: 1,
            backgroundColor: isActive ? "green" : "orange",
            color: "white",
            "&:hover": {
              backgroundColor: isActive ? "darkgreen" : "gray",
            },
          }}
        >
          {isActive ? "Deactivate" : "Activate"}
        </ToggleButton>
      </CardActions>
    </Card>
  );
};

export default AdminItineraryCard;
