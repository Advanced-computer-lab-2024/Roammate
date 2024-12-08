import ActivityCard from "../../components/touristComponents/ActivityCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getTouristSavedItineraries } from "../../services/api";
import ItineraryCard from "../../components/touristComponents/ItineraryCard";

const BookmarkedItinerariesPage = () => {
    const id = localStorage.getItem('userId');
    const [itineraries, setItineraries] = useState([]);
    const [fetch, setFetch] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setItineraries([]);
        const fetchBookmarkedItineraries = async () => {
            try {
                setLoading(true);
                const response = await getTouristSavedItineraries(id);
                //console.log("Bookmarked itineraries:", response.data);
                setItineraries(response.data.bookmarkedItineraries);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching bookmarked itineraries:", error);
            }
        };
        fetchBookmarkedItineraries();

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
            <Typography variant="h5" sx={{ mb: 4, color: "lightgrey" }}>Bookmarked itineraries</Typography>

            {itineraries.length > 0 && itineraries.map((itinerary) => (
                <ItineraryCard itinerary={itinerary} setFetch={setFetch} />
            ))}
            {!loading && itineraries.length === 0 && <Typography variant="h6">No bookmarked itineraries</Typography>}

            {loading && <CircularProgress />}

        </Box>
    );
}

export default BookmarkedItinerariesPage;