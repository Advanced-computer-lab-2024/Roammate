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
import { IconButton, Rating } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import ShareLink from './ShareLink';

const BookedActivityCard = ({ activityBooking }) => {
    const bookedActivity = activityBooking.activity;
    const bookingDate = activityBooking.date;
    const [title, setTitle] = useState(bookedActivity.title);
    const [description, setDescription] = useState(bookedActivity.description);
    const [date, setDate] = useState(dayjs(bookingDate).format(DATE_FORMAT));
    const [rating, setRating] = useState(bookedActivity.averageRating);
    const navigate = useNavigate();


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
                    <ShareLink type={'activity'} id={bookedActivity._id} />
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
                    {description}
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
                        onClick={() => navigate(`/tourist/bookings/activities?id=${activityBooking._id}`)}
                        endIcon={<ArrowForwardIosIcon sx={{
                            fill: 'white'
                        }} />}
                        sx={{
                            backgroundColor: '#FFBF55',
                        }}
                    >
                        More
                    </Button> :
                    <Button variant="contained"
                        onClick={() => navigate(`/tourist/bookings/activities?id=${activityBooking._id}`)}
                        endIcon={<ArrowForwardIosIcon />}>
                        Review
                    </Button>}
            </CardActions>
        </Card >
    );
}

export default BookedActivityCard;