import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import DeletionRequestCard from "../../components/adminComponents/DeletionRequestCard";
import SortAndFilterDeletionRequests from "../../components/adminComponents/SortAndFilterDeletionRequests";
import CachedIcon from "@mui/icons-material/Cached";
import SearchBar from "../../components/touristComponents/SearchBar";
import {
  searchAndFilterDeletionRequestsAdmin,
  approveDeletionRequest,
} from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import AdminViewDeletionRequest from "./AdminViewDeletionRequests";

const AdminDeletionRequestsPage = () => {
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  const [visibleRequests, setVisibleRequests] = useState({
    pending: 5,
    approved: 5,
    denied: 5,
  });
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    fetchDeletionRequests();
    if (id) {
      setActiveButton(null);
    }
  }, [id, fetch]);

  const fetchDeletionRequests = async () => {
    const searchFilterAndSortCriteria = {
      query: searchQuery,
      ...filterAndSortCriteria,
    };
    const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
    const result = await searchAndFilterDeletionRequestsAdmin(queryParameters);
    setDeletionRequests(result);
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await approveDeletionRequest(requestId);
      setFetch((prev) => prev + 1); // Refresh list after approval
    } catch (error) {
      console.error("Error approving deletion request:", error);
    }
  };

  // Separate requests into pending, approved, and denied
  const pendingRequests = deletionRequests.filter(
    (request) => request.status === "pending"
  );
  const approvedRequests = deletionRequests.filter(
    (request) => request.status === "approved"
  );
  const deniedRequests = deletionRequests.filter(
    (request) => request.status === "denied"
  );

  // Function to handle "View More" button click
  const handleViewMore = (category) => {
    setVisibleRequests((prevVisible) => ({
      ...prevVisible,
      [category]: prevVisible[category] + 5,
    }));
  };

  return !id ? (
    <Box>
      {/* Search Bar */}
      {/* <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      /> */}

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Pending Deletion Requests */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ mb: 2, color: "orange" }}>
            Pending Deletion Requests
          </Typography>
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              border: "1px solid orange",
              minHeight: "200px",
              backgroundColor: "#fff3e0",

            }}
          >
            {pendingRequests
              .slice(0, visibleRequests.pending)
              .map((request) => (
                <Box key={request._id} sx={{ mb: 2 }}>
                  <DeletionRequestCard
                    request={request}
                    onApprove={() => handleApproveRequest(request._id)}
                  />
                </Box>
              ))}
            {visibleRequests.pending < pendingRequests.length && (
              <Button onClick={() => handleViewMore("pending")} sx={{ mt: 2 }}>
                View More
              </Button>
            )}
          </Box>
        </Grid>

        {/* Approved Deletion Requests */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ mb: 2, color: "green" }}>
            Approved Deletion Requests
          </Typography>
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              border: "1px solid green",
              minHeight: "200px",
              backgroundColor: "#e0f7fa",
            }}
          >
            {approvedRequests
              .slice(0, visibleRequests.approved)
              .map((request) => (
                <Box key={request._id} sx={{ mb: 2 }}>
                  <DeletionRequestCard request={request} />
                </Box>
              ))}
            {visibleRequests.approved < approvedRequests.length && (
              <Button onClick={() => handleViewMore("approved")} sx={{ mt: 2 }}>
                View More
              </Button>
            )}
          </Box>
        </Grid>

        {/* Denied Deletion Requests */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ mb: 2, color: "red" }}>
            Denied Deletion Requests
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
            {deniedRequests.slice(0, visibleRequests.denied).map((request) => (
              <Box key={request._id} sx={{ mb: 2 }}>
                <DeletionRequestCard request={request} />
              </Box>
            ))}
            {visibleRequests.denied < deniedRequests.length && (
              <Button onClick={() => handleViewMore("denied")} sx={{ mt: 2 }}>
                View More
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <AdminViewDeletionRequest
      request={deletionRequests.find((req) => req._id === id)}
    />
  );
};

export default AdminDeletionRequestsPage;
