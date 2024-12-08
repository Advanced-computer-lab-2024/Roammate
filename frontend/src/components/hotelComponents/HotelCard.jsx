import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Stack, Chip, Button, Divider } from "@mui/material";

function HotelCard({ hotelData }) {
    const {
        name,
        rate_per_night,
        overall_rating,
        amenities,
        check_in_time,
        check_out_time,
        images,
        nearby_places,
    } = hotelData;

    return (
        <Card
            sx={{
                maxWidth: 700,
                width: "100%",
                margin: "auto",
                mb: 3,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >

            {images && images.length > 0 && (
                <img
                    src={images[0].original_image}
                    alt={name}
                    height="200"
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: "4px", // Optional: Add rounded corners like CardMedia
                    }}
                />
            )}

            {/* Hotel Details */}
            <CardContent>
                {/* Hotel Name and Price */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {rate_per_night.lowest} / night
                    </Typography>
                </Stack>

                {/* Check-in and Check-out */}
                <Typography variant="body2" color="text.secondary">
                    Check-in: {check_in_time} | Check-out: {check_out_time}
                </Typography>

                {/* Rating */}
                <Chip
                    label={overall_rating ? `⭐ ${overall_rating.toFixed(1)} Rating` : "No Rating"}
                    color="success"
                    size="small"
                    sx={{ mt: 1, mb: 1 }}
                />

                {/* Amenities */}
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                    Amenities:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {amenities.slice(0, 6).map((amenity, index) => (
                        <Chip key={index} label={amenity} size="small" />
                    ))}
                </Stack>

                {/* Nearby Places */}
                {nearby_places && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                            Nearby Places:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {nearby_places.slice(0, 2).map((place, index) => (
                                <li key={index}>
                                    {place.name}{" "}
                                    {place.transportations &&
                                        `(${place.transportations[0].duration} by ${place.transportations[0].type})`}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Book Now Button */}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary">
                        Book Now
                    </Button>
                </Box>

            </CardContent>
        </Card>
    );
}

export default HotelCard;
