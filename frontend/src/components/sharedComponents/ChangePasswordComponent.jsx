import React, { useState } from "react";
import { Box, Button, TextField, Typography, Snackbar } from "@mui/material";
import { changePassword } from "../../services/api"; // assume this is a function in your API service file

const ChangePasswordComponent = ({ id, type }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const response = await changePassword(id, type, oldPassword, newPassword);
      if (response.status === 200) {
        setSuccess(true);
        setOpen(true);
        setIsChanging(false);
      } else {
        throw new Error(
          "Failed to change password. Please check the old password."
        );
      }
    } catch (err) {
      setError(err.message);
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Button
        variant="contained"
        onClick={() => setIsChanging(true)}
        sx={{ color: "white", width: "100%" }}
      >
        Change Password
      </Button>

      {isChanging && (
        <>
          <TextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            variant="standard"
            sx={{ width: "100%" }}
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="standard"
            sx={{ width: "100%" }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="standard"
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            onClick={handlePasswordChange}
            sx={{ backgroundColor: "green", color: "white", width: "100%" }}
          >
            Save New Password
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsChanging(false)}
            sx={{ backgroundColor: "red", color: "white", width: "100%" }}
          >
            Cancel
          </Button>
        </>
      )}

      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={success ? "Password changed successfully!" : error}
      />
    </Box>
  );
};

export default ChangePasswordComponent;
