import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Grid2 } from '@mui/material';
import ActivityCard from '../../components/touristComponents/ActivityCard';
import SortAndFilterActivities from '../../components/touristComponents/SortAndFilterActivities';
import CachedIcon from '@mui/icons-material/Cached';
import SearchBar from '../../components/touristComponents/SearchBar';
import { searchAndFilterActivities } from '../../services/api';
import { useLocation, useOutletContext } from 'react-router';
import TouristViewActivity from './TouristViewActivityPage';

const TouristActivitiesPage = ({ id }) => {
    const [activities, setActivities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
    const [fetch, setFetch] = useState(0);
    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryActivityId = queryParams.get('id');


    useEffect(() => {
        const fetchActivities = async () => {
            const searchFilterAndSortCriteria = {
                query: searchQuery,
                ...filterAndSortCriteria,
            };
            const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
            // console.log(queryParameters.toString());
            const result = await searchAndFilterActivities(queryParameters);
            setActivities(result);
        };
        fetchActivities();
        if (queryActivityId) {
            setActiveButton(null)
        }
    }, [queryActivityId, fetch]);



    return (
        !queryActivityId ?
            (<Box>
                < SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFetch={setFetch} />

                <Grid2 container spacing={1}>
                    <Grid2 xs={12} sx={{
                        flexGrow: 1,
                    }} >
                        {activities.length === 0 && (
                            fetch < 1 ? (<CircularProgress />) : (<h2>No Activities Found</h2>))}
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
            <TouristViewActivity id={queryActivityId} touristId={id} />
    );
}

export default TouristActivitiesPage;