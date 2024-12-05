import React, { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../services/api";

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [err, setErr] = useState("");
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("");
            setErr("Passwords do not match");
            return;
        }

        try {
            const response = await resetPassword(email, newPassword);
            setMessage(response.message);
            setErr("");
        } catch (error) {
            console.log(error);
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
                label="New Password"
                type="password"
                sx={{
                    width: '300px',
                    marginBottom: '20px',
                    marginTop: '30px'
                }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                type="password"
                sx={{
                    width: '300px',
                    marginBottom: '20px'
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={!newPassword || !confirmPassword}
            >
                Reset Password
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
                <a href="/login">Back to Login</a>
            </Typography>
        </Box>
    );
};

export default ResetPasswordPage;
