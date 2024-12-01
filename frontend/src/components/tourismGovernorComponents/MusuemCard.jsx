import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Rating } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router";
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const DATE_FORMAT = "YYYY/MM/DD";

const MuseumCard = ({ museum }) => {
  // const [archived, setArchived] = useState(false);
  // const [rating, setRating] = useState(4.5); // Set a default rating or pull from data if available
  const navigate = useNavigate();
  const getOpeningHours = (openingHours) => {
    return openingHours.map(({ day, open, close }) => (
      <Typography key={day} variant="body2" color="text.secondary">
        {`${day}: ${open} - ${close}`}
      </Typography>
    ));
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
            {museum.name}
          </Typography>
          {/* <Rating
            name="read-only"
            value={rating}
            readOnly
            precision={0.5}
            icon={<StarIcon style={{ fill: "orange" }} />}
            emptyIcon={<StarIcon style={{ fill: "lightgray" }} />}
          /> */}
          <IconButton
            size="small"
            color="primary"
            sx={{ mt: "-5px", ml: "10px" }}
            onClick={
              () => navigate(`/tourismGovernor/musuems?id=${museum._id}`)
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
          <Button startIcon={<WatchLaterIcon sx={{
            fill: 'darkgreen'
          }} />} variant="none" disabled>Opening Hours</Button>
          {getOpeningHours(museum.openingHours)}
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

          <Box>
            {museum.ticketPrices.map((ticketPrice, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                {`${ticketPrice.for}:`} <strong>{`${ticketPrice.price} EGP`}</strong>

              </Typography>
            ))}
          </Box>
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
        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>

        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => navigate(`/tourismGovernor/musuems?id=${museum._id}`)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default MuseumCard;
