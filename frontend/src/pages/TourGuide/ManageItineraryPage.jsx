import { Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Rating, Typography } from "@mui/material";
import EditItineraryForm from "../../components/itineraryComponents/EditItineraryForm";
import StarIcon from '@mui/icons-material/Star';

const ManageItineraryPage = ({ itinerary }) => {
    if (!itinerary) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '50px',
                mt: '20px',
                width: '100%'

            }}
        >
            <EditItineraryForm itinerary={itinerary} />

            {/* Reviews Section */}
            <Card elevation={3} sx={{ padding: 2, width: '600px' }}>
                <Typography variant="h5" gutterBottom>Reviews ({itinerary.reviews.length})</Typography>

                <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2, gap: 2 }}>
                    {/* Reviews */}
                    {itinerary.reviews.length > 0 ? (
                        itinerary.reviews.map((review) => (
                            <Card key={review._id} sx={{ maxWidth: 300, flexShrink: 0 }}>
                                <CardHeader
                                    title={<Rating value={review.rating} precision={0.5} readOnly size="large"
                                        icon={<StarIcon style={{ fill: 'gray' }} fontSize="large" />}
                                        emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />} />}
                                />
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    textAlign: 'left',
                                    padding: 2,
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 2
                                    }}>

                                        <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                                            {review.user.username.charAt(0)}
                                        </Avatar>
                                        <Typography variant="h5" color="text.secondary" ml={2}>
                                            {review.user.username}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.comment}
                                    </Typography>
                                </CardContent>
                            </Card>

                        ))) : (
                        <Typography variant="body1" sx={{ color: 'gray' }}>No reviews yet</Typography>
                    )}
                </Box>
            </Card>

        </Box>
    );
}
export default ManageItineraryPage;