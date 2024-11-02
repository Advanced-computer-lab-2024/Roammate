import React, { useState, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';;
import CachedIcon from '@mui/icons-material/Cached';
import { searchAndFilterItineraries } from '../../services/api';
import SearchBar from '../../components/touristComponents/SearchBar';
import ItineraryCard from '../../components/touristComponents/ItineraryCard';
import SortAndFilterItineraries from '../../components/touristComponents/SortAndFilterItineraries';
import { useLocation, useOutletContext } from 'react-router';
import TouristViewItinerary from './TouristViewItineraryPage'

const TouristItinerariesPage = () => {
    const [itineraries, setItineraries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
    const [fetch, setFetch] = useState(0);
    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        fetchItineraries();
        if (id) {
            setActiveButton(null)
        }
    }, [id, fetch]);

    const fetchItineraries = async () => {
        const searchFilterAndSortCriteria = {
            query: searchQuery,
            ...filterAndSortCriteria,
        };
        const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
        // console.log(queryParameters.toString());
        const result = await searchAndFilterItineraries(queryParameters);
        setItineraries(result);
    }

    return (
        !id ?
            <Box>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFetch={setFetch} />

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
                    <SortAndFilterItineraries setFilterAndSortCriteria={setFilterAndSortCriteria} setFetch={setFetch} />
                </Grid2 >
            </Box > : <TouristViewItinerary itinerary={itineraries.find((it) => it._id === id)} />
    );
}

export default TouristItinerariesPage;