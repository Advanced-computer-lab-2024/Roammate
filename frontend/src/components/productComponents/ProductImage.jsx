import React, { useState, useEffect } from "react";
import { downloadImage } from "../../services/api";
import CardMedia from '@mui/material/CardMedia';
import placeholder from "../../assets/images/placeholder.png";
import { Box } from "@mui/material";

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
        if (imageId)
            fetchImage();
    }, [imageId]);

    return (

        <CardMedia
            component="img"
            image={image ? image : placeholder}
            alt="Product Image"
            sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                borderRadius: '5px',
            }}
        />

    );
};

export default ProductImage;