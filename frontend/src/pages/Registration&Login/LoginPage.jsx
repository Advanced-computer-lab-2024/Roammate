import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from "react-router";
import { login } from "../../services/api";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const handleChange = async () => {
        try {
            const res = await login(username, password);
            //remove white spaces from role
            let role = res.data.role.replace(/\s+/g, "");
            // console.log(role);
            setErr('');
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('status', res.data.status);
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const redirect = urlParams.get('redirect');
            // console.log(redirect);
            if (redirect && role === 'tourist') {
                navigate(redirect);
            } else {
                navigate(`/${role}`);
            }
        }
        catch (error) {
            setErr(error.response.data);
        }
    }

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
                label="Username"
                variant="outlined"
                sx={{
                    width: '200px',
                    marginBottom: '20px',
                    marginTop: '30px'
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                label="Password"
                variant="outlined"
                sx={{
                    width: '200px',
                    marginBottom: '20px'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Typography variant="body2" component="div" sx={{
                textAlign: 'left',
                '& a': {
                    color: 'black',
                },
                '& a:hover': {
                    color: 'blue',
                }
                ,
                width: '200px',
            }}>
                <a href="/forgot-password"> Forgot password?</a>
            </Typography>

            <Typography variant="h6" component="div" sx={{
                textAlign: 'center',
                color: 'red',
                marginBottom: '10px'
            }}>
                {err}
            </Typography>

            <Button variant="contained" sx={{
                width: '200px',
                marginBottom: '20px'
            }}
                onClick={handleChange}
                disabled={!username || !password}
            >
                Login
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
                Don't have an account? <a href="/register">Register</a>
            </Typography>
        </Box >

    );
}

export default Login;