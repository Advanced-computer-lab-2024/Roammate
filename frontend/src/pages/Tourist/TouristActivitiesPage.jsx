import React, { useState, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';
import ActivityCard from '../../components/touristComponents/ActivityCard';
import SortAndFilterActivities from '../../components/touristComponents/SortAndFilterActivities';
import CachedIcon from '@mui/icons-material/Cached';
import SearchBar from '../../components/touristComponents/SearchBar';
import { searchAndFilterActivities } from '../../services/api';
import { useLocation, useOutletContext } from 'react-router';
import TouristViewActivity from './TouristViewActivityPage';

const TouristActivitiesPage = () => {
    const [activities, setActivities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
    const [fetch, setFetch] = useState(0);
    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


    useEffect(() => {
        fetchActivities();
        if (id) {
            setActiveButton(null)
        }
    }, [id, fetch]);

    const fetchActivities = async () => {
        const searchFilterAndSortCriteria = {
            query: searchQuery,
            ...filterAndSortCriteria,
        };
        const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
        // console.log(queryParameters.toString());
        const result = await searchAndFilterActivities(queryParameters);
        setActivities(result);
    }

    return (
        !id ?
            (<Box>
                < SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFetch={setFetch} />

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
                                <ActivityCard activity={activity} />
                            </div>
                        ))}

                    </Grid2>

                    <SortAndFilterActivities setFilterAndSortCriteria={setFilterAndSortCriteria} setFetch={setFetch} />
                </Grid2 >
            </Box >)
            :
            <TouristViewActivity activity={activities.find((act) => act._id === id)} />
    );
}

export default TouristActivitiesPage;