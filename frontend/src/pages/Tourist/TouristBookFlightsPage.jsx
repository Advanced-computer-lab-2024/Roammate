import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress, Select, MenuItem, Grid2, Pagination } from "@mui/material";
import FlightCard from "../../components/flightComponents/FlightCard";
import { searchFlights } from "../../services/api";
import FlightDetails from "../../components/flightComponents/FlightDetails";

function TouristBookFlightsPage() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [flightData, setFlightData] = useState([]);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noFlights, setNoFlights] = useState(false);
    const flightsPerPage = 10;

    const fetchFlights = async () => {
        setLoading(true);
        try {
            setNoFlights(false);
            const response = await searchFlights(origin, destination, departureDate, returnDate, passengers);
            setNoFlights(response.data.length === 0);
            setFlightData(response.data);
            setCurrentPage(1); // Reset to the first page after new search
        } catch (error) {
            setNoFlights(true);
            console.error("Error searching for flights:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate the flights to display on the current page
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flightData.slice(indexOfFirstFlight, indexOfLastFlight);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCardClick = (flight) => {
        setSelectedFlightId(flight.id === selectedFlightId ? null : flight.id); // Toggle selection
    };

    const isFormComplete = origin && destination && departureDate && passengers;

    return (
        <div>
            {/* Inputs for Search Parameters */}
            <Box display="flex" flexDirection="column" alignItems="center" mt={3} width="100%">
                <Grid2 container spacing={2} maxWidth="600px">
                    <Grid2 xs={6}>
                        <TextField
                            label="Origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            label="Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            label="Departure Date"
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            label="Return Date"
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField
                            id="outlined-number"
                            label="Passengers"
                            type="number"
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            variant="outlined"
                            margin="dense"
                            InputProps={{
                                inputProps: { min: 1, max: 9 },
                            }}
                            InputLabelProps={{ shrink: true }}
                            style={{ width: "120px" }} // Adjust the width as needed
                        />

                    </Grid2>
                    <Grid2 xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchFlights}
                            fullWidth
                            style={{ height: "100%" }}
                            disabled={!isFormComplete}
                        >
                            Search Flights
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>

            {/* Display No Flights Found Message */}
            {noFlights && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Box>
                        <h2>No Flights Found</h2>
                        <p>Looks like there are no flights available for the selected criteria.</p>
                    </Box>
                </Box>
            )}

            {/* Display Flight Cards */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={3}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    currentFlights.map((flight) => (
                        <React.Fragment key={flight.id}>
                            <FlightCard flightData={flight} onClick={() => handleCardClick(flight)} />

                            {/* Show Flight Details below the selected flight */}
                            {selectedFlightId === flight.id && (
                                <FlightDetails
                                    flightData={flight}
                                    onClose={() => setSelectedFlightId(null)}
                                />
                            )}
                        </React.Fragment>
                    ))
                )}
            </Box>


            {/* Pagination Centered Below the Cards */}
            {
                flightData.length !== 0 && (
                    <Box mt={3} display="flex" justifyContent="center">
                        <Pagination
                            count={Math.ceil(flightData.length / flightsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>)}
        </div>
    );
}

export default TouristBookFlightsPage;
