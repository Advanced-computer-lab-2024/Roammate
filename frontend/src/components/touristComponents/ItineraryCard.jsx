import React, { useEffect } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
const DATE_FORMAT = 'YYYY/MM/DD';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, IconButton, Rating, Snackbar } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import HeartIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router';
import { convertPrice, getTouristSavedItineraries, removeTouristInterestInItinerary, saveItinerary, touristInterestedInItinerary, unsaveItinerary } from '../../services/api';
import ShareLink from './ShareLink';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ItineraryCard = ({ itinerary, setFetch }) => {
    const touristId = localStorage.getItem('userId');
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);
    const [title, setTitle] = useState(itinerary.title);
    const [duration, setDuration] = useState(itinerary.duration);
    const [price, setPrice] = useState(itinerary.price);
    const [startDate, setStartDate] = useState(itinerary.startDate);
    const [endDate, setEndDate] = useState(itinerary.endDate);
    const [isBookingAvailable, setIsBookingAvailable] = useState(itinerary.isBookingAvailable);
    const [rating, setRating] = useState(itinerary.averageRating);
    const navigate = useNavigate();
    const [displayPrice, setDisplayPrice] = useState();
    const [getNotification, setGetNotification] = useState(false);


    useEffect(() => {
        const getDisplayPrice = async (price) => {
            try {
                const displayPrice = await convertPrice(price);
                setDisplayPrice(displayPrice);
            } catch (error) {
                console.error("Error converting price:", error);
            }
        };
        const getSavedItinerariesByTourist = async () => {
            try {
                const savedItineraries = await getTouristSavedItineraries(touristId);
                const savedItinerariesIds = savedItineraries.data.bookmarkedItineraries.map(itinerary => itinerary._id);
                setAddedToWatchlist(savedItinerariesIds.includes(itinerary._id));
            } catch (error) {
                console.error("Error fetching saved itineraries:", error);
            }
        };
        if (itinerary.interestedTourists.includes(touristId)) {
            setGetNotification(true);
        }
        getDisplayPrice(price);
        getSavedItinerariesByTourist();
    }, []);

    const handleSave = () => {
        saveOrUnsaveItinerary();
    }

    const saveOrUnsaveItinerary = async () => {
        try {
            if (!addedToWatchlist) {
                await saveItinerary(touristId, itinerary._id);
            } else {
                await unsaveItinerary(touristId, itinerary._id);
            }
            setAddedToWatchlist(!addedToWatchlist);
            setFetch((prev) => prev + 1);
        }
        catch (error) {
            console.error("Error saving/unsaving itinerary:", error);
        }
    }

    const touristGetNotification = async () => {
        try {
            await touristInterestedInItinerary(touristId, itinerary._id);
        } catch (error) {
            console.error("Error getting notification:", error);
        }
    }

    const touristStopNotification = async () => {
        try {
            await removeTouristInterestInItinerary(touristId, itinerary._id);
        } catch (error) {
            console.error("Error stopping notification:", error);
        }
    }

    const handleGetNotificationWhenItineraryIsAvailable = () => {
        if (getNotification) {
            touristStopNotification();
        } else {
            touristGetNotification();
        }
        setGetNotification(!getNotification);
    }


    return (
        <Card sx={{ maxWidth: 650, mb: 4, width: "100%" }}>
            {/* <h1>Itinerary Card</h1> */}
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/*Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'start',
                    width: '100%',
                }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        flexGrow: 1,
                        textAlign: 'left',
                    }} >
                        {title}
                    </Typography>
                    <Rating name="read-only" value={rating} readOnly precision={0.5}
                        icon={<StarIcon style={{ fill: 'orange' }} />}
                        emptyIcon={<StarIcon style={{ fill: 'lightgray' }} />}
                    />

                    <IconButton size="medium"
                        onClick={handleGetNotificationWhenItineraryIsAvailable} sx={{
                            mt: '-10px',
                            mr: '-10px',
                            ml: '5px'
                        }}>
                        {getNotification ? <NotificationsActiveIcon sx={{
                            fill: 'orange'
                        }} /> : <NotificationsIcon sx={{
                            fill: 'grey'
                        }} />}
                    </IconButton>

                    <ShareLink type={'itinerary'} id={itinerary._id} />
                </Box>

                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'left',
                    mb: '10px',
                    width: '100%',
                }}>
                    {duration} itinerary
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Typography gutterBottom component="div" sx={{
                        flexGrow: 1,
                        textAlign: 'left',
                        fontSize: '16px',
                        color: 'text.secondary',
                    }} >
                        {
                            dayjs(startDate).startOf('day').isBefore(dayjs(endDate).startOf('day'))
                                ? `${dayjs(startDate).format(DATE_FORMAT)} - ${dayjs(endDate).format(DATE_FORMAT)}`
                                : `${dayjs(startDate).format(DATE_FORMAT)}`

                        }


                        <IconButton size="small" disabled color="primary" sx={{
                            ml: '10px',
                        }}>
                            {isBookingAvailable ? <EventAvailableIcon sx={{
                                fill: 'green'
                            }} /> : <BlockIcon sx={{
                                fill: 'red'
                            }} />}
                            <Typography fontSize={14} color={isBookingAvailable ? 'green' : 'red'}>{isBookingAvailable ? 'booking available' : 'booking closed'}</Typography>
                        </IconButton>
                    </Typography>

                    <Typography gutterBottom variant="h4" component="div" sx={{
                        color: `${isBookingAvailable > 0 ? 'black' : 'grey'}`,
                    }}>
                        {displayPrice}
                    </Typography>
                </Box>


            </CardContent >
            <CardActions sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                mb: '10px',
                mt: '-20px',
                width: '100%',
            }}>
                <Button variant="contained"
                    onClick={handleSave}
                    endIcon={<BookmarkIcon sx={{
                        fill: `${addedToWatchlist ? 'red' : 'white'}`
                    }} />}>
                    {addedToWatchlist ? 'Unsave' : 'Save'}
                </Button>
                <Button variant="contained" sx={{
                    backgroundColor: `${isBookingAvailable ? 'green' : 'grey'}`,
                    color: 'white',
                }}
                    onClick={() => navigate(`/tourist/itineraries?id=${itinerary._id}`)}
                    endIcon={<ArrowForwardIosIcon />}>
                    {isBookingAvailable ? 'Book' : 'View'}
                </Button>
            </CardActions>

        </Card >
    );
}

export default ItineraryCard;