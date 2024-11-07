import React, { useState } from "react";
import { CircularProgress, Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { createProduct, uploadProductImage } from "../../services/api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SellerCreateProduct = ({ id }) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const [image, setImage] = useState(null); // Track image state with useState

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const newProduct = {
                name,
                description,
                price,
                quantity,
                seller: id,
            }
            const response = await createProduct(newProduct);
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                await uploadProductImage(response.data._id, formData);
            }
            setResponse("Product created successfully");
        } catch (error) {
            console.log(error);
            setResponse("Failed to create product. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '20px',
                width: '450px',
                padding: '20px',
                border: '1px solid lightgray',
            }}
        >
            <h2>Product Details</h2>


            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '25px',
                width: '100%',
                alignItems: 'start',
                justifyContent: 'start',
            }}>
                <TextField
                    label="name"
                    variant="outlined"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                {/*Description*/}
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                {/*Image URL*/}
                <h2>Image</h2>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        backgroundColor: image ? "green" : "primary.main",
                        color: "white",
                    }}
                >
                    Upload Image
                    <input
                        type="file"
                        onChange={(e) => {
                            handleImageUpload(e);
                        }}
                        style={{ display: "none" }}
                    />
                </Button>


                {/*Price*/}
                <h2>Price</h2>
                <TextField
                    label="Price"
                    variant="outlined"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{
                        width: 'fit-content',
                    }}
                />

                {/*Quantity*/}
                <h2>Quantity</h2>
                <TextField
                    label="Quantity"
                    variant="outlined"
                    value={quantity}
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{
                        width: 'fit-content',
                    }}
                />


                <Divider />


                {response && <Typography sx={{
                    color: `${response.includes("successfully") ? 'green' : 'red'}`
                }}>{response}</Typography>}

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        width: '100%'
                    }}
                    disabled={!name || !description || !price || !quantity}
                >
                    {loading &&
                        response === ""
                        ? <CircularProgress size={24} /> : "Create Product"}
                </Button>


            </form>

        </Box>
    );
}

export default SellerCreateProduct;