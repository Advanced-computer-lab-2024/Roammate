import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from "@mui/material/styles";
import placeholder from "../../assets/images/placeholder.png";
import { downloadImage, updateProduct, uploadProductImage } from "../../services/api";

const EditProductForm = ({ product }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [currentImage, setCurrentImage] = useState(placeholder);
    const [newImage, setNewImage] = useState(null);
    const [edit, setEdit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [err, setErr] = useState("");

    const fetchImage = async () => {
        try {
            const response = await downloadImage(product.image);
            const blob = response.data;
            const imageUrl = URL.createObjectURL(blob);
            setCurrentImage(imageUrl);
        } catch (error) {
            console.error("Error fetching the product image:", error);
        }
    };

    useEffect(() => {
        if (product.image)
            fetchImage();
    }, [product.image]);

    const handleNewImageChange = (e) => {
        setCurrentImage(URL.createObjectURL(e.target.files[0]));
        setNewImage(e.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newProduct = {
                name,
                description,
                price,
                quantity
            }
            await updateProduct(product._id, newProduct);
            if (newImage) {
                const formData = new FormData();
                formData.append("file", newImage);
                await uploadProductImage(product._id, formData);
            }
            setDisabled(true);
            setEdit(false);
        } catch (error) {
            console.log(error);
            setErr("Failed to update product. Please try again later.");
        }
    }

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


            <img src={currentImage} alt="product" style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '5px',
                padding: '3px',
                border: '1px solid black',
                backgroundColor: 'gray',
            }} />


            {/* <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                mb: '10px',

            }}>
                <Typography variant="h5" sx={{
                    color: 'lightgray',
                }}>rated: </Typography>

                <Rating name="read-only" value={rating} readOnly precision={0.5}
                    icon={<StarIcon style={{ fill: 'orange' }} />}
                    emptyIcon={<StarIcon style={{ fill: 'lightgray' }} />}
                />
            </Box> */}

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
                    disabled={disabled}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={description}
                    disabled={disabled}
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
                    disabled={disabled}
                    sx={{
                        backgroundColor: newImage ? "green" : "primary.main",
                        color: "white",
                    }}
                >
                    Upload Image
                    <input
                        type="file"
                        onChange={(e) => {
                            handleNewImageChange(e);
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
                    disabled={disabled}
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
                    disabled={disabled}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{
                        width: 'fit-content',
                    }}
                />


                <Divider />

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

export default EditProductForm;