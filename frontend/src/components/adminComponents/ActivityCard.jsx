import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Rating } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StarIcon from "@mui/icons-material/Star";
import HeartIcon from "@mui/icons-material/Favorite";
import BlockIcon from "@mui/icons-material/Block";
import ToggleButton from "@mui/material/ToggleButton";
import { useNavigate } from "react-router";
import { updateActivityStatus } from "../../services/api"; // Import the API call function

const DATE_FORMAT = "YYYY/MM/DD";

const AdminActivityCard = ({ activity }) => {
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [isActive, setIsActive] = useState(activity.isActive || true);
  const navigate = useNavigate();

  const handleToggleActive = async () => {
    try {
      await updateActivityStatus(activity._id, { isActive: !isActive });
      setIsActive(!isActive);
    } catch (error) {
      console.error("Failed to update activity status:", error);
    }
  };

  return (
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
                <EventAvailableIcon
                  sx={{
                    fill: "green",
                  }}
                />
              ) : (
                <BlockIcon
                  sx={{
                    fill: "red",
                  }}
                />
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

        <Button
          variant="contained"
          sx={{
            backgroundColor: "green",
            color: "white",
          }}
          onClick={() => navigate(`/tourist/activities?id=${activity._id}`)}
          endIcon={<ArrowForwardIosIcon />}
        >
          Book
        </Button>

        {/* Toggle Active Status Button */}
        <ToggleButton
          value="active"
          selected={isActive}
          onChange={handleToggleActive}
          sx={{ ml: 1 }}
        >
          {isActive ? "Deactivate" : "Activate"}
        </ToggleButton>
      </CardActions>
    </Card>
  );
};

export default AdminActivityCard;
