import React, { useEffect, useState } from 'react';
import { fetchActivityBookingsByTouristId } from '../../services/api';
import dayjs from 'dayjs';
import BookedActivityCard from '../../components/touristComponents/BookedActivityCard';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import TouristViewBookedActivity from './TouristViewBookedActivityPage';
import { useLocation } from 'react-router';

const TouristBookedActivities = () => {
    const id = localStorage.getItem('userId');


    const [bookedActivities, setBookedActivities] = useState();
    //get query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activityBookingId = queryParams.get('id');

    useEffect(() => {
        const fetchBookedActivities = async () => {
            const activitiesBooked = await fetchActivityBookingsByTouristId(id);
            setBookedActivities(activitiesBooked);
        }
        fetchBookedActivities();
    }, [id, activityBookingId]);

    const isUpcoming = (activityBooking) => {
        const bookingDate = dayjs(activityBooking.date).startOf('day');
        return bookingDate.isAfter(dayjs().startOf('day'));
    }
    return (
        <div>
            {!activityBookingId ?
                <div>
                    {bookedActivities ?
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
                                    Upcoming Activities
                                </Typography>
                                {bookedActivities.filter((a) => isUpcoming(a)).map((activityBooking) => (
                                    <BookedActivityCard key={activityBooking._id} activityBooking={activityBooking} />
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
                                    Past Activities
                                </Typography>
                                {bookedActivities.filter((a) => !isUpcoming(a)).map((activityBooking) => (
                                    <BookedActivityCard key={activityBooking._id} activityBooking={activityBooking} />
                                ))}
                            </Box>
                        </div> :
                        <CircularProgress />}
                </div> :
                bookedActivities && <TouristViewBookedActivity
                    activityBooking={bookedActivities.find((booking) =>
                        booking._id === activityBookingId)}
                    touristId={id} />}
        </div>

    );
}

export default TouristBookedActivities;