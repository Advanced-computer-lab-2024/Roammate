import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
const DATE_FORMAT = "YYYY/MM/DD";
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
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: "90%", mb: 4 }}>
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
            sx={{
              mt: "-5px",
              ml: "10px",
            }}
            onClick={() => {
              navigate(`/tourguide/my-itineraries?id=${itinerary._id}`);
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

            <IconButton
              size="small"
              disabled
              color="primary"
              sx={{
                ml: "10px",
              }}
            >
              {isBookingAvailable ? (
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
              <Typography fontSize={14} color="green">
                ${isBookingAvailable ? "booking available" : "booking closed"}
              </Typography>
            </IconButton>
          </Typography>

          <Typography gutterBottom variant="h4" component="div">
            ${price}
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
          _ people enrolled
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
          sx={{
            color: "white",
            backgroundColor: "red",
          }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          sx={{
            color: "white",
          }}
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => {
            navigate(`/tourguide/my-itineraries?id=${itinerary._id}`);
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItineraryCard;
