import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ActivityCard from "../../components/advertiserComponents/ActvityCard";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchActivitiesByAdvertiserId } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import ManageActivityPage from "./ManageActivityPage";

const AdvertiserActivitiesPage = ({ id }) => {
  const [activities, setActivities] = useState([]);
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activity_id = queryParams.get("id");

  useEffect(() => {
    const fetchMyActivities = async () => {
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {activities.length === 0 &&
            (fetch < 1 ? (
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            ) : (
              <h2>No Activities Found</h2>
            ))}
        </Grid>

        {activities.map((activity) => (
          <Grid item xs={12} sm={6} key={activity._id}>
            <ActivityCard
              activity={activity}
              setActiveButton={setActiveButton}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <ManageActivityPage
      activity={activities.find((act) => act._id === activity_id)}
    />
  );
};

export default AdvertiserActivitiesPage;
