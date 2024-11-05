import React, { useState, useEffect } from "react";
import { downloadImage } from "../../services/api";
import CardMedia from '@mui/material/CardMedia';

const ProductImage = ({ imageId }) => {
    const [image, setImage] = useState(null);

    const fetchImage = async () => {
        try {
            const response = await downloadImage(imageId);
            const blob = response.data;
            const imageUrl = URL.createObjectURL(blob);
            setImage(imageUrl);
        } catch (error) {
            console.error("Error fetching the product image:", error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [imageId]);

    return (
        <CardMedia
            component="img"
            alt="Product Image"
            height="140"
            image={image}
        />
    );
};