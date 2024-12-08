import React, { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setErr("");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setMessage("");
      setErr(error.response?.data.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '100px'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h4" component="div" sx={{
          textAlign: 'left'
        }}>
          R
        </Typography>
        <PublicIcon fontSize="large" />
        <Typography variant="h4" component="div" sx={{
          textAlign: 'left'
        }}>
          AMMATE
        </Typography>
      </Box>
      <TextField
        label="Email"
        variant="outlined"
        sx={{
          width: '300px', // Adjusted width
          marginBottom: '20px',
          marginTop: '30px'
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {message && (
        <Alert
          severity="success"
          sx={{
            width: '300px', // Matches TextField and Button width
            boxSizing: 'border-box', // Ensures padding is included in the width
            padding: '8px', // Adjust padding if needed to align with other components
            marginBottom: '20px'
          }}
        >
          {message}
        </Alert>
      )}

      {err && (
        <Alert
          severity="error"
          sx={{
            width: '300px', // Matches TextField and Button width
            boxSizing: 'border-box', // Ensures padding is included in the width
            padding: '8px', // Adjust padding if needed to align with other components
            marginBottom: '20px'
          }}
        >
          {err}
        </Alert>
      )}

      <Button variant="contained" sx={{
        width: '300px', // Adjusted width to match email input
        marginBottom: '20px'
      }}
        onClick={handleSubmit}
        disabled={!email}
      >
        Send OTP
      </Button>

      <Typography variant="body2" component="div" sx={{
        textAlign: 'center',
        '& a': {
          color: 'black',
        },
        '& a:hover': {
          color: 'blue',
        }
      }}>
        Remember your password? <a href="/login">Login</a>
      </Typography>
    </Box>
  );
};

export default ForgotPasswordPage;
