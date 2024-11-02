import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { fetchTourGuideProfile } from "../../services/api";
import { updateTourGuideProfile } from "../../services/api";
const TourGuideManageProfile = ({ id }) => {
    //username,email,mobile,yearsofexperience,previousWork,languages,about
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [previousWork, setPreviousWork] = useState("");
    const [languages, setLanguages] = useState("");
    const [about, setAbout] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        // fetch data from backend
        const fetchTourGuide = async () => {
            const data = await fetchTourGuideProfile(id);
            setUsername(data.username);
            setEmail(data.email);
            setMobile(data.mobile);
            setYearsOfExperience(data.yearsOfExperience);
            setPreviousWork(data.previousWork);
            setLanguages(data.languages);
            setAbout(data.about);
        }
        try {
            fetchTourGuide();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tourGuide = {
            email,
            mobile,
            yearsOfExperience,
            previousWork,
            languages,
            about
        }
        try {
            await updateTourGuideProfile(id, tourGuide);
            setDisabled(true);
            setEdit(false);
        } catch (error) {
            setErr("Failed to update profile! Error: " + error.message);
            console.log(error);
        }
    }

    return (
        <Box >
            <form onSubmit={handleSubmit} style={
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    width: '300px',
                    height: "100%",
                    gap: "15px",
                    padding: "20px",

                }}>
                <Typography variant="h6" sx={{
                    textAlign: 'center'
                }}>Manage Profile</Typography>
                <TextField
                    label={"Username"}
                    type={"text"}
                    value={username}
                    disabled={true}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Email"}
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Mobile"}
                    type={"text"}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />

                <TextField
                    label={"Years of Experience"}
                    type={"text"}
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />

                <TextField
                    label={"Previous Work"}
                    type={"text"}
                    value={previousWork}
                    onChange={(e) => setPreviousWork(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />

                <TextField
                    label={"About"}
                    type={"text"}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Languages"}
                    placeholder="eg: English, Arabic, Spanish"
                    type={"text"}
                    value={languages}
                    onChange={(e) => setLanguages((e.target.value).replace(/\s/g, '').split(','))}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />


                {err && <Typography sx={{
                    color: 'red'
                }}>{err}</Typography>}

                {!edit && <Button
                    variant="contained"
                    onClick={() => {
                        setDisabled(false);
                        setEdit(true);
                    }}
                    sx={{
                        color: 'white',
                        width: '100%'
                    }}
                >
                    Edit
                </Button>}

                {edit &&
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: '100%'
                    }}><Button
                        variant="contained"
                        onClick={() => {
                            setDisabled(false);
                        }}
                        sx={{
                            backgroundColor: 'green',
                            color: 'white',
                            width: '100%'
                        }}
                        type='submit'
                    >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setDisabled(true);
                                setEdit(false);
                            }}
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                width: '100%'
                            }}
                        >
                            Cancel
                        </Button>
                    </Box >
                }

            </form>

        </Box>
    );
}

export default TourGuideManageProfile;