import React, { useState } from "react";
import { Typography, Box, Divider, Stack, Chip, Button, Alert } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";

function BookedFlightDetails({ bookingCode, flightData }) {
    const { itineraries, price } = flightData;

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            {/* Price and Luggage Information */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="body1" color="text.primary">
                    Total Price: {price.total} {price.currency}
                </Typography>
                <Chip label="Included Bags: 1" icon={<LuggageIcon />} variant="outlined" color="primary" />
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Itinerary Details */}
            {itineraries.map((itinerary, itineraryIndex) => (
                <Box key={itineraryIndex} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        {itineraryIndex === 0 ? "Outbound Flight" : "Return Flight"}
                    </Typography>
                    {itinerary.segments.map((segment, segmentIndex) => (
                        <Box key={segmentIndex} mb={2}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                                <Box>
                                    <Typography>{segment.departure.iataCode} - Terminal {segment.departure.terminal}</Typography>
                                    <Typography color="text.secondary">
                                        {new Date(segment.departure.at).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                                <Box>
                                    <Typography>{segment.arrival.iataCode} - Terminal {segment.arrival.terminal}</Typography>
                                    <Typography color="text.secondary">
                                        {new Date(segment.arrival.at).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Flight {segment.carrierCode} {segment.number} · Aircraft: {segment.aircraft.code} · Non-stop
                            </Typography>

                        </Box>
                    ))}
                    {itineraryIndex < itineraries.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
            ))}

            {/* Show the booking code */}
            <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
                    Booking Code: {bookingCode}
                </Typography>
            </Alert>

        </Box>
    );
}

export default BookedFlightDetails;
