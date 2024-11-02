import { Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateProduct } from "../../services/api";
import EditProductForm from "../../components/productComponents/EditProductForm";
import CachedIcon from '@mui/icons-material/Cached';

const ManageProductPage = ({ product }) => {
    if (!product) {
        return (
            < h2 > loading
                <CachedIcon sx={
                    {
                        fontSize: '25px',
                        ml: '10px',
                        mb: '-5px',
                    }
                } />
            </h2>
        )
    }
    const [rating, setRating] = useState(product.averageRating);
    const [reviews, setReviews] = useState(product.reviews);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '20px',
                width: '350px',
            }}
        >
            <EditProductForm product={product} />

            <Box>
                {/* TODO */}
                <h2 style={{
                    color: 'grey',
                    mb: '10px',
                }}>
                    Reviews Section
                </h2>
            </Box>


        </Box>
    );
}

export default ManageProductPage;