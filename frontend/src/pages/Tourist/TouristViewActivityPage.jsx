import CachedIcon from '@mui/icons-material/Cached';
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Rating, Button, TextField, IconButton, Card, CardHeader, Avatar, CardContent, Icon, Stack, Chip, CircularProgress, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BlockIcon from '@mui/icons-material/Block';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import { bookActivity, convertPrice, getActivityById } from '../../services/api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const DATE_FORMAT = 'DD/MM/YYYY';
const TouristViewActivity = ({ id, touristId }) => {
    const [activity, setActivity] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingBooking, setLoadingBooking] = useState(false);
    const [bookingDate, setBookingDate] = useState(dayjs());
    const [msg, setMsg] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [displayPrice, setDisplayPrice] = useState('');

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await getActivityById(id);
                setActivity(response.data);
                setBookingDate(dayjs(response.data.startDate));
                setLoading(false);
            } catch (error) {
                console.log("Error fetching activity:", error);
            }
        };
        fetchActivity();
    }, [id, touristId]);

    useEffect(() => {
        const getDisplayPrice = async () => {
            if (activity?.price) {
                try {
                    const displayPrice = await convertPrice(activity.price);
                    setDisplayPrice(displayPrice);
                } catch (error) {
                    console.error("Error converting price:", error);
                }
            }
        };
        getDisplayPrice();
    }, [activity]);


    const handleBooking = async (e) => {
        e.preventDefault();
        setLoadingBooking(true);
        try {
            await bookActivity(id, touristId, bookingDate, activity.price);
            setMsg('Your booking is successful for ' + bookingDate.format(DATE_FORMAT));
            setDisabled(true);
            setLoadingBooking(false);
        } catch (error) {
            console.log(error.response.data.error);
            setMsg('Booking failed! ' + error.response.data.error);
        }
    }

    return (
        loading ? <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px'
        }}><CircularProgress size='4rem' /></Box> :
            activity ? (
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

                            <Typography variant="h4">
                                <strong> {displayPrice}</strong>
                            </Typography>

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


                    {/* Booking Section */}
                    {activity.isBookingAvailable && (<Card elevation={3} sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        height: '250px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        backgroundImage: 'url(https://media.istockphoto.com/id/1223631367/vector/multicultural-group-of-people-is-standing-together-team-of-colleagues-students-happy-men-and.jpg?s=612x612&w=0&k=20&c=9Mwxpq9gADCuEyvFxUdmNhlQea5PED-jwCmqtfgdXhU=)',
                        backgroundBlendMode: 'lighten',
                    }}>

                        <form style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 15,
                            width: '350px'

                        }}
                            onSubmit={handleBooking}
                        >

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DatePicker']} sx={{
                                    width: '100%'
                                }}>
                                    <DatePicker
                                        label="On"
                                        value={bookingDate}
                                        onChange={(newValue) => {
                                            setBookingDate(newValue);
                                        }}
                                        minDate={dayjs(activity.startDate)}
                                        maxDate={dayjs(activity.endDate)}
                                        sx={{
                                            width: '100%'
                                        }}
                                        disabled={disabled}
                                        format='DD/MM/YYYY'
                                    />
                                </DemoContainer>
                            </LocalizationProvider>


                            <Typography variant="body2" color="error" sx={{
                                display: `${msg ? 'block' : 'none'}`,
                                color: `${msg.includes('successful') ? 'green' : msg.includes('failed') ? 'red' : 'grey'}`,
                            }}>
                                {msg}
                            </Typography>
                            {loadingBooking && !msg &&
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress color='inherit' />
                                </Box>}
                            <Button type='submit' variant="contained" color="primary" disabled={disabled} sx={{
                                width: '100%',
                            }} startIcon={<CheckIcon sx={{
                                fill: 'white'
                            }} />}>Book Now</Button>
                        </form>
                    </Card>)}



                    {/* Reviews Section */}
                    <Card elevation={3} sx={{ mt: 3, padding: 2 }}>
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
                    </Card>
                </Box>) : (<h2>Activity not found</h2>)
    );
}
export default TouristViewActivity;