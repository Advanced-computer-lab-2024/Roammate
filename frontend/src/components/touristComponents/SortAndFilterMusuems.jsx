import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  fetchAllMonumentTags,
  fetchAllPreferenceTags,
} from "../../services/api";

const sortParams = ["name"]; // Adjusted sort parameters to reflect relevant options

const SortAndFilterMuseums = ({ setFilterAndSortCriteria, setFetch }) => {
  const [selectedMonumentTags, setSelectedMonumentTags] = useState([]);
  const [selectedPreferenceTags, setSelectedPreferenceTags] = useState([]);
  const [sortParam, setSortParam] = useState("name"); // Adjusted default sort parameter
  const [isAscending, setIsAscending] = useState(true);
  const [allAvailableMonumentTags, setAllAvailableMonumentTags] = useState([]);
  const [allAvailablePreferenceTags, setAllAvailablePreferenceTags] = useState(
    []
  );

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const monumentTags = await fetchAllMonumentTags();
        const preferenceTags = await fetchAllPreferenceTags();
        setAllAvailableMonumentTags(monumentTags);
        setAllAvailablePreferenceTags(preferenceTags);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTags();
  }, []);

  const handleMonumentTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMonumentTags(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handlePreferenceTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPreferenceTags(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSortOrderChange = () => {
    setIsAscending(!isAscending);
  };

  const handleApplyFilters = () => {
    const filterCriteria = {
      monumentTags: allAvailableMonumentTags
        .filter((tag) => selectedMonumentTags.includes(tag.name))
        .map((tag) => tag._id),
      tags: allAvailablePreferenceTags
        .filter((tag) => selectedPreferenceTags.includes(tag.name))
        .map((tag) => tag._id),
      order: isAscending ? sortParam : `-${sortParam}`,
    };
    setFilterAndSortCriteria(filterCriteria);
    setFetch((prev) => prev + 1);
  };

  return (
    <Grid
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
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* <SortIcon sx={{ ml: "10px", fontSize: "30px" }} /> */}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Sort
        </Typography>
      </Box>
      <Box>
        {sortParams.map((param, index) => (
          <Button
            key={index}
            onClick={() => setSortParam(sortParam === param ? "" : param)}
            sx={{
              borderBottom:
                sortParam === param ? "3px solid lightgreen" : "default",
            }}
          >
            {param}
          </Button>
        ))}
      </Box>
      <FormControlLabel
        control={
          <IconButton onClick={handleSortOrderChange}>
            <SwapVertIcon />
          </IconButton>
        }
        label={isAscending ? "Ascending" : "Descending"}
      />

      <Divider sx={{ mt: "20px", mb: "20px", width: "100%" }} />

      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Filter
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "200px",
          gap: "10px",
        }}
      >
        {/* Monument Tags */}
        <InputLabel>Monument Tags</InputLabel>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel>Choose</InputLabel>
          <Select
            multiple
            value={selectedMonumentTags}
            onChange={handleMonumentTagChange}
            input={<OutlinedInput label="Choose" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allAvailableMonumentTags.map((tag) => (
              <MenuItem key={tag._id} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Preference Tags */}
        <InputLabel>Preference Tags</InputLabel>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel>Choose</InputLabel>
          <Select
            multiple
            value={selectedPreferenceTags}
            onChange={handlePreferenceTagChange}
            input={<OutlinedInput label="Choose" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allAvailablePreferenceTags.map((tag) => (
              <MenuItem key={tag._id} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>

      <Button
        variant="contained"
        sx={{ mt: "20px", width: "100%" }}
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Grid>
  );
};

export default SortAndFilterMuseums;
