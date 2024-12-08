import ActivityCard from "../../components/touristComponents/ActivityCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getTouristSavedActivities } from "../../services/api";

const BookmarkedActivitiesPage = () => {
    const id = localStorage.getItem('userId');
    const [activities, setActivities] = useState([]);
    const [fetch, setFetch] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setActivities([]);
        const fetchBookmarkedActivities = async () => {
            try {
                setLoading(true);
                const response = await getTouristSavedActivities(id);
                //console.log("Bookmarked activities:", response.data);
                setActivities(response.data.bookmarkedActivities);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching bookmarked activities:", error);
            }
        };
        fetchBookmarkedActivities();

    }, [id, fetch]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            mt: 4,
        }}>
            <Typography variant="h5" sx={{ mb: 4, color: "lightgrey" }}>Bookmarked Activities</Typography>

            {activities.length > 0 && activities.map((activity) => (
                <ActivityCard activity={activity} setFetch={setFetch} />
            ))}
            {!loading && activities.length === 0 && <Typography variant="h6">No bookmarked activities</Typography>}

            {loading && <CircularProgress />}

        </Box>
    );
}

export default BookmarkedActivitiesPage;