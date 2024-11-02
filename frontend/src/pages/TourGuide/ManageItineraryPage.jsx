import { Box } from "@mui/material";
import { useState } from "react";
import EditItineraryForm from "../../components/itineraryComponents/EditItineraryForm";
import CachedIcon from '@mui/icons-material/Cached';

const ManageItineraryPage = ({ itinerary }) => {
    if (!itinerary) {
        return (
            < h2 > loading
                <CachedIcon sx={
                    {
                        fontSize: '25px',
                        ml: '10px',
                        mb: '-5px',
                    }
                } />
            </h2>
        )
    }
    const [rating, setRating] = useState(itinerary.averageRating);
    const [reviews, setReviews] = useState(itinerary.reviews);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '20px',
                width: '350px',
            }}
        >
            <EditItineraryForm itinerary={itinerary} />

            <Box>
                {/* TODO */}
                <h2 style={{
                    color: 'grey',
                    mb: '10px',
                }}>
                    Reviews Section
                </h2>
            </Box>
        </Box>
    );
}
export default ManageItineraryPage;