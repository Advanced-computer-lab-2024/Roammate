import React, { useState, useEffect } from "react";
import { Box, Divider, Grid2, Typography } from "@mui/material";
import ComplaintCard from "../../components/touristComponents/ComplaintCard";
import SortAndFilterComplaints from "../../components/touristComponents/SortAndFilterComplaints";
import CachedIcon from "@mui/icons-material/Cached";
import SearchBar from "../../components/touristComponents/SearchBar";
import { searchAndFilterComplaints } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import TouristViewComplaint from "./ToruistViewComplaintPage";
import PostComplaintForm from "./CreateComplaintComponent";

const TouristComplaintsPage = () => {
  const touristId = localStorage.getItem("userId");


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
    const result = await searchAndFilterComplaints(queryParameters, touristId);
    setComplaints(result);
  };

  return !id ? (
    <Box>
      {/* 
      <Typography variant="h4" sx={{ mt: 2, mb: 2, ml: 3, color: 'text.secondary' }}>
        My Complaints
      </Typography> */}

      {/* Search Bar */}
      {/* <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      /> */}

      <Grid2 container spacing={1} sx={{
        mt: 3,
      }}>
        <Grid2 item xs={12} sx={{ flexGrow: 1 }}>
          {/* Post Complaint Form (Compact) */}
          <Box sx={{
            width: '100%',
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            mb: 5
          }}>
            <PostComplaintForm
              touristId={touristId}
              onComplaintPosted={() => setFetch((prev) => prev + 1)}
            />
          </Box>

          {/* Complaints List */}
          {complaints.length === 0 &&
            (fetch < 1 ? (
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            ) : (
              <h2>No Complaints Found</h2>
            ))}
          {complaints.map((complaint) => (
            <div key={complaint._id}>
              <ComplaintCard complaint={complaint} />
            </div>
          ))}
        </Grid2>

        <Grid2 item xs={3} sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
        }}>
          {/* Sort and Filter */}
          <SortAndFilterComplaints
            setFilterAndSortCriteria={setFilterAndSortCriteria}
            setFetch={setFetch}
          />


        </Grid2>
      </Grid2>




    </Box>
  ) : (
    <TouristViewComplaint
      complaint={complaints.find((comp) => comp._id === id)}
    />
  );
};

export default TouristComplaintsPage;
