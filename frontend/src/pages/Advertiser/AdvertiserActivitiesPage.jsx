import React, { useState, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';
import ActivityCard from '../../components/advertiserComponents/ActvityCard';
import CachedIcon from '@mui/icons-material/Cached';
import { fetchActivitiesByAdvertiserId } from '../../services/api';
import { useLocation, useOutletContext } from 'react-router';
import ManageActivityPage from './ManageActivityPage';


const AdvertiserActivitiesPage = ({ id }) => {
    const [activities, setActivities] = useState([]);
    const [fetch, setFetch] = useState(0);
    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activity_id = queryParams.get('id');

    useEffect(() => {
        const fetchMyActivities = async () => {
            const result = await fetchActivitiesByAdvertiserId(id);
            setActivities(result);
            setFetch(fetch + 1);
        };
        try {
            fetchMyActivities();

        }
        catch (err) {
            console.log(err);
        }
        if (activity_id) {
            setActiveButton(null)
        }
    }, [activity_id]);


    return (
        !activity_id ?
            <Box>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} sx={{
                        flexGrow: 1,
                    }} >
                        {activities.length === 0 && (
                            fetch < 1 ? (< h2 > loading
                                <CachedIcon sx={
                                    {
                                        fontSize: '25px',
                                        ml: '10px',
                                        mb: '-5px',
                                    }
                                } />
                            </h2>) : (<h2>No Activities Found</h2>))}
                        {activities.map((activity) => (
                            <div key={activity._id}>
                                <ActivityCard activity={activity} setActiveButton={setActiveButton} />
                            </div>
                        ))}

                    </Grid2>

                    {/* <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    backgroundColor: 'lightgray',
                    p: '15px',
                }}>
                    <Typography variant='h4'>
                        Some other functionalities
                    </Typography>
                </Box> */}

                </Grid2 >
            </Box > : <ManageActivityPage activity={activities.find((act) => act._id === activity_id)} />
    );
}

export default AdvertiserActivitiesPage;