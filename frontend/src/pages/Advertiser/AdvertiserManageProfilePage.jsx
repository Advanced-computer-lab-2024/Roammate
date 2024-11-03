import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import {
    fetchAdvertiserProfile,
    updateAdvertiserProfile,
    uploadAdvertiserIdentification,
    uploadAdvertiserTaxation,
    uploadAdvertiserLogo,
    // uploadadvertiserLogo,
} from "../../services/api";

const AdvertiserManageProfile = ({ id }) => {
    //username,email,website,hotline,companyProfile,description,foundedYear,industry,location,employees,services
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [hotline, setHotline] = useState("");
    const [description, setDescription] = useState("");
    const [foundedYear, setFoundedYear] = useState("");
    const [industry, setIndustry] = useState("");
    const [location, setLocation] = useState("");
    const [employees, setEmployees] = useState("");
    const [services, setServices] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const [err, setErr] = useState("");


    const [identification, setIdentification] = useState(null);
    const [taxation, setTaxation] = useState(null);
    const [documentSubmitted, setDocumentSubmitted] = useState(false);


    useEffect(() => {
        // fetch data from backend
        const fetchAdvertiser = async () => {
            const data = await fetchAdvertiserProfile(id);
            setUsername(data.username);
            setEmail(data.email);
            setWebsite(data.website);
            setHotline(data.hotline);
            setDescription(data.companyProfile.description);
            setFoundedYear(data.companyProfile.foundedYear);
            setIndustry(data.companyProfile.industry);
            setLocation(data.companyProfile.location);
            setEmployees(data.companyProfile.employees);
            setServices(data.companyProfile.services);
        }
        try {
            fetchAdvertiser();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const advertiser = {
            email,
            website,
            hotline,
            companyProfile: {
                description,
                foundedYear,
                industry,
                location,
                employees,
                services
            }
        }
        try {
            await updateAdvertiserProfile(id, advertiser);
            setDisabled(true);
            setEdit(false);
        } catch (error) {
            setErr("Failed to update profile! Error: " + error.message);
            console.log(error);
        }
    }


    const handleIdentificationChange = (e) => {
        setIdentification(e.target.files[0]);
    };

    const handleTaxationChange = (e) => {
        setTaxation(e.target.files[0]);
    };

    const handleDocumentsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (identification) {
                const formData1 = new FormData();
                formData1.append("file", identification);
                await uploadAdvertiserIdentification(id, formData1);
            }

            if (taxation) {
                const formData2 = new FormData();
                formData2.append("file", taxation);
                await uploadAdvertiserTaxation(id, formData2);
            }

            setDocumentSubmitted(true);
            alert("Files uploaded successfully!");
        } catch (error) {
            console.error("Error during file upload:", error);
            alert("An error occurred during the file upload.");
        }
    };

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });


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
                }}>Advertiser Profile</Typography>
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
                    label={"Website"}
                    type={"text"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField

                    label={"Hotline"}
                    type={"text"}
                    value={hotline}
                    onChange={(e) => setHotline(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <Divider />
                <Typography variant="h6" sx={{
                    textAlign: 'center'
                }}>Company Profile</Typography>
                <TextField

                    label={"Description"}
                    type={"text"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Founded Year"}
                    type={"text"}
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Industry"}
                    type={"text"}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Location"}
                    type={"text"}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Employees"}
                    type={"text"}
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    disabled={disabled}
                    variant="standard"
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label={"Services"}
                    placeholder="eg: service1, service2, service3"
                    type={"text"}
                    value={services}
                    onChange={(e) => setServices((e.target.value).replace(/\s/g, '').split(','))}
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

            {/* File Upload Section */}
            <Box
                component="form"
                className="file-upload-form"
                onSubmit={handleDocumentsSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >

                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    {/* Identification Upload */}
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            backgroundColor: identification ? "green" : "primary.main",
                            color: "white",
                        }}
                    >
                        Upload Identification
                        <VisuallyHiddenInput type="file" onChange={handleIdentificationChange} />
                    </Button>

                    {/* Taxation Upload */}
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            backgroundColor: taxation ? "green" : "primary.main",
                            color: "white",
                        }}
                    >
                        Upload Taxation Registry Card
                        <VisuallyHiddenInput type="file" onChange={handleTaxationChange} />
                    </Button>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!identification || !taxation}
                        sx={{
                            backgroundColor: documentSubmitted ? "green" : "primary.main",
                            color: "white",
                        }}
                    >
                        Upload
                    </Button>

                </Box>

            </Box>

        </Box>
    );
}

export default AdvertiserManageProfile;