import React, { useEffect, useState } from 'react';
import { fetchItineraryBookingsByTouristId } from '../../services/api';
import dayjs from 'dayjs';
import BookedItineraryCard from '../../components/touristComponents/BookedItineraryCard';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import TouristViewBookedItinerary from './TouristViewBookedItineraryPage';
import { useLocation } from 'react-router';

const TouristBookedItineraries = () => {
    const id = localStorage.getItem('userId');


    const [bookedItineraries, setBookedItineraries] = useState();
    //get query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const itineraryBookingId = queryParams.get('id');

    useEffect(() => {
        const fetchBookedItineraries = async () => {
            const itinerariesBooked = await fetchItineraryBookingsByTouristId(id);
            setBookedItineraries(itinerariesBooked);
        }
        fetchBookedItineraries();
    }, [id, itineraryBookingId]);

    const isUpcoming = (itineraryBooking) => {
        const bookingDate = dayjs(itineraryBooking.date).startOf('day');
        return bookingDate.isAfter(dayjs().startOf('day'));
    }

    return (
        <div>
            {!itineraryBookingId ?
                <div>
                    {bookedItineraries ?
                        <div>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',

                            }}>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'center'
                                }}>
                                    Upcoming Itineraries
                                </Typography>
                                {bookedItineraries.filter((a) => isUpcoming(a)).map((itineraryBooking) => (
                                    <BookedItineraryCard key={itineraryBooking._id} itineraryBooking={itineraryBooking} />
                                ))}
                            </Box>
                            <Divider sx={{
                                mt: '20px',
                                mb: '20px',
                            }} />

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',

                            }}>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'center'
                                }}>
                                    Past Itineraries
                                </Typography>
                                {bookedItineraries.filter((a) => !isUpcoming(a)).map((itineraryBooking) => (
                                    <BookedItineraryCard key={itineraryBooking._id} itineraryBooking={itineraryBooking} />
                                ))}
                            </Box>
                        </div> :
                        <CircularProgress />}
                </div> :
                bookedItineraries && <TouristViewBookedItinerary itineraryBooking={
                    bookedItineraries.find((booking) => booking._id === itineraryBookingId)
                } touristId={id} />}
        </div>

    );
}

export default TouristBookedItineraries;