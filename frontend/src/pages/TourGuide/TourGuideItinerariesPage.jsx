import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import { fetchItinerariesByTourGuideId } from "../../services/api";
import ItineraryCard from "../../components/tourGuideComponents/ItineraryCard";
import { useLocation, useOutletContext } from "react-router";
import ManageItineraryPage from "./ManageItineraryPage";

const TourGuideItinerariesPage = () => {
  const id = localStorage.getItem("userId");


  const [itineraries, setItineraries] = useState([]);
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itinerary_id = queryParams.get("id");

  useEffect(() => {
    setItineraries([]);
    setFetch(0);
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
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

    }}>

      {itineraries.length === 0 &&
        (fetch < 1 ? (
          <CircularProgress />
        ) : (
          <h2>No Itineraries Found</h2>
        ))}


      {itineraries.map((itinerary) => (

        <ItineraryCard
          key={itinerary._id}
          itinerary={itinerary} />

      ))}

    </Box>
  ) : (
    <ManageItineraryPage
      itinerary={itineraries.find((it) => it._id === itinerary_id)}
    />
  );
};

export default TourGuideItinerariesPage;
