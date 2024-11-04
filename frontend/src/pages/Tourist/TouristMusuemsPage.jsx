import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MuseumCard from "../../components/touristComponents/MusuemCard";
import SortAndFilterMuseums from "../../components/touristComponents/SortAndFilterMusuems";
import CachedIcon from "@mui/icons-material/Cached";
import SearchBar from "../../components/touristComponents/SearchBar";
import { searchAndFilterMonuments } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import TouristViewMuseum from "./TouristViewMusuemPage";

const TouristMuseumsPage = () => {
  const [museums, setMuseums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    fetchMuseums();
    if (id) {
      setActiveButton(null);
    }
  }, [id, fetch]);

  const fetchMuseums = async () => {
    const searchFilterAndSortCriteria = {
      query: searchQuery,
      ...filterAndSortCriteria,
    };
    const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
    const result = await searchAndFilterMonuments(queryParameters);
    setMuseums(result);
  };

  return !id ? (
    <Box>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      />

      <Grid2 container spacing={1}>
        <Grid2 item xs={12} sx={{ flexGrow: 1 }}>
          {museums.length === 0 &&
            (fetch < 1 ? (
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            ) : (
              <h2>No Museums Found</h2>
            ))}
          {museums.map((museum) => (
            <div key={museum._id}>
              <MuseumCard museum={museum} />
            </div>
          ))}
        </Grid2>
        <SortAndFilterMuseums
          setFilterAndSortCriteria={setFilterAndSortCriteria}
          setFetch={setFetch}
        />
      </Grid2>
    </Box>
  ) : (
    <TouristViewMuseum museum={museums.find((mus) => mus._id === id)} />
  );
};

export default TouristMuseumsPage;
