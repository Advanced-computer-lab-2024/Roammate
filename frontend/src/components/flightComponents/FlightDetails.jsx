import React, { useState } from "react";
import { Typography, Box, Divider, Stack, Chip, Button, Alert } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";

function FlightDetails({ flightData }) {
    const { itineraries, price, validatingAirlineCodes } = flightData;
    const [flightBooked, setFlightBooked] = useState(false);
    const [bookedFlightCode, setBookedFlightCode] = useState(null);

    const handleBookFlight = () => {
        setFlightBooked(true);
        setBookedFlightCode(Math.random().toString(36).substring(5).toUpperCase());
    }

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
            {/* book the flight button */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleBookFlight()}
                fullWidth
                disabled={flightBooked}
                sx={{ mt: 2 }}
            >
                Book Flight
            </Button>

            {flightBooked && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Flight Booked Successfully! Your Booking Reference Code: {bookedFlightCode}
                </Alert>
            )}

        </Box>
    );
}

export default FlightDetails;
