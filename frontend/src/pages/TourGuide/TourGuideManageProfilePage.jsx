import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, Box, Typography, TextField, Button, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import {
    fetchTourGuideProfile,
    updateTourGuideProfile,
    uploadTourGuideIdentification,
    uploadTourGuideCertificate,
    uploadTourGuidePhoto,
    downloadImage,
} from "../../services/api";

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


    const [identification, setIdentification] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [documentSubmitted, setDocumentSubmitted] = useState(false);
    const [photo, setPhoto] = useState(null);
    const fetchPhoto = async (photo) => {
        try {
            const response = await downloadImage(photo); // Fetch the image as a blob
            const blob = response.data;
            const imageUrl = URL.createObjectURL(blob); // Create an object URL for the image
            setPhoto(imageUrl); // Set the photo to be displayed in the Avatar
        } catch (error) {
            console.error("Error fetching the image:", error);
        }
    };


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

            if (data.documents.photo)
                fetchPhoto(data.documents.photo);
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


    const handleIdentificationChange = (e) => {
        setIdentification(e.target.files[0]);
    };

    const handleCertificateChange = (e) => {
        setCertificate(e.target.files[0]);
    };

    const handleDocumentsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (identification) {
                const formData1 = new FormData();
                formData1.append("file", identification);
                await uploadTourGuideIdentification(id, formData1);
            }

            if (certificate) {
                const formData2 = new FormData();
                formData2.append("file", certificate);
                await uploadTourGuideCertificate(id, formData2);
            }

            setDocumentSubmitted(true);

            alert("Files uploaded successfully!");
        } catch (error) {
            console.error("Error during file upload:", error);
            alert("An error occurred during the file upload.");
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // For previewing the photo locally
            const formData = new FormData();
            formData.append("file", file);
            uploadTourGuidePhoto(id, formData);
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

    const PhotoInput = styled("input")({
        display: "none", // Hide the input
    });


    return (
        <Box >

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                <label htmlFor="photo-upload">
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: "pointer",
                            backgroundColor: photo ? "transparent" : "primary.main",
                            fontSize: 40,
                        }}
                        src={photo} // Show the photo if available
                    >
                        {!photo && username.charAt(0).toUpperCase()} {/* Show the first letter if no photo */}
                    </Avatar>
                </label>
                <PhotoInput
                    id="photo-upload"
                    type="file"
                    onChange={handlePhotoChange}
                />
            </Box>

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

                    {/* Certificate Upload */}
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            backgroundColor: certificate ? "green" : "primary.main",
                            color: "white",
                        }}
                    >
                        Upload Certificate
                        <VisuallyHiddenInput type="file" onChange={handleCertificateChange} />
                    </Button>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!identification || !certificate}
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

export default TourGuideManageProfile;