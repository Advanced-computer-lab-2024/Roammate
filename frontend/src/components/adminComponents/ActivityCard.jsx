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
import BlockIcon from "@mui/icons-material/Block";
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router";
import { flagActivity } from "../../services/api"; // Replace this with the actual API function to toggle appropriate status

const DATE_FORMAT = "YYYY/MM/DD";

const AdminActivityCard = ({ activity, onStatusChange }) => {
  const [isAppropriate, setIsAppropriate] = useState(
    activity.Appropriate || false
  );
  const navigate = useNavigate();

  const handleToggleAppropriate = async () => {
    try {
      const updatedActivity = await flagActivity(activity._id); // Call API to toggle the appropriate status
      setIsAppropriate((prev) => !prev); // Update local state immediately

      // Notify parent component about the change in status
      if (onStatusChange) {
        onStatusChange({ ...activity, Appropriate: !activity.Appropriate });
      }
    } catch (error) {
      console.error("Failed to toggle activity appropriate status:", error);
    }
  };

  return (
    <Card sx={{ width: 650, mb: 4 }}>
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
            {activity.title}
          </Typography>
          <Rating
            name="read-only"
            value={activity.averageRating}
            readOnly
            precision={0.5}
            icon={<StarIcon style={{ fill: "orange" }} />}
            emptyIcon={<StarIcon style={{ fill: "lightgray" }} />}
          />
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
          {activity.description}
        </Typography>

        {/* Advertiser Info */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "left",
            mb: "10px",
            width: "100%",
          }}
        >
          <strong>Advertiser:</strong> {activity.advertiser.username} ({" " + activity.advertiser.email})
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
            {dayjs(activity.startDate)
              .startOf("day")
              .isBefore(dayjs(activity.endDate).startOf("day"))
              ? `${dayjs(activity.startDate).format(DATE_FORMAT)} - ${dayjs(
                activity.endDate
              ).format(DATE_FORMAT)}`
              : `${dayjs(activity.startDate).format(DATE_FORMAT)}`}
            <IconButton
              size="small"
              disabled
              color="primary"
              sx={{
                ml: "10px",
              }}
            >
              {activity.isBookingAvailable ? (
                <EventAvailableIcon sx={{ fill: "green" }} />
              ) : (
                <BlockIcon sx={{ fill: "red" }} />
              )}
              <Typography
                fontSize={14}
                sx={{
                  color: `${activity.isBookingAvailable ? "green" : "red"}`,
                }}
              >
                {activity.isBookingAvailable
                  ? "booking available"
                  : "booking closed"}
              </Typography>
            </IconButton>
          </Typography>

          <Typography gutterBottom variant="h4" component="div">
            ${activity.price}
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
        {/* View Activity Button */}
        <Button
          variant="contained"
          onClick={() => navigate(`/admin/activities?id=${activity._id}`)}
          endIcon={<ArrowForwardIosIcon />}
        >
          View Activity
        </Button>

        {/* Toggle Appropriate Status Button */}
        <Button
          value="appropriate"
          selected={isAppropriate}
          onClick={handleToggleAppropriate}
          sx={{
            ml: 1,
            backgroundColor: isAppropriate ? "red" : "grey",
            color: "white",
            "&:hover": {
              backgroundColor: isAppropriate ? "darkred" : "darkgrey"
            },
          }}
        >
          <FlagIcon sx={{ mr: 1 }} />
          {isAppropriate ? "Flag" : "Unflag"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminActivityCard;
