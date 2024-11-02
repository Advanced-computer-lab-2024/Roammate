import React, { useState, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';;
import CachedIcon from '@mui/icons-material/Cached';
import { fetchItinerariesByTourGuideId } from '../../services/api';
import ItineraryCard from '../../components/tourGuideComponents/ItineraryCard';
import { useLocation, useOutletContext } from 'react-router';
import ManageItineraryPage from './ManageItineraryPage';


const TourGuideItinerariesPage = ({ id }) => {
    const [itineraries, setItineraries] = useState([]);
    const [fetch, setFetch] = useState(0);
    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const itinerary_id = queryParams.get('id');


    useEffect(() => {
        const fetchMyItineraries = async () => {
            const result = await fetchItinerariesByTourGuideId(id);
            setItineraries(result);
            setFetch(fetch + 1);
        };
        try {
            fetchMyItineraries();
        }
        catch (err) {
            console.log(err);
        }
        if (itinerary_id) {
            setActiveButton(null)
        }
    }, [itinerary_id]);

    return (
        !itinerary_id ?
            <Box>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} sx={{
                        flexGrow: 1,
                    }} >
                        {itineraries.length === 0 && (
                            fetch < 1 ? (< h2 > loading
                                <CachedIcon sx={
                                    {
                                        fontSize: '25px',
                                        ml: '10px',
                                        mb: '-5px',
                                    }
                                } />
                            </h2>) : (<h2>No Itineraries Found</h2>))}
                        {itineraries.map((itinerary) => (
                            <div key={itinerary._id}>
                                <ItineraryCard itinerary={itinerary} />
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
            </Box > : <ManageItineraryPage itinerary={itineraries.find((it) => it._id === itinerary_id)} />
    );
}

export default TourGuideItinerariesPage;