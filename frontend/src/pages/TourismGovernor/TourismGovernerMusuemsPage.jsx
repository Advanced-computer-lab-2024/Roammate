import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MuseumCard from "../../components/tourismGovernorComponents/MusuemCard";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchMusuemsByTourismGovernorId } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import ManageMuseumPage from "./ManageMusuemPage";
import CircularProgress from "@mui/material/CircularProgress";
const TourismGovernorMuseumsPage = () => {
  const id = localStorage.getItem("userId");


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
  }, [museum_id, id]);

  return !museum_id ? (
    <Box sx={{
      mt: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sx={{ flexGrow: 1 }}>
          {museums.length === 0 &&
            (fetch < 1 ? (
              <CircularProgress />
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
