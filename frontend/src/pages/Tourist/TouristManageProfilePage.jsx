import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { fetchTouristProfile, updateTouristProfile } from "../../services/api";
import dayjs from "dayjs";
import ChangePasswordComponent from "../../components/sharedComponents/ChangePasswordComponent";
import DeleteProfileRequest from "../../components/sharedComponents/DeleteProfileRequestComponent";

const DATE_FORMAT = "DD/MM/YYYY";

const TouristManageProfile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nationality, setNationality] = useState("");
  const [DOB, setDOB] = useState("");
  const [job, setJob] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchTourist = async () => {
      try {
        const data = await fetchTouristProfile(id);
        setUsername(data.username);
        setEmail(data.email);
        setMobile(data.mobile);
        setNationality(data.nationality);
        setDOB(dayjs(data.DOB).format(DATE_FORMAT));
        setJob(data.job);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTourist();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tourist = { email, mobile, nationality, job };

    try {
      await updateTouristProfile(id, tourist);
      setDisabled(true);
      setEdit(false);
    } catch (error) {
      setErr("Failed to update profile! Error: " + error.message);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Profile Management Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "50%",
          gap: "15px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
          Manage Profile
        </Typography>

        <TextField
          label="Username"
          type="text"
          value={username}
          disabled
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          label="Mobile"
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={disabled}
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          label="Nationality"
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          disabled={disabled}
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          label="Date of Birth"
          type="text"
          value={DOB}
          disabled
          variant="standard"
          sx={{ width: "100%" }}
        />
        <TextField
          label="Job"
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          disabled={disabled}
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
      </Box>

      {/* Change Password Component on the Right */}
      <Box
        sx={{
          width: "50%",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Change Password
        </Typography>
        <ChangePasswordComponent id={id} type="tourist" />
        <Divider sx={{ my: 4 }} />
        <DeleteProfileRequest id={id} type="tourist" />
      </Box>
    </Box>
  );
};

export default TouristManageProfile;
