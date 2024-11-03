import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
    fetchSellerProfile,
    updateSellerProfile,
    uploadSellerIdentification,
    uploadSellerTaxation,
    // uploadSellerLogo    
} from "../../services/api";

const SellerManageProfilePage = ({ id }) => {
    //username,email,website,hotline,companyProfile,description,foundedYear,industry,location,employees,services
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const [err, setErr] = useState("");


    const [identification, setIdentification] = useState(null);
    const [taxation, setTaxation] = useState(null);
    const [documentSubmitted, setDocumentSubmitted] = useState(false);


    useEffect(() => {
        // fetch data from backend
        const fetchSeller = async () => {
            const data = await fetchSellerProfile(id);
            setUsername(data.username);
            setName(data.name);
            setEmail(data.email);
            setAbout(data.about);
        }
        try {
            fetchSeller();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const seller = {
            email,
            name,
            about
        }
        try {
            await updateSellerProfile(id, seller);
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
                await uploadSellerIdentification(id, formData1);
            }

            if (taxation) {
                const formData2 = new FormData();
                formData2.append("file", taxation);
                await uploadSellerTaxation(id, formData2);
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
                    label={"Name"}
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

export default SellerManageProfilePage;