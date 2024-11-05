import React, { useState } from "react";
import { Box, Typography, Divider, Rating, Button, TextField, IconButton, Card, CardHeader, Avatar, CardContent, Icon, Stack, Chip } from "@mui/material";
import dayjs from "dayjs";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BlockIcon from '@mui/icons-material/Block';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import { addReviewToActivity } from "../../services/api";


const DATE_FORMAT = 'YYYY/MM/DD';
const TouristViewBookedActivity = ({ activity, touristId, bookingDate }) => {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [response, setResponse] = useState(null);

    const handleReviewSubmit = async () => {
        try {
            // Create a new review object
            const review = {
                user: touristId,
                rating: rating,
                comment: reviewText,
                date: new Date()
            };

            // Add the review to the activity
            const updatedActivity = await addReviewToActivity(activity._id, review);
            activity = updatedActivity.data;
            setSubmitted(true);
            setResponse("Review submitted successfully!");
        } catch (error) {
            console.error(error);
            setResponse("Failed to submit review");
        }
    };

    const userRatedBefore = () => {
        //Check if the user has already rated this activity
        const existingReview = activity.reviews.find(review => review.user._id === touristId);
        return existingReview ? existingReview.rating : null;
    };


    return (
        <Box sx={{ padding: 3 }}>
            {/* Activity Details */}
            <Card elevation={3} sx={{
                padding: 2, marginBottom: 3,
            }}>
                <Typography variant="h4" gutterBottom>{activity.title}</Typography>
                {/* Average Rating */}
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
                        {activity.advertiser.username.charAt(0)}
                    </Avatar>
                    <Typography sx={{
                        marginLeft: 1,
                        color: 'text.secondary',
                        fontWeight: 'bold',
                        fontSize: '16px'

                    }}>
                        {activity.advertiser.username}
                    </Typography>

                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 2,
                    width: '100%',
                }}>
                    <Rating value={activity.averageRating} readOnly precision={0.5}
                        icon={<StarIcon style={{ fill: 'orange' }} fontSize="large" />}
                        emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />}
                    />
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>({activity.reviews.length})</Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2
                }}>
                    {activity.category.map((category) => (
                        <Chip key={category._id} label={category.name} sx={{
                            backgroundColor: 'lightgray'
                        }} />
                    ))}
                    {activity.tags.map((tag) => (
                        <Chip key={tag._id} label={tag.name} sx={{
                            backgroundColor: 'lightgray'
                        }} variant="outlined" />
                    ))}
                </Stack>

                <Typography variant="subtitle1" gutterBottom>{activity.description}</Typography>

                {/* Location */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2,
                    marginBottom: 2
                }}>
                    <LocationOnIcon sx={{
                        fill: 'red'
                    }} />
                    <Typography variant="body1"
                        sx={{
                            marginLeft: 1, color: 'blue',
                            '&:hover': { textDecoration: 'underline', cursor: 'pointer' }
                        }}>
                        {activity.location.lat + ', ' + activity.location.lng}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Date, Time */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                    padding: 2,

                }}>

                    <Typography variant="body1"> <strong>Available Date(s): </strong>{
                        dayjs(activity.startDate).startOf('day').isBefore(dayjs(activity.endDate).startOf('day'))
                            ? `${dayjs(activity.startDate).format(DATE_FORMAT)} - ${dayjs(activity.endDate).format(DATE_FORMAT)}`
                            : `${dayjs(activity.startDate).format(DATE_FORMAT)}`
                    }</Typography>

                    <Typography variant="body1" sx={{
                        ml: -7
                    }}><strong>Time:</strong> {activity.time}</Typography>


                    <IconButton size="small" disabled color="primary">
                        {activity.isBookingAvailable ? <EventAvailableIcon sx={{
                            fill: 'green'
                        }} /> : <BlockIcon sx={{
                            fill: 'red'
                        }} />}
                        <Typography fontSize={14} sx={{
                            color: `${activity.isBookingAvailable ? 'green' : 'red'}`,
                        }}
                        >{activity.isBookingAvailable ? 'booking available' : 'booking closed'}</Typography>
                    </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/*Booking date, Price and Discount */}
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
                            <strong> ${activity.price}</strong>
                        </Typography>
                    </Box>


                    {activity.discount.length > 0 && (
                        activity.discount.map((discount) => (
                            <Typography key={discount._id} variant="body1" sx={{
                                color: 'grey',
                                fontSize: '14px'
                            }}>
                                <LocalOfferIcon fontSize="small" sx={{
                                    fill: 'green'
                                }} /> {discount.percentage}% off  {discount.description}
                            </Typography>
                        ))
                    )}
                </Box>
            </Card>


            {/* Reviews Section */}
            <Card elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom>Reviews ({activity.reviews.length})</Typography>

                <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2, gap: 2 }}>
                    {/* Reviews */}
                    {activity.reviews.length > 0 ? (
                        activity.reviews.map((review) => (
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
                            (<Typography variant="h6" sx={{ color: 'gray' }}>You have already rated this activity {userRatedBefore()}</Typography>)
                            :
                            (<Box mt={3}>
                                <Typography variant="h6">Leave a Review</Typography>
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
                                    label="Write your review"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                    disabled={submitted}
                                />
                                <Typography variant="body2" sx={{ color: 'gray' }}>You can't change your review once submitted</Typography>
                                <br />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReviewSubmit}
                                    disabled={!reviewText || rating === 0 || submitted}
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

export default TouristViewBookedActivity;
