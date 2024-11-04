import React from 'react';
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router';

const BookedItineraryCard = ({ bookedItinerary, bookingDate }) => {
    const [title, setTitle] = useState(bookedItinerary.title);
    const [duration, setDuration] = useState(bookedItinerary.duration);
    const [date, setDate] = useState(dayjs(bookingDate).format(DATE_FORMAT));
    const [rating, setRating] = useState(bookedItinerary.averageRating);
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);


    const copyLinkToClipboard = async () => {
        const link = `${window.location.origin}/tourist/itineraries?id=` + bookedItinerary._id;
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
                    <IconButton size="small" color="primary" sx={{
                        mt: '-5px',
                        ml: '10px',
                    }} onClick={copyLinkToClipboard}>
                        <ShareIcon />
                    </IconButton>
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
                        fontWeight: 'bold',
                    }} >
                        {
                            `on ${dayjs(date).format(DATE_FORMAT)}`
                        }


                        <IconButton size="small" disabled color="primary" sx={{
                            ml: '10px',
                        }}>
                            {dayjs(new Date()).startOf('day').isBefore(dayjs(date).startOf('day')) ?
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <EventAvailableIcon sx={{
                                        fill: 'orange'
                                    }} />
                                    <Typography fontSize={14} sx={{
                                        color: '#FFC107',
                                    }}>upcoming</Typography>
                                </Box>
                                :
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <CheckCircleOutlineIcon sx={{
                                        fill: 'green'
                                    }} />
                                    <Typography fontSize={14} sx={{
                                        color: 'green',
                                    }}>completed</Typography>
                                </Box>
                            }
                        </IconButton>
                    </Typography>
                </Box>


            </CardContent>
            <CardActions sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                mb: '10px',
                mt: '-20px',
                width: '100%',
            }}>
                {dayjs(new Date()).startOf('day').isBefore(dayjs(date).startOf('day')) ?
                    <Button variant="contained"
                        onClick={() => navigate(`/tourist/bookings/itineraries?id=${bookedItinerary._id}`)}
                        endIcon={<CancelIcon sx={{
                            fill: 'white'
                        }} />}
                        sx={{
                            backgroundColor: 'red',
                        }}
                    >
                        Cancel
                    </Button> :
                    <Button variant="contained"
                        onClick={() => navigate(`/tourist/bookings/itineraries?id=${bookedItinerary._id}`)}
                        endIcon={<ArrowForwardIosIcon />}>
                        Review
                    </Button>}


            </CardActions>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    sx={{
                        width: '100%',
                        backgroundColor: '#FFBF00',
                    }}
                >
                    Itinerary Link Copied to Clipboard
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default BookedItineraryCard;