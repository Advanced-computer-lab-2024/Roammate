import React, { useState } from "react";
import { Box, Typography, Divider, Rating, Button, TextField, IconButton, LinearProgress, Alert, Card, CardHeader, Avatar, CardContent, Icon, Chip, Stack, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import dayjs from "dayjs";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BlockIcon from '@mui/icons-material/Block';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import LanguageIcon from '@mui/icons-material/Language';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addReviewToItinerary, addReviewToTourguide, deleteItineraryBooking } from "../../services/api";


const DATE_FORMAT = 'YYYY/MM/DD';
const TouristViewBookedItinerary = ({ itineraryBooking, touristId }) => {
    if (!itineraryBooking)
        return <Typography variant="h4" gutterBottom>No itinerary found</Typography>;
    let itinerary = itineraryBooking.itinerary;
    const bookingDate = itineraryBooking.date;
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [tourguideRating, setTourguideRating] = useState(0);
    const [tourguideReviewText, setTourguideReviewText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [response, setResponse] = useState(null);
    const [cancelMessage, setCancelMessage] = useState(null);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleReviewSubmit = async () => {
        try {
            // Create a new review object
            const review = {
                user: touristId,
                rating: rating,
                comment: reviewText,
                date: new Date()
            };
            // Add the review to the itinerary
            const updatedItinerary = await addReviewToItinerary(itinerary._id, review);
            itinerary = updatedItinerary.data;

            // Create a new review object for the tour guide
            const tourguideReview = {
                user: touristId,
                rating: tourguideRating,
                comment: tourguideReviewText,
                date: new Date()
            };
            // Add the review to the tour guide
            console.log(itinerary)

            const updatedTourguide = await addReviewToTourguide(itinerary.tourGuide._id, tourguideReview);
            itinerary.tourGuide = updatedTourguide.data;

            setSubmitted(true);
            setResponse("Review submitted successfully!");
        } catch (error) {
            console.error(error);
            setResponse("Failed to submit review");
        }
    };

    const userRatedBefore = () => {
        //Check if the user has already rated this itinerary
        const existingReview = itinerary.reviews.find(review => review.user._id === touristId);
        return existingReview ? existingReview.rating : null;
    };


    const canCancelBooking = () => {
        // Check if the booking can be cancelled if the booked date is at least 48 hours away
        const startDate = dayjs(bookingDate).startOf('day');
        const currentDate = dayjs(new Date()).startOf('day');
        return startDate.diff(currentDate, 'hours') >= 48;
    };

    const handleCancelBooking = async () => {
        // Cancel the booking
        if (!canCancelBooking()) {
            setCancelMessage("You cannot cancel this booking as the booked date is less than 48 hours away");
            setDisabled(true);
            return;
        }
        try {
            setLoadingCancel(true);
            const response = await deleteItineraryBooking(itineraryBooking._id);
            setCancelMessage("Booking cancelled successfully. Full ticket price will be refunded to your account wallet");
            setDisabled(true);
            setLoadingCancel(false);
        } catch (error) {
            console.error(error);
            setCancelMessage("Failed to cancel booking");
        }
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Card elevation={3} sx={{
                padding: 2, marginBottom: 3,
            }}>
                <Typography variant="h4" gutterBottom>{itinerary.title}</Typography>
                {/* Average Rating */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 2,
                    marginTop: 2,
                    width: '100%',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2
                    }}>
                        {/* <Typography variant="h6" color="text.secondary" ml={1}>
                            By:&nbsp;
                        </Typography> */}
                        <Avatar sx={{
                            backgroundColor: 'purple',
                            width: '25px',
                            height: '25px',
                            fontSize: '14px'


                        }}>
                            {itinerary.tourGuide.username.charAt(0)}
                        </Avatar>
                        <Typography sx={{
                            marginLeft: 1,
                            color: 'text.secondary',
                            fontWeight: 'bold',
                            fontSize: '16px'

                        }}>
                            {itinerary.tourGuide.username}
                        </Typography>

                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2
                    }}>
                        <Rating value={itinerary.averageRating} readOnly precision={0.5}
                            icon={<StarIcon style={{ fill: 'orange' }} fontSize="large" />}
                            emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />}
                        />
                        <Typography variant="body1" sx={{ marginLeft: '5px' }}>({itinerary.reviews.length})</Typography>
                    </Box>

                    {/*Language */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 1,

                    }}>
                        <LanguageIcon />
                        <Typography variant="body1" sx={{ marginLeft: 1 }}>{itinerary.lang}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} mt={2} >
                        {itinerary.tags.map((tag) => (
                            <Chip key={tag._id} label={tag.name} sx={{
                                backgroundColor: 'lightgray'
                            }} variant="outlined" />
                        ))}
                    </Stack>

                    {/* Locations */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 4,
                        marginBottom: 2
                    }}>
                        <LocationOnIcon sx={{
                            fill: 'red'
                        }} />
                        <Typography variant="body1"
                            sx={{
                                marginLeft: 1,

                            }}>
                            <strong>
                                Pickup: &nbsp;
                            </strong>
                            {itinerary.pickUpLocation}</Typography>

                        <LocationOnIcon sx={{
                            fill: 'red',
                            marginLeft: 3
                        }} />
                        <Typography variant="body1"
                            sx={{
                                marginLeft: 1,

                            }}>
                            <strong>
                                Dropoff: &nbsp;
                            </strong>
                            {itinerary.dropOffLocation}</Typography>
                    </Box>
                </Box>





                <Divider sx={{ my: 2 }} />


                {/* Dates */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                    width: '100%',
                    padding: 2
                }}>

                    <Typography variant="body1"> <strong>Available Date(s): </strong>{
                        dayjs(itinerary.startDate).startOf('day').isBefore(dayjs(itinerary.endDate).startOf('day'))
                            ? `${dayjs(itinerary.startDate).format(DATE_FORMAT)} - ${dayjs(itinerary.endDate).format(DATE_FORMAT)}`
                            : `${dayjs(itinerary.startDate).format(DATE_FORMAT)}`
                    }</Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -20
                    }}>
                        <WatchLaterIcon fontSize='medium' sx={{
                            fill: 'grey',
                            marginRight: 1,
                            marginTop: '-2px'
                        }} />
                        <Typography variant="subtitle1" gutterBottom sx={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                        }}>{itinerary.duration} long</Typography>
                    </Box>


                    <IconButton size="small" disabled color="primary">
                        {itinerary.isBookingAvailable ? <EventAvailableIcon sx={{
                            fill: 'green'
                        }} /> : <BlockIcon sx={{
                            fill: 'red'
                        }} />}
                        <Typography fontSize={14} sx={{
                            color: `${itinerary.isBookingAvailable ? 'green' : 'red'}`,
                        }}
                        >{itinerary.isBookingAvailable ? 'booking available' : 'booking closed'}</Typography>
                    </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/*Timeline */}
                <Typography variant="h4" gutterBottom sx={{
                    marginBottom: 2
                }}>Timeline</Typography>

                {itinerary.timeline.map((item, index) => (
                    <Accordion key={index} sx={{
                        width: '100%',
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${item.day}-content`}
                            id={`${item.day}-header`}
                            sx={{
                                backgroundColor: '#f5f5f5'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Day {item.day}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                            backgroundColor: 'lightgray'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                alignItems: 'start',
                                textAlign: 'left',
                                padding: 2,
                            }}>
                                {item.plan.map((activity, index) => (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'start',
                                        alignItems: 'start',
                                        textAlign: 'left',
                                        padding: 2,
                                        marginBottom: 2,
                                        borderLeft: '3px solid black'
                                    }}>
                                        <Typography variant="h6" gutterBottom>
                                            {activity.activity}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {activity.description}
                                        </Typography>

                                        <Typography fontSize={14} sx={{
                                            color: 'black',
                                        }}
                                        ><strong>Time: </strong>{activity.startTime}</Typography>
                                        <Typography fontSize={14} sx={{
                                            color: 'black',
                                        }}
                                        ><strong>Location: </strong>{activity.location}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}


                <Divider sx={{ my: 2 }} />


                {/*Booking date and Price  */}
                <Box mt={2} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    alignItems: 'end'

                }}>


                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexGrow: 1
                        }}>
                            <CheckIcon sx={{
                                fill: 'green'
                            }} />
                            <Typography variant="body1"

                                sx={{
                                    marginLeft: 1, color: 'grey',
                                }}>booked on &nbsp;
                                {dayjs(bookingDate).format(DATE_FORMAT)}</Typography>
                        </Box>


                        <Typography variant="h4">
                            <strong> ${itinerary.price}</strong>
                        </Typography>
                    </Box>
                </Box>
            </Card>

            {/*Cancel booking */}
            {/* Check if the booking can be cancelled */}
            {dayjs(bookingDate).startOf('day').isBefore(dayjs(new Date()).startOf('day')) ? null : (
                <Card elevation={3} sx={{
                    padding: 2, marginBottom: 3,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2,
                        width: '100%'
                    }}>
                        <Typography variant="h4" sx={{ color: 'grey' }} gutterBottom>Cancellation</Typography>
                        <Typography variant="body1" sx={{ color: 'grey', mb: 2 }} gutterBottom>You can cancel this booking if the booked date is at least 48 hours away</Typography>
                        {loadingCancel && <LinearProgress />}
                        {cancelMessage && (cancelMessage.includes("successfully") ? <Alert severity="success">{cancelMessage}</Alert> : <Alert severity="error">{cancelMessage}</Alert>)}
                        <Button variant="contained" sx={{ backgroundColor: 'red', marginTop: 2 }}
                            startIcon={<BlockIcon />}
                            onClick={handleCancelBooking}
                            disabled={disabled}
                        >
                            Cancel Booking
                        </Button>
                    </Box>
                </Card >
            )}



            {/* Reviews Section */}
            <Card elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom>Reviews ({itinerary.reviews.length})</Typography>

                <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2, gap: 2 }}>
                    {/* Reviews */}
                    {itinerary.reviews.length > 0 ? (
                        itinerary.reviews.map((review) => (
                            <Card key={review._id} sx={{ maxWidth: 300, flexShrink: 0 }}>
                                <CardHeader
                                    title={<Rating value={review.rating} precision={0.5} readOnly size="large"
                                        icon={<StarIcon style={{ fill: 'gray' }} fontSize="large" />}
                                        emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />} />}
                                />
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    textAlign: 'left',
                                    padding: 2,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 2
                                    }}>

                                        <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
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

                        ))) : (
                        <Typography variant="body1" sx={{ color: 'gray' }}>No reviews yet</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />



                {/* Leave a Review */}
                {
                    dayjs(bookingDate).startOf('day').isBefore(dayjs(new Date()).startOf('day')) ?
                        (userRatedBefore() ?
                            (<Typography variant="h6" sx={{ color: 'gray' }}>You have already rated this itinerary {userRatedBefore()}</Typography>)
                            :
                            (<Box mt={3}>
                                <Typography variant="h5" sx={{ color: 'gray' }}>Rate your experience</Typography>
                                <Rating
                                    value={rating}
                                    onChange={(e, newValue) => setRating(newValue)}
                                    sx={{ marginY: 1 }}
                                    precision={0.5}
                                    icon={<StarIcon style={{ fill: 'orange' }} fontSize="large" />}
                                    emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />}
                                    disabled={submitted}
                                />
                                <TextField
                                    label="Write your review on this itinerary"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                    disabled={submitted}
                                />
                                {/* Rate tour guide */}

                                <Typography variant="h5" sx={{ color: 'gray', mt: 3 }}>Rate your tour guide</Typography>
                                <Rating
                                    value={tourguideRating}
                                    onChange={(e, newValue) => setTourguideRating(newValue)}
                                    sx={{ marginY: 1 }}
                                    precision={0.5}
                                    icon={<StarIcon style={{ fill: 'orange' }} fontSize="large" />}
                                    emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />}
                                    disabled={submitted}
                                />
                                <br />
                                {/* <Typography variant="body2" sx={{ color: 'gray' }}>comment on your experience with {itinerary.tourGuide.username}</Typography>
                                <br /> */}
                                <TextField
                                    label="Write your review on your tour guide"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={tourguideReviewText}
                                    onChange={(e) => setTourguideReviewText(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                    disabled={submitted}
                                />
                                <br />


                                <Typography variant="body2" sx={{ color: 'gray' }}>You can't change your review once submitted</Typography>
                                <br />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReviewSubmit}
                                    disabled={!reviewText || rating === 0 || submitted || !tourguideReviewText || tourguideRating === 0}
                                >
                                    Submit Review
                                </Button>
                                {response && <Typography sx={{
                                    marginTop: 2,
                                    color:
                                        response.includes("successfully") ? 'green' : 'red'
                                }}>{response}</Typography>}
                            </Box>)) : null
                }
            </Card>
        </Box>
    );
};

export default TouristViewBookedItinerary;
