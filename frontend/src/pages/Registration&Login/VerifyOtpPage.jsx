import React, { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../services/api";

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async () => {
        try {
            const response = await verifyOtp(email, otp);
            setMessage(response.message);
            setErr("");
            navigate("/reset-password", { state: { email } });
        } catch (error) {
            setMessage("");
            setErr(error.response?.data.message || "Invalid OTP");
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
                label="OTP"
                variant="outlined"
                sx={{
                    width: '300px',
                    marginBottom: '20px',
                    marginTop: '30px'
                }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
                width: '300px',
                marginBottom: '20px'
            }}
                onClick={handleSubmit}
                disabled={!otp}
            >
                Verify OTP
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
                Didn’t Receive OTP?  <a href="forgot-password">Resend</a>
            </Typography>

        </Box>
    );
}

export default VerifyOtpPage;