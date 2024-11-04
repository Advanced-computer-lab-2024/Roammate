import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MuseumCard from "../../components/touristGovernerComponents/MusuemCard";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchMusuemsByTourismGovernorId } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import ManageMuseumPage from "./ManageMusuemPage";

const TourismGovernorMuseumsPage = ({ id }) => {
  const [museums, setMuseums] = useState([]);
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const museum_id = queryParams.get("id");

  useEffect(() => {
    const fetchMyMuseums = async () => {
      try {
        const result = await fetchMusuemsByTourismGovernorId(id);
        setMuseums(result);
        setFetch(fetch + 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMyMuseums();

    if (museum_id) {
      setActiveButton(null);
    }
  }, [museum_id, fetch, id, setActiveButton]);

  return !museum_id ? (
    <Box>
      <Grid2 container spacing={2}>
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
              <MuseumCard museum={museum} setActiveButton={setActiveButton} />
            </div>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  ) : (
    <ManageMuseumPage museum={museums.find((mus) => mus._id === museum_id)} />
  );
};

export default TourismGovernorMuseumsPage;
