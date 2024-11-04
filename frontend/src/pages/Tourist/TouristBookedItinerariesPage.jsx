import React, { useEffect, useState } from 'react';
import { fetchItineraryBookingsByTouristId } from '../../services/api';
import dayjs from 'dayjs';
import BookedItineraryCard from '../../components/touristComponents/BookedItineraryCard';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, Divider, Typography } from '@mui/material';
import TouristViewBookedItinerary from './TouristViewBookedItineraryPage';
import { useLocation } from 'react-router';

const TouristBookedItineraries = ({ id }) => {
    const [bookedItineraries, setBookedItineraries] = useState();
    //get query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bookedItineraryId = queryParams.get('id');

    useEffect(() => {
        const fetchBookedItineraries = async () => {
            const itinerariesBooked = await fetchItineraryBookingsByTouristId(id);
            setBookedItineraries(itinerariesBooked);
        }
        fetchBookedItineraries();
    }, [id, bookedItineraryId]);

    const isUpcoming = (itineraryBooking) => {
        const bookingDate = dayjs(itineraryBooking.date).startOf('day');
        return bookingDate.isAfter(dayjs().startOf('day'));
    }

    return (
        <div>
            {!bookedItineraryId ?
                <div>
                    {bookedItineraries ?
                        <div>
                            <Box>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'left'
                                }}>
                                    Upcoming Itineraries
                                </Typography>
                                {bookedItineraries.filter((a) => isUpcoming(a)).map((itineraryBooking) => (
                                    <BookedItineraryCard key={itineraryBooking._id} bookedItinerary={itineraryBooking.itinerary} bookingDate={itineraryBooking.date} />
                                ))}
                            </Box>
                            <Divider sx={{
                                mt: '20px',
                                mb: '20px',
                            }} />

                            <Box>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'left'
                                }}>
                                    Past Itineraries
                                </Typography>
                                {bookedItineraries.filter((a) => !isUpcoming(a)).map((itineraryBooking) => (
                                    <BookedItineraryCard key={itineraryBooking._id} bookedItinerary={itineraryBooking.itinerary} bookingDate={itineraryBooking.date} />
                                ))}
                            </Box>
                        </div> :
                        <h2>loading
                            <CachedIcon sx={{
                                fontSize: '25px',
                                ml: '10px',
                                mb: '-5px',
                            }} />
                        </h2>}
                </div> :
                bookedItineraries && <TouristViewBookedItinerary itinerary={bookedItineraries.find(
                    (bookedItinerary) => bookedItinerary.itinerary._id === bookedItineraryId
                ).itinerary} touristId={id} bookingDate={bookedItineraries.find(
                    (bookedItinerary) => bookedItinerary.itinerary._id === bookedItineraryId
                ).date} />}
        </div>

    );
}

export default TouristBookedItineraries;