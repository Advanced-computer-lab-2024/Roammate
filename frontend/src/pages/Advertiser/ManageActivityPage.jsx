import React from "react";
import { Avatar, Box, Card, CardContent, CardHeader, CircularProgress, FormControl, InputLabel, MenuItem, Rating, Select, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import EditActivityForm from "../../components/activityComponents/EditActivityForm";
import { calcAdvertiserRevenue } from "../../services/api";

import UsersBarChart from "../../components/sharedComponents/UsersBarChart";


const ManageActivityPage = ({ activity }) => {
    if (!activity) {
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
                justifyContent: 'center',
                alignItems: 'start',
                gap: '50px',
                mt: '20px',

            }}
        >
            <EditActivityForm activity={activity} />

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                gap: '50px',
            }}>
                {/* Reviews Section */}
                <Card elevation={1} sx={{ padding: 2, width: '600px' }}>
                    <Typography variant="h5" gutterBottom>Reviews ({activity.reviews.length})</Typography>

                    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2, gap: 2 }}>
                        {/* Reviews */}

                        {/* <Card sx={{ maxWidth: 300, flexShrink: 0 }}>
                        <CardHeader
                            title={<Rating value={4} precision={0.5} readOnly size="large"
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

                            }}>
                                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                                    A
                                </Avatar>
                                <Typography variant="h5" color="text.secondary" ml={2}>
                                    Ahmed
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                This is a great activity
                            </Typography>
                        </CardContent>
                    </Card> */}

                        {activity.reviews.length > 0 ? (
                            activity.reviews.map((review) => (
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

                {/* Total Users Section */}
                <UsersBarChart activity={activity._id} calcUsers={calcAdvertiserRevenue} />

            </Box >
        </Box >
    );
}

export default ManageActivityPage;