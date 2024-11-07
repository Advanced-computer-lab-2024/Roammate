import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AdminActivityCard from "../../components/adminComponents/ActivityCard";
import SortAndFilterActivities from "../../components/touristComponents/SortAndFilterActivities";
import SearchBar from "../../components/touristComponents/SearchBar";
import { getAllActivities } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import AdminViewActivity from "./AdminViewActivityPage";

const AdminActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    fetchActivities();
    if (id) {
      setActiveButton(null);
    }
  }, [id, fetch]);

  const fetchActivities = async () => {
    const result = await getAllActivities();
    setActivities(result);
  };

  // Separate activities into appropriate and inappropriate lists
  const inappropriateActivities = activities.filter(
    (activity) => !activity.Appropriate
  );
  const appropriateActivities = activities.filter(
    (activity) => activity.Appropriate
  );

  // Callback function to update activity status
  const updateActivityStatus = useCallback(
    (updatedActivity) => {
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === updatedActivity._id ? updatedActivity : activity
        )
      );
    },
    [setActivities]
  );

  return !id ? (
    <Box>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      />

      {/* Sort and Filter */}
      {/* <SortAndFilterActivities
        setFilterAndSortCriteria={setFilterAndSortCriteria}
        setFetch={setFetch}
      /> */}

      {/* All Activities */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Activities
        </Typography>
        <Grid container spacing={2}>
          {appropriateActivities.length === 0 && fetch < 1 ? (
            <h2>
              Loading
              <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
            </h2>
          ) : (
            appropriateActivities.map((activity) => (
              <Grid item xs={12} md={6} key={activity._id}>
                <AdminActivityCard
                  activity={activity}
                  onStatusChange={updateActivityStatus}
                />
              </Grid>
            ))
          )}
          {activities.length === 0 && fetch >= 1 && (
            <Typography>No Activities Found</Typography>
          )}
        </Grid>
      </Box>

      {/* Inappropriate Activities */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "red" }}>
          Inappropriate Activities
        </Typography>
        <Box
          sx={{
            padding: 2,
            borderRadius: 2,
            border: "1px solid red",
            minHeight: "200px",
            backgroundColor: "#fdecea",
          }}
        >
          {inappropriateActivities.length === 0 && fetch < 1 ? (
            <h2>
              Empty!
              <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
            </h2>
          ) : (
            inappropriateActivities.map((activity) => (
              <Box key={activity._id} sx={{ mb: 2 }}>
                <AdminActivityCard
                  activity={activity}
                  onStatusChange={updateActivityStatus}
                />
              </Box>
            ))
          )}
          {inappropriateActivities.length === 0 && fetch >= 1 && (
            <Typography>No Inappropriate Activities Found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  ) : (
    <AdminViewActivity activity={activities.find((act) => act._id === id)} />
  );
};

export default AdminActivitiesPage;
