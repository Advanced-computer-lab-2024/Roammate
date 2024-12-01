import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { registerAdvertiser, registerSeller, registerTourGuide } from "../../services/api";
import { useNavigate } from "react-router";

const OthersRegisteration = () => {
    //get role from query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const role = urlParams.get('role').toLowerCase();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== retypePassword) {
            setError("Passwords do not match");
            return;
        }
        const user = {
            username,
            email,
            password,
            role,
        };
        console.log(user);
        let response;
        switch (role) {
            case 'advertiser':
                response = await registerAdvertiser(user);
                break;
            case 'seller':
                response = await registerSeller(user);
                break;
            case 'tour guide':
                response = await registerTourGuide(user);
                break;
            default:
                break;
        }

        if (response.status !== 201) {
            setError(response.message);
        } else {
            setError("");
            navigate('/login');
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <Typography variant="h3" component="div" sx={{
                    textAlign: 'left'
                }}>
                    R
                </Typography>
                <PublicIcon fontSize="large" />
                <Typography variant="h3" component="div" sx={{
                    textAlign: 'left'
                }}>
                    AMMATE
                </Typography>
            </Box>


            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '350px',
                marginTop: '40px',
                padding: '40px',

            }}>
                <Typography variant="h5" component="div" sx={{
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    Register as {role}
                </Typography>

                <TextField
                    id="username"
                    label="Username"
                    variant="filled"
                    margin="normal"
                    type="text"
                    fullWidth
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    margin="normal"
                    fullWidth
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="filled"
                    type="password"
                    margin="normal"
                    fullWidth
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    id="retype-password"
                    label="Retype Password"
                    variant="filled"
                    margin="normal"
                    type="password"
                    fullWidth
                    required
                    value={retypePassword}
                    onChange={(event) => setRetypePassword(event.target.value)}
                />

                <Typography variant="h6" component="div" sx={{
                    color: 'red',
                    textAlign: 'center'
                }}>
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        marginTop: '20px'
                    }}
                    disabled={!(username && email && password && retypePassword)}>
                    Register
                </Button>
            </Box>

        </Box>

    );
}

export default OthersRegisteration;