import React, { useEffect, useState } from 'react';
import { fetchActivityBookingsByTouristId } from '../../services/api';
import dayjs from 'dayjs';
import BookedActivityCard from '../../components/touristComponents/BookedActivityCard';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, Divider, Typography } from '@mui/material';
import TouristViewBookedActivity from './TouristViewBookedActivityPage';
import { useLocation } from 'react-router';

const TouristBookedActivities = ({ id }) => {
    const [bookedActivities, setBookedActivities] = useState();
    //get query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bookedActivityId = queryParams.get('id');

    useEffect(() => {
        const fetchBookedActivities = async () => {
            const activitiesBooked = await fetchActivityBookingsByTouristId(id);
            setBookedActivities(activitiesBooked);
        }
        fetchBookedActivities();
    }, [id, bookedActivityId]);

    const isUpcoming = (activityBooking) => {
        const bookingDate = dayjs(activityBooking.date).startOf('day');
        return bookingDate.isAfter(dayjs().startOf('day'));
    }
    return (
        <div>
            {!bookedActivityId ?
                <div>
                    {bookedActivities ?
                        <div>
                            <Box>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'left'
                                }}>
                                    Upcoming Activities
                                </Typography>
                                {bookedActivities.filter((a) => isUpcoming(a)).map((activityBooking) => (
                                    <BookedActivityCard key={activityBooking._id} bookedActivity={activityBooking.activity} bookingDate={activityBooking.date} />
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
                                    Past Activities
                                </Typography>
                                {bookedActivities.filter((a) => !isUpcoming(a)).map((activityBooking) => (
                                    <BookedActivityCard key={activityBooking._id} bookedActivity={activityBooking.activity} bookingDate={activityBooking.date} />
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
                bookedActivities && <TouristViewBookedActivity activity={bookedActivities.find(
                    (bookedActivity) => bookedActivity.activity._id === bookedActivityId
                ).activity} touristId={id} bookingDate={bookedActivities.find(
                    (bookedActivity) => bookedActivity.activity._id === bookedActivityId
                ).date} />}
        </div>

    );
}

export default TouristBookedActivities;