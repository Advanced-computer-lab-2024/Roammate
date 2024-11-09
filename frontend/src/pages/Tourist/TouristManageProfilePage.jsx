import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Divider, IconButton, Alert, CircularProgress } from "@mui/material";
import { convertPrice, fetchTouristProfile, redeemPointsToCash, updateTouristProfile } from "../../services/api";
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
  const [preferences, setPreference] = useState("");
  const [activityCategories, setActivityCategories] = useState("");
  const [wallet, setWallet] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [err, setErr] = useState("");
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [redeemMsg, setRedeemMsg] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [displayWallet, setDisplayWallet] = useState();

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
        setPreference(data.preferences);
        setActivityCategories(data.activityCategories);
        setWallet(data.wallet);
        setPoints(data.points);
        setLevel(data.level);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTourist();
  }, [id]);


  useEffect(() => {
    const getDisplayWallet = async (wallet) => {
      try {
        const displayWallet = await convertPrice(wallet);
        setDisplayWallet(displayWallet);
      } catch (error) {
        console.error("Error converting price:", error);
      }
    };
    getDisplayWallet(wallet);
  }, [wallet]);

  const handleEditProfile = async (event) => {
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


  const handleRedeemPoints = async (event) => {
    event.preventDefault();
    // Redeem points as cash in wallet
    setRedeemLoading(true);
    try {
      const res = await redeemPointsToCash(id, pointsToRedeem);
      console.log(res);
      if (res.status === 200) {
        setWallet(res.data.wallet);
        setPoints(res.data.points);
        setLevel(res.data.level);
        setRedeemMsg("Points redeemed successfully!");
        setRedeemLoading(false);
      }
    } catch (error) {
      setRedeemMsg("Failed to redeem points! " + error.response.data.message);
      setRedeemLoading(false);
    }
  }

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
        onSubmit={handleEditProfile}
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
          <Typography variant="h5">{displayWallet}</Typography>
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
            fill: `${level === 3 ? 'gold' : level === 2 ? 'green' : 'grey'}`,
          }}
            fontSize={'large'}
            mr={2}
          />
          <Typography variant="h5">{points} pts</Typography>
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
            value={pointsToRedeem}
            onChange={(e) => {
              setPointsToRedeem(e.target.value);
              setRedeemMsg("");
            }}
            type="number"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <Alert severity="info">
            <strong>Info:</strong> 100 point = 1 EGP
          </Alert>
          {redeemMsg && pointsToRedeem && <Typography severity="info" sx={{
            color: `${redeemMsg.includes('Failed') ? 'red' : 'green'}`,
          }}>{redeemMsg}</Typography>}

          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white", width: "100%" }}
            onClick={handleRedeemPoints}
            disabled={redeemLoading || !pointsToRedeem}
          >
            {redeemLoading ? <CircularProgress /> : "Redeem"}
          </Button>
        </Box>


      </Box>
    </Box>
  );
};

export default TouristManageProfile;
