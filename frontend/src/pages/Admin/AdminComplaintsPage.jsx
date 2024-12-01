import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import ComplaintCard from "../../components/adminComponents/ComplaintCard";
import SortAndFilterComplaints from "../../components/adminComponents/SortAndFilterComplaints";
import CachedIcon from "@mui/icons-material/Cached";
import SearchBar from "../../components/touristComponents/SearchBar";
import { searchAndFilterComplaintsAdmin } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import AdminViewComplaint from "./AdminViewComplaintsPage";

const AdminComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    fetchComplaints();
    if (id) {
      setActiveButton(null);
    }
  }, [id, fetch]);

  const fetchComplaints = async () => {
    const searchFilterAndSortCriteria = {
      query: searchQuery,
      ...filterAndSortCriteria,
    };
    const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
    const result = await searchAndFilterComplaintsAdmin(queryParameters);
    setComplaints(result);
  };

  return !id ? (
    <Box>
      {/* Search Bar */}
      {/* <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      /> */}

      <Grid2 container spacing={1} sx={{ mt: 3 }}>
        <Grid2 item xs={12} sx={{ flexGrow: 1 }}>
          {/* Complaints List */}
          {complaints.length === 0 &&
            (fetch < 1 ? (
              <CircularProgress />
            ) : (
              <h2>No Complaints Found</h2>
            ))}
          {complaints.map((complaint) => (
            <div key={complaint._id}>
              <ComplaintCard complaint={complaint} />
            </div>
          ))}
        </Grid2>

        <Grid2 item xs={3}>
          {/* Sort and Filter */}
          <SortAndFilterComplaints
            setFilterAndSortCriteria={setFilterAndSortCriteria}
            setFetch={setFetch}
          />
        </Grid2>
      </Grid2>
    </Box>
  ) : (
    <AdminViewComplaint
      complaint={complaints.find((comp) => comp._id === id)}
    />
  );
};

export default AdminComplaintsPage;
