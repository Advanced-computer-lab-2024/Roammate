import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ChangePasswordComponent from "../../components/sharedComponents/ChangePasswordComponent";

import { fetchAdminProfile, updateAdminProfile } from "../../services/api";

const AdminManageProfile = () => {
  const id = localStorage.getItem("userId");


  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await fetchAdminProfile(id);
        setUsername(data.username);
        setRole(data.role);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const admin = { username };
    try {
      await updateAdminProfile(id, admin);
      setDisabled(true);
      setEdit(false);
    } catch (error) {
      setErr("Failed to update profile! Error: " + error.message);
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3, flexDirection: 'column' }}>
      {/* Profile Form Section */}
      <Box sx={{ width: "500px" }}>
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
            Admin Profile
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
          width: "500px",
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        {/* <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Change Password
        </Typography> */}
        <ChangePasswordComponent id={id} type="admin" />
      </Box>
    </Box>
  );
};

export default AdminManageProfile;
