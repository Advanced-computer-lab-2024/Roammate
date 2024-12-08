import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { fetchAllActivityCategories, fetchAllPreferenceTags, registerTourist } from "../../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
const TouristRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [nationality, setNationality] = useState("");
    const [DOB, setDOB] = useState('mm/dd/yyyy');
    const [job, setJob] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [AllAvailableCategoryTags, setAllAvailableCategoryTags] = useState([])
    const [AllAvailableTags, setAllAvailableTags] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const categories = await fetchAllActivityCategories();
                const tags = await fetchAllPreferenceTags();
                setAllAvailableCategoryTags(categories);
                setAllAvailableTags(tags);
            } catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [])

    const handleCategoryChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleTagChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== retypePassword) {
            setError("Passwords do not match");
            return;
        }
        const tourist = {
            username,
            email,
            password,
            mobile,
            nationality,
            DOB,
            job,
            preferences: AllAvailableTags.filter(tag => selectedTags.includes(tag.name)).map(tag => tag._id),
            activityCategories: AllAvailableCategoryTags.filter(category => selectedCategory.includes(category.name)).map(category => category._id)
        };
        console.log(tourist);
        const response = await registerTourist(tourist);
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
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'start',
                width: '100%',

            }}>

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
                        Register as Tourist
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

                    <TextField
                        id="mobile"
                        label="Mobile"
                        type="text"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        required
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                    />
                    <TextField
                        id="nationality"
                        label="Nationality"
                        type="text"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        required
                        value={nationality}
                        onChange={(event) => setNationality(event.target.value)}
                    />
                    <TextField
                        id="DOB"
                        label="Date of Birth"
                        type="date"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        required
                        value={DOB}
                        onChange={(event) => setDOB(new dayjs(event.target.value).format(
                            'YYYY-MM-DD'
                        ))}
                    />


                    <TextField
                        id="job"
                        label="Job"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        required
                        value={job}
                        onChange={(event) => setJob(event.target.value)}
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
                        disabled={!(username && email && password && retypePassword &&
                            nationality && mobile && DOB && job)}
                    >
                        Register
                    </Button>
                    <Typography variant="body2" component="div" sx={{
                        textAlign: 'center',
                        marginTop: '20px'
                    }}>
                        Already have an account? <a href="/login">Login</a>
                    </Typography>
                </Box>



                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '350px',
                    marginTop: '40px',
                    marginLeft: '50px',
                    padding: '40px',

                }}>

                    <Alert severity="info" sx={{ width: '100%' }}>
                        You can select your preferences and activity categories for better recommendations
                    </Alert>
                    <InputLabel sx={{
                        textAlign: 'left',
                        width: '100%',
                        mt: 2,
                    }}>Preference Tags</InputLabel>
                    <FormControl sx={{ m: 2, width: 250 }}>
                        <InputLabel>Choose</InputLabel>
                        <Select
                            multiple
                            value={selectedTags}
                            onChange={handleTagChange}
                            input={<OutlinedInput label="Choose" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {AllAvailableTags.map((tag) => (
                                <MenuItem
                                    key={tag._id}
                                    value={tag.name}
                                >
                                    {tag.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <InputLabel sx={{
                        textAlign: 'left',
                        width: '100%',
                    }}>Activity Categories: </InputLabel>
                    <FormControl sx={{ m: 2, width: 250 }}>
                        <InputLabel>Choose</InputLabel>
                        <Select
                            multiple
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            input={<OutlinedInput label="Choose" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {AllAvailableCategoryTags.map((category) => (
                                <MenuItem
                                    key={category._id}
                                    value={category.name}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>



            </Box>

        </Box>
    );
}

export default TouristRegister;