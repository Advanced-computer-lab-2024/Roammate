import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress, Grid, Pagination } from "@mui/material";
import HotelCard from "../../components/hotelComponents/HotelCard";
import { fetchHotels } from "../../services/api";

function TouristBookHotelsPage() {
    const [location, setLocation] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [hotelData, setHotelData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noHotels, setNoHotels] = useState(false);

    const hotelsPerPage = 10;

    const handleSearch = async () => {
        setLoading(true);
        setNoHotels(false);

        try {
            const hotels = await fetchHotels(location, checkInDate, checkOutDate, guests);
            console.log("Hotels:", hotels);
            if (hotels && hotels.length > 0) {
                setHotelData(hotels);
                setCurrentPage(1); // Reset pagination
            } else {
                setNoHotels(true);
            }
        } catch (error) {
            console.error("Error fetching hotels:", error);
            setNoHotels(true);
        } finally {
            setLoading(false);
        }
    };

    // Pagination Logic
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = hotelData.slice(indexOfFirstHotel, indexOfLastHotel);

    const handlePageChange = (event, value) => setCurrentPage(value);

    const isFormComplete = location && checkInDate && checkOutDate && guests;

    return (
        <div>
            {/* Inputs for Hotel Search */}
            <Box display="flex" flexDirection="column" alignItems="center" mt={3} width="100%">
                <Grid container spacing={2} maxWidth="600px">
                    <Grid item xs={6}>
                        <TextField
                            label="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Check-in Date"
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Check-out Date"
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Guests"
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            fullWidth
                            disabled={!isFormComplete}
                        >
                            Search Hotels
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* No Hotels Found */}
            {noHotels && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <h2>No Hotels Found</h2>
                </Box>
            )}

            {/* Loading Indicator */}
            {loading && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                </Box>
            )}

            {/* Hotel Cards */}
            {hotelData && <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={3}>
                {currentHotels.map((hotel, index) => (
                    <HotelCard key={index} hotelData={hotel} />
                ))}
            </Box>}

            {/* Pagination */}
            {hotelData.length > 0 && (
                <Box mt={3} display="flex" justifyContent="center">
                    <Pagination
                        count={Math.ceil(hotelData.length / hotelsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </div>
    );
}

export default TouristBookHotelsPage;
