import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
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
  }, [id]);

  const fetchActivities = async () => {
    const result = await getAllActivities();
    setActivities(result);
    setFetch(fetch + 1);
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
      {/* <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      /> */}

      {/* Sort and Filter */}
      {/* <SortAndFilterActivities
        setFilterAndSortCriteria={setFilterAndSortCriteria}
        setFetch={setFetch}
      /> */}

      {/* All Activities */}
      <Box sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Typography variant="h5" sx={{ mb: 4, color: 'grey' }}>
          All Activities
        </Typography>
        {appropriateActivities.length === 0 && fetch < 1 ? (
          <CircularProgress />
        ) : (
          appropriateActivities.map((activity) => (
            <AdminActivityCard
              activity={activity}
              onStatusChange={updateActivityStatus}
            />
          ))
        )}
        {activities.length === 0 && fetch >= 1 && (
          <Typography>No Activities Found</Typography>
        )}
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {inappropriateActivities.length === 0 && fetch < 1 ? (
            <CircularProgress />
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
            <Typography variant="h5" color="grey">No Inappropriate Activities Found</Typography>
          )}
        </Box>
      </Box>
    </Box >
  ) : (
    <AdminViewActivity id={id} />
  );
};

export default AdminActivitiesPage;
