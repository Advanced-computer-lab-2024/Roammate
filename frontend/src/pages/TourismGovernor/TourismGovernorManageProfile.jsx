import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ChangePasswordComponent from "../../components/sharedComponents/ChangePasswordComponent";
import {
  fetchTourismGovernorProfile,
  updateTourismGovernorProfile,
} from "../../services/api";

const TourismGovernorManageProfile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchTourismGovernor = async () => {
      try {
        const data = await fetchTourismGovernorProfile(id);
        setUsername(data.username);
        setRole(data.role);
        setRegion(data.region);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTourismGovernor();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const governor = { username };
    try {
      await updateTourismGovernorProfile(id, governor);
      setDisabled(true);
      setEdit(false);
    } catch (error) {
      setErr("Failed to update profile! Error: " + error.message);
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3 }}>
      {/* Profile Form Section */}
      <Box sx={{ width: "70%" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "15px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            Tourism Governor Profile
          </Typography>

          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={disabled}
            variant="standard"
            sx={{ width: "100%" }}
          />
          <TextField
            label="Role"
            type="text"
            value={role}
            disabled
            variant="standard"
            sx={{ width: "100%" }}
          />

          {err && <Typography sx={{ color: "red" }}>{err}</Typography>}

          {!edit && (
            <Button
              variant="contained"
              onClick={() => {
                setDisabled(false);
                setEdit(true);
              }}
              sx={{ color: "white", width: "100%" }}
            >
              Edit
            </Button>
          )}

          {edit && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white", width: "100%" }}
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setDisabled(true);
                  setEdit(false);
                }}
                sx={{ backgroundColor: "red", color: "white", width: "100%" }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </form>
      </Box>

      {/* Change Password Component on the Right */}
      <Box
        sx={{
          width: "30%",
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Change Password
        </Typography>
        <ChangePasswordComponent id={id} type="tourismGovernor" />
      </Box>
    </Box>
  );
};

export default TourismGovernorManageProfile;
