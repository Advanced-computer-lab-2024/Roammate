import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const SortAndFilterComplaints = ({ setFilterAndSortCriteria, setFetch }) => {
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSortOrderChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleApplyFilters = () => {
    const filterCriteria = {
      sort: sortOrder === "asc" ? "date" : "-date",
    };
    if (status !== "All") {
      filterCriteria.status = status;
    }
    setFilterAndSortCriteria(filterCriteria);
    setFetch((prev) => prev + 1);
  };

  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "250px",
        gap: "10px",
        border: "1px solid #e0e0e0",
        height: "fit-content",
        borderRadius: "5px",
        padding: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* <SortIcon sx={{ ml: "10px", fontSize: "30px" }} /> */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Sort
        </Typography>
      </Box>

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography>Order:</Typography>
        <IconButton onClick={handleSortOrderChange}>
          <SwapVertIcon />
        </IconButton>
        <Typography>
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Typography>
      </FormControl>

      <Divider sx={{ mt: "20px", mb: "20px", width: "100%" }} />

      <Button
        variant="contained"
        sx={{ mt: "20px", width: "100%" }}
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Grid2>
  );
};

export default SortAndFilterComplaints;
