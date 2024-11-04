import React, { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
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

  return !id ? (
    <Box>
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      />

      <Grid2 container spacing={1}>
        <Grid2 item xs={12} sx={{ flexGrow: 1 }}>
          {/* Deletion Requests List */}
          {deletionRequests.length === 0 &&
            (fetch < 1 ? (
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            ) : (
              <h2>No Deletion Requests Found</h2>
            ))}
          {deletionRequests.map((request) => (
            <div key={request._id}>
              <DeletionRequestCard
                request={request}
                onApprove={() => handleApproveRequest(request._id)}
              />
            </div>
          ))}
        </Grid2>

        <Grid2 item xs={3}>
          {/* Sort and Filter */}
          <SortAndFilterDeletionRequests
            setFilterAndSortCriteria={setFilterAndSortCriteria}
            setFetch={setFetch}
          />
        </Grid2>
      </Grid2>
    </Box>
  ) : (
    <AdminViewDeletionRequest
      request={deletionRequests.find((req) => req._id === id)}
    />
  );
};

export default AdminDeletionRequestsPage;
