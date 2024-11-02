import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { fetchTouristProfile, updateTouristProfile } from "../../services/api";
const DATE_FORMAT = "DD/MM/YYYY";
import dayjs from "dayjs";
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
        // fetch data from backend
        const fetchTourist = async () => {
            const data = await fetchTouristProfile(id);
            setUsername(data.username);
            setEmail(data.email);
            setMobile(data.mobile);
            setNationality(data.nationality)
            setDOB(dayjs(data.DOB).format(DATE_FORMAT));
            setJob(data.job);
        }
        try {
            fetchTourist();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tourist = {
            email,
            mobile,
            nationality,
            job,
        }
        try {
            await updateTouristProfile(id, tourist);
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
                    label={"Nationality"}
                    type={"text"}
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />

                <TextField
                    label={"Date of Birth"}
                    type={"text"}
                    value={DOB}
                    disabled={true}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />

                <TextField
                    label={"Job"}
                    type={"text"}
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
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

export default TouristManageProfile;