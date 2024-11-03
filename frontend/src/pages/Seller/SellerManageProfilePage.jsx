import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, Box, Typography, TextField, Button, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
    fetchSellerProfile,
    updateSellerProfile,
    uploadSellerIdentification,
    uploadSellerTaxation,
    uploadSellerLogo,
    downloadImage,
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
    const [logo, setLogo] = useState(null);
    const fetchLogo = async (logo) => {
        try {
            const response = await downloadImage(logo); // Fetch the image as a blob
            const blob = response.data;
            const imageUrl = URL.createObjectURL(blob); // Create an object URL for the image
            setLogo(imageUrl); // Set the logo to be displayed in the Avatar
        } catch (error) {
            console.error("Error fetching the image:", error);
        }
    };


    useEffect(() => {
        // fetch data from backend
        const fetchSeller = async () => {
            const data = await fetchSellerProfile(id);
            setUsername(data.username);
            setName(data.name);
            setEmail(data.email);
            setAbout(data.about);

            if (data.documents.logo)
                fetchLogo(data.documents.logo);
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

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file)); // For previewing the logo locally
            const formData = new FormData();
            formData.append("file", file);
            uploadSellerLogo(id, formData);
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

    const LogoInput = styled("input")({
        display: "none", // Hide the input
    });


    return (
        <Box >

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                <label htmlFor="logo-upload">
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: "pointer",
                            backgroundColor: logo ? "transparent" : "primary.main",
                            fontSize: 40,
                        }}
                        src={logo} // Show the logo if available
                    >
                        {!logo && username.charAt(0).toUpperCase()} {/* Show the first letter if no logo */}
                    </Avatar>
                </label>
                <LogoInput
                    id="logo-upload"
                    type="file"
                    onChange={handleLogoChange}
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