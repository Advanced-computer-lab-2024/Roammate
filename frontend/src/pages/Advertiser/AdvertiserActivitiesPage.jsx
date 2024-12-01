import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import ActivityCard from "../../components/advertiserComponents/ActvityCard";
import { fetchActivitiesByAdvertiserId } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import ManageActivityPage from "./ManageActivityPage";

const AdvertiserActivitiesPage = () => {
  const id = localStorage.getItem("userId");
  const [activities, setActivities] = useState([]);
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activity_id = queryParams.get("id");

  useEffect(() => {

    setFetch(0);
    const fetchMyActivities = async () => {
      setActivities([]);
      const result = await fetchActivitiesByAdvertiserId(id);
      setActivities(result);
      setFetch(fetch + 1);
    };
    try {
      fetchMyActivities();
    } catch (err) {
      console.log(err);
    }
    if (activity_id) {
      setActiveButton(null);
    }
  }, [activity_id]);



  return !activity_id ? (
    <Box>
      <Grid2 >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
          {activities.length === 0 &&
            (fetch < 1 ? (
              <CircularProgress />
            ) : (
              <h2>No Activities Found</h2>
            ))}
        </Box>


        {activities.map((activity) => (
          <Grid2 xs={12} sm={6} key={activity._id}>
            <ActivityCard
              activity={activity}
              setActiveButton={setActiveButton}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  ) : (
    <ManageActivityPage
      activity={activities.find((act) => act._id === activity_id)}
    />
  );
};

export default AdvertiserActivitiesPage;
