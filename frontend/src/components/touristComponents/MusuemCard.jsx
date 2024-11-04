import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Alert, IconButton, Rating, Snackbar } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router";

const MuseumCard = ({ museum }) => {
  const [rating] = useState(museum.averageRating || 4.5); // Use a default rating if none provided
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);


  const copyLinkToClipboard = async () => {
    const link = `${window.location.origin}/tourist/monuments?id=` + museum._id;
    await navigator.clipboard.writeText(link);
    handleClick();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
            onClick={copyLinkToClipboard}
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
          {museum.description}
        </Typography>

        {/* Location */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            width: "100%",
          }}
        >
          <LocationOnIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            {`${museum.location.lat}, ${museum.location.lng}`}
          </Typography>
        </Box>

        {/* Admission Price */}
        <Typography
          variant="h6"
          sx={{ mt: "10px", textAlign: "left", width: "100%" }}
        >
          Admission: ${museum.ticketPrices[0]?.price || "N/A"}
        </Typography>
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
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => navigate(`/tourist/monuments?id=${museum._id}`)}
          sx={{ color: "white" }}
        >
          View
        </Button>
      </CardActions>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          sx={{
            width: '100%',
            backgroundColor: '#FFBF00',
          }}
        >
          Monument Link Copied to Clipboard
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default MuseumCard;
