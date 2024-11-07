import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Stack, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightDetails from "./FlightDetails";

function FlightCard({ flightData }) {
    const { itineraries, price, validatingAirlineCodes } = flightData;
    const outbound = itineraries[0];
    const returnFlight = itineraries[1];
    const airline = validatingAirlineCodes[0];
    const [expanded, setExpanded] = useState(false);

    const calculateStops = (itinerary) => itinerary.segments.length - 1;
    const calculateDuration = (itinerary) => {
        const departureTime = new Date(itinerary.segments[0].departure.at);
        const arrivalTime = new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at);
        const durationMs = arrivalTime - departureTime;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{ maxWidth: 700, width: '100%', margin: 'auto', mb: 2, boxShadow: 2, borderRadius: 2 }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                <Box width="100%">
                    {!expanded ? (
                        <Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {outbound.segments[0].departure.iataCode} → {outbound.segments[outbound.segments.length - 1].arrival.iataCode}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    ${price.total}
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption">
                                    Outbound: {calculateStops(outbound)} stop(s), {calculateDuration(outbound)}
                                </Typography>
                                <Typography variant="caption">
                                    Return: {calculateStops(returnFlight)} stop(s), {calculateDuration(returnFlight)}
                                </Typography>
                            </Stack>
                        </Box>
                    ) : (
                        <Box textAlign="center" mb={2}>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                                Round-trip Flight: {outbound.segments[0].departure.iataCode} - {returnFlight.segments[returnFlight.segments.length - 1].arrival.iataCode}
                            </Typography>
                            <Typography color="text.secondary">
                                {airline} - Economy Class
                            </Typography>
                        </Box>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <FlightDetails flightData={flightData} />
            </AccordionDetails>
        </Accordion>
    );
}

export default FlightCard;
