import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress, Select, MenuItem, Grid2, Pagination } from "@mui/material";
import FlightCard from "../../components/flightComponents/FlightCard";
import { fetchFlightBookingsByTouristId } from "../../services/api";
import BookedFlightCard from "../../components/flightComponents/BookedFlightCard";

function TouristBookedFlights() {
    const touristId = localStorage.getItem('userId');


    const [flightData, setFlightData] = useState([]);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noBookings, setNoBookings] = useState(false);
    const flightsPerPage = 10;

    const fetchFlights = async () => {
        setLoading(true);
        try {
            const response = await fetchFlightBookingsByTouristId(touristId);
            setFlightData(response);
            setNoBookings(response.length === 0);
            setCurrentPage(1); // Reset to the first page after new search
        } catch (error) {
            console.error("Error searching for flights:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

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

    return (
        <div>
            {/* Display No Bookings Message */}
            {noBookings && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Box>
                        <h2>No Bookings Found</h2>
                        <p>Looks like you haven't booked any flights yet.</p>
                    </Box>
                </Box>
            )}

            {/* Display Flight Cards */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={3}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    currentFlights.map((flight) => (
                        <React.Fragment key={flight._id}>
                            <BookedFlightCard bookingCode={flight.bookingCode} flightData={flight.flightData} onClick={() => handleCardClick(flight.flightData)} />
                        </React.Fragment>
                    ))
                )}
            </Box>


            {/* Pagination Centered Below the Cards */}
            {flightData.length !== 0 && (
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

export default TouristBookedFlights;