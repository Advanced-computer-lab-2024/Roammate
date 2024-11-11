import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Grid2 } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchItinerariesByTourGuideId } from "../../services/api";
import ItineraryCard from "../../components/tourGuideComponents/ItineraryCard";
import { useLocation, useOutletContext } from "react-router";
import ManageItineraryPage from "./ManageItineraryPage";

const TourGuideItinerariesPage = ({ id }) => {
  const [itineraries, setItineraries] = useState([]);
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itinerary_id = queryParams.get("id");

  useEffect(() => {
    const fetchMyItineraries = async () => {
      const result = await fetchItinerariesByTourGuideId(id);
      setItineraries(result);
      setFetch(fetch + 1);
    };
    try {
      fetchMyItineraries();
    } catch (err) {
      console.log(err);
    }
    if (itinerary_id) {
      setActiveButton(null);
    }
  }, [itinerary_id]);

  return !itinerary_id ? (
    <Box>
      <Grid2 spacing={2}>
        <Grid2 xs={12}>
          {itineraries.length === 0 &&
            (fetch < 1 ? (
              <CircularProgress />
            ) : (
              <h2>No Itineraries Found</h2>
            ))}
        </Grid2>

        {itineraries.map((itinerary) => (
          <Grid2 item xs={12} sm={6} key={itinerary._id}>
            <ItineraryCard itinerary={itinerary} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  ) : (
    <ManageItineraryPage
      itinerary={itineraries.find((it) => it._id === itinerary_id)}
    />
  );
};

export default TourGuideItinerariesPage;
