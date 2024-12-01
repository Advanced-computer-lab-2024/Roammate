import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { getAllItineraries } from "../../services/api";
import SearchBar from "../../components/touristComponents/SearchBar";
import AdminItineraryCard from "../../components/adminComponents/AdminItineraryCard";
import SortAndFilterItineraries from "../../components/touristComponents/SortAndFilterItineraries";
import { useLocation, useOutletContext } from "react-router";
import AdminViewItinerary from "./AdminViewItineraryPage";

const AdminItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    fetchItineraries();
    if (id) {
      setActiveButton(null);
    }
  }, [id, fetch]);

  const fetchItineraries = async () => {
    const result = await getAllItineraries();
    setItineraries(result);
    setFetch(fetch + 1);
  };

  // Separate itineraries into appropriate and inappropriate lists
  const inappropriateItineraries = itineraries.filter(
    (itinerary) => !itinerary.Appropriate
  );

  const appropriateItineraries = itineraries.filter(
    (itinerary) => itinerary.Appropriate
  );

  // Callback function to update itinerary status
  const updateItineraryStatus = useCallback(
    (updatedItinerary) => {
      setItineraries((prevItineraries) =>
        prevItineraries.map((itinerary) =>
          itinerary._id === updatedItinerary._id ? updatedItinerary : itinerary
        )
      );
    },
    [setItineraries]
  );

  return !id ? (
    <Box>
      {/* All Itineraries */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 4, color: 'grey' }}>
          All Itineraries
        </Typography>

        {appropriateItineraries.length === 0 && fetch < 1 ? (
          <CircularProgress />
        ) : (
          appropriateItineraries.map((itinerary) => (

            <AdminItineraryCard
              itinerary={itinerary}
              onStatusChange={updateItineraryStatus}
            />

          ))
        )}
        {itineraries.length === 0 && fetch >= 1 && (
          <Typography>No Itineraries Found</Typography>
        )}

      </Box>

      {/* Inappropriate Itineraries */}
      <Box >
        <Typography variant="h5" sx={{ mb: 2, color: "red" }}>
          Inappropriate Itineraries
        </Typography>
        <Box
          sx={{
            padding: 2,
            borderRadius: 2,
            border: "1px solid red",
            minHeight: "200px",
            backgroundColor: "#fdecea",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {inappropriateItineraries.length === 0 && fetch < 1 ? (
            <CircularProgress />
          ) : (
            inappropriateItineraries.map((itinerary) => (
              <Box key={itinerary._id} sx={{ mb: 2 }}>
                <AdminItineraryCard
                  itinerary={itinerary}
                  onStatusChange={updateItineraryStatus}
                />
              </Box>
            ))
          )}
          {inappropriateItineraries.length === 0 && fetch >= 1 && (
            <Typography variant="h5" color="grey">No Inappropriate Itineraries Found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  ) : (
    <AdminViewItinerary id={id} />
  );
};

export default AdminItinerariesPage;
