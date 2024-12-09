import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Rating,
  Button,
  TextField,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Icon,
  Chip,
  Stack,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from "@mui/material";
import dayjs from "dayjs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BlockIcon from "@mui/icons-material/Block";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import {
  bookItinerary,
  convertPrice,
  getItineraryById,
  fetchUserAddresses,
} from "../../services/api";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingActivityComponent from "../../components/touristComponents/BookingActivityComponent";

const DATE_FORMAT = "DD/MM/YYYY";
const TouristViewItinerary = ({ id, touristId }) => {
  const [itinerary, setItinerary] = useState();
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState(dayjs());
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [displayPrice, setDisplayPrice] = useState();
  const [showBookingComponent, setShowBookingComponent] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState("");

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const addresses = await fetchUserAddresses(touristId);
        var address = addresses.find((address) => address.isDefault);
        if (address) {
          setDefaultAddress(
            `${address.addressLine1}, ${address.city}, ${address.state || ""} ${
              address.postalCode
            }, ${address.country}`
          );
        } else {
          setDefaultAddress("No default address found. Please set one.");
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
        setDefaultAddress("Failed to load address. Please try again.");
      }
    };
    fetchDefaultAddress();
  }, [touristId]);

  useEffect(() => {
    const fetchItinerary = async () => {
      const response = await getItineraryById(id);
      setItinerary(response.data);
      setTimeline(response.data.timeline);
      setBookingDate(dayjs(response.data.startDate));
      setLoading(false);
    };
    try {
      fetchItinerary();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    const getDisplayPrice = async () => {
      if (itinerary?.price) {
        try {
          const displayPrice = await convertPrice(itinerary.price);
          setDisplayPrice(displayPrice);
        } catch (error) {
          console.error("Error converting price:", error);
        }
      }
    };
    getDisplayPrice();
  }, [itinerary]);

  const handleBooking = async (e) => {
    if (e) e.preventDefault();
    setLoadingBooking(true);
    setMsg("");
    try {
      await bookItinerary(
        itinerary._id,
        touristId,
        bookingDate,
        itinerary.price
      );
      setMsg(
        "Your booking is successful for " + bookingDate.format(DATE_FORMAT)
      );
      setDisabled(true);
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        if (error.response.status === 409) {
          setMsg("Booking conflict: " + error.response.data.error);
        } else {
          setMsg("An error occurred: " + error.response.data.error);
        }
      } else {
        setMsg("An unexpected error occurred. Please try again.");
      }
      throw error;
    } finally {
      setLoadingBooking(false);
    }
  };

  if (showBookingComponent) {
    return (
      <BookingActivityComponent
        onBack={() => setShowBookingComponent(false)}
        address={defaultAddress}
        price={displayPrice}
        handleBooking={handleBooking}
      />
    );
  }

  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      <CircularProgress size="4rem" />
    </Box>
  ) : itinerary ? (
    <Box sx={{ padding: 3 }}>
      <Card
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {itinerary.title}
        </Typography>
        {/* Average Rating */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
            marginTop: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "purple",
                width: "25px",
                height: "25px",
                fontSize: "14px",
              }}
            >
              {itinerary.tourGuide.username.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                marginLeft: 1,
                color: "text.secondary",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {itinerary.tourGuide.username}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Rating
              value={itinerary.averageRating}
              readOnly
              precision={0.5}
              icon={<StarIcon style={{ fill: "orange" }} fontSize="large" />}
              emptyIcon={
                <StarIcon style={{ fill: "lightgray" }} fontSize="large" />
              }
            />
            <Typography variant="body1" sx={{ marginLeft: "5px" }}>
              ({itinerary.reviews.length})
            </Typography>
          </Box>

          {/*Language */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <LanguageIcon />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {itinerary.lang}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} mt={2}>
            {itinerary.tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                sx={{
                  backgroundColor: "lightgray",
                }}
                variant="outlined"
              />
            ))}
          </Stack>

          {/* Locations */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
              marginBottom: 2,
            }}
          >
            <LocationOnIcon
              sx={{
                fill: "red",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                marginLeft: 1,
              }}
            >
              <strong>Pickup: &nbsp;</strong>
              {itinerary.pickUpLocation}
            </Typography>

            <LocationOnIcon
              sx={{
                fill: "red",
                marginLeft: 3,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                marginLeft: 1,
              }}
            >
              <strong>Dropoff: &nbsp;</strong>
              {itinerary.dropOffLocation}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Dates */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            width: "100%",
            padding: 2,
          }}
        >
          <Typography variant="body1">
            {" "}
            <strong>Available Date(s): </strong>
            {dayjs(itinerary.startDate)
              .startOf("day")
              .isBefore(dayjs(itinerary.endDate).startOf("day"))
              ? `${dayjs(itinerary.startDate).format(DATE_FORMAT)} - ${dayjs(
                  itinerary.endDate
                ).format(DATE_FORMAT)}`
              : `${dayjs(itinerary.startDate).format(DATE_FORMAT)}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: -10,
            }}
          >
            <WatchLaterIcon
              fontSize="medium"
              sx={{
                fill: "grey",
                marginRight: 1,
                marginTop: "-2px",
              }}
            />
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {itinerary.duration} long
            </Typography>
          </Box>

          <IconButton size="small" disabled color="primary">
            {itinerary.isBookingAvailable ? (
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
                color: `${itinerary.isBookingAvailable ? "green" : "red"}`,
              }}
            >
              {itinerary.isBookingAvailable
                ? "booking available"
                : "booking closed"}
            </Typography>
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/*Timeline */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: 2,
          }}
        >
          Timeline
        </Typography>

        {timeline.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              width: "100%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.day}-content`}
              id={`${item.day}-header`}
              sx={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Day {item.day}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "lightgray",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  textAlign: "left",
                  padding: 2,
                }}
              >
                {item.plan.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      textAlign: "left",
                      padding: 2,
                      marginBottom: 2,
                      borderLeft: "3px solid black",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {activity.activity}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {activity.description}
                    </Typography>

                    <Typography
                      fontSize={14}
                      sx={{
                        color: "black",
                      }}
                    >
                      <strong>Time: </strong>
                      {activity.startTime}
                    </Typography>
                    <Typography
                      fontSize={14}
                      sx={{
                        color: "black",
                      }}
                    >
                      <strong>Location: </strong>
                      {activity.location}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        <Divider sx={{ my: 2 }} />

        {/*Booking date and Price  */}
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <Typography variant="h4">
            <strong> {displayPrice}</strong>
          </Typography>
        </Box>
      </Card>

      {/* Booking Section */}
      {itinerary.isBookingAvailable && (
        <Card
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            height: "250px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backgroundImage:
              "url(https://media.istockphoto.com/id/1223631367/vector/multicultural-group-of-people-is-standing-together-team-of-colleagues-students-happy-men-and.jpg?s=612x612&w=0&k=20&c=9Mwxpq9gADCuEyvFxUdmNhlQea5PED-jwCmqtfgdXhU=)",
            backgroundBlendMode: "lighten",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              width: "350px",
            }}
            onSubmit={handleBooking}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  width: "100%",
                }}
              >
                <DatePicker
                  label="On"
                  value={bookingDate}
                  onChange={(newValue) => {
                    setBookingDate(newValue);
                  }}
                  minDate={dayjs(itinerary.startDate)}
                  maxDate={dayjs(itinerary.endDate)}
                  sx={{
                    width: "100%",
                  }}
                  disabled={disabled}
                  format="DD/MM/YYYY"
                />
              </DemoContainer>
            </LocalizationProvider>

            <Typography
              variant="body2"
              color="error"
              sx={{
                display: `${msg ? "block" : "none"}`,
                color: `${
                  msg.includes("successful")
                    ? "green"
                    : msg.includes("failed")
                    ? "red"
                    : "grey"
                }`,
              }}
            >
              {msg}
            </Typography>
            {loadingBooking && !msg && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress color="inherit" />
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setShowBookingComponent(true)}
            >
              Book Now
            </Button>
          </form>
        </Card>
      )}

      {/* Reviews Section */}
      <Card elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Reviews ({itinerary.reviews.length})
        </Typography>

        <Box sx={{ display: "flex", overflowX: "auto", padding: 2, gap: 2 }}>
          {/* Reviews */}
          {itinerary.reviews.length > 0 ? (
            itinerary.reviews.map((review) => (
              <Card key={review._id} sx={{ maxWidth: 300, flexShrink: 0 }}>
                <CardHeader
                  title={
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="large"
                      icon={
                        <StarIcon style={{ fill: "gray" }} fontSize="large" />
                      }
                      emptyIcon={
                        <StarIcon
                          style={{ fill: "lightgray" }}
                          fontSize="large"
                        />
                      }
                    />
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left",
                    padding: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
                      {review.user.username.charAt(0)}
                    </Avatar>
                    <Typography variant="h5" color="text.secondary" ml={2}>
                      {review.user.username}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: "gray" }}>
              No reviews yet
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  ) : (
    <Typography variant="h4" gutterBottom>
      Itinerary not found
    </Typography>
  );
};

export default TouristViewItinerary;
