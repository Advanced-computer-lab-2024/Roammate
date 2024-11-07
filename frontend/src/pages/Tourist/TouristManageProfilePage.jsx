import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Divider, IconButton, Alert } from "@mui/material";
import { fetchTouristProfile, updateTouristProfile } from "../../services/api";
import dayjs from "dayjs";
import ChangePasswordComponent from "../../components/sharedComponents/ChangePasswordComponent";
import DeleteProfileRequest from "../../components/sharedComponents/DeleteProfileRequestComponent";
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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
  let loyaltyPoints = 200000;
  let wallet = 300;

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
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-between",
        gap: "10px",
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
          alignItems: "space-around",
          justifyContent: "space-around",
          width: "30%",
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
          width: "30%",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2, mt: 5 }}>
          Manage Password
        </Typography>
        <ChangePasswordComponent id={id} type="tourist" />
        <Divider sx={{ my: 6 }} />
        <DeleteProfileRequest id={id} type="Tourist" />
      </Box>

      {/*Loyal Points*/}
      <Box
        sx={{
          width: "30%",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Wallet
        </Typography>
        <IconButton sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '15px',
        }} disabled>
          <AccountBalanceWalletIcon fontSize={'large'} mr={2} />
          <Typography variant="h5">{wallet} EGP</Typography>
        </IconButton>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ textAlign: "center", mb: 2, mt: 4 }}>
          Loyalty Points
        </Typography>
        <IconButton sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '15px',
        }} disabled>
          <LocalPoliceIcon sx={{
            fill: `${loyaltyPoints >= 100000 ?
              loyaltyPoints >= 500000 ? 'gold' : 'green' : 'grey'}`,
          }}
            fontSize={'large'}
            mr={2}
          />
          <Typography variant="h5">{loyaltyPoints} pts</Typography>
        </IconButton>

        <Divider sx={{ my: 4 }} />

        {/*Redeem points as cash in wallet*/}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
        }}>
          <TextField
            label="Points"
            type="number"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Alert severity="info">
            <strong>Info:</strong> 100 point = 1 EGP
          </Alert>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white", width: "100%" }}
          >
            Redeem Cash
          </Button>
        </Box>


      </Box>
    </Box>
  );
};

export default TouristManageProfile;
