import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Rating, Card, CardHeader, Avatar, CardContent, Icon, CircularProgress, IconButton, CardMedia } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { convertPrice, getProductById } from "../../services/api";
import ProductImage from "../../components/productComponents/ProductImage";
const TouristViewProduct = ({ id }) => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [displayPrice, setDisplayPrice] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(id);
                setProduct(data);

                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const getDisplayPrice = async () => {
            if (product?.price) {
                try {
                    const displayPrice = await convertPrice(product.price);
                    setDisplayPrice(displayPrice);
                } catch (error) {
                    console.error("Error converting price:", error);
                }
            }
        };
        getDisplayPrice();
    }, [product]);


    return (
        loading ? (<Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px'
        }}><CircularProgress size='4rem' /></Box>) :
            product ?
                (<Box sx={{ padding: 3 }}>
                    <Card elevation={3} sx={{
                        padding: 2, marginBottom: 3, width: '650px'
                    }}>
                        <ProductImage imageId={product.image} height={"300"} marginBottom={2} />

                        <Typography variant="h4" gutterBottom>{product.name}</Typography>
                        {/* Average Rating */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 2
                        }}>

                            <Avatar sx={{
                                backgroundColor: 'purple',
                                width: '25px',
                                height: '25px',
                                fontSize: '14px'


                            }}>
                                {product.seller.username.charAt(0)}
                            </Avatar>
                            <Typography sx={{
                                marginLeft: 1,
                                color: 'text.secondary',
                                fontWeight: 'bold',
                                fontSize: '16px'

                            }}>
                                {product.seller.username}
                            </Typography>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 2,
                            width: '100%'
                        }}>
                            <Rating value={product.averageRating} readOnly precision={0.5}
                                icon={<StarIcon style={{ fill: 'orange' }} fontSize="large" />}
                                emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />}
                            />
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>({product.reviews.length})</Typography>
                        </Box>
                        <Typography variant="subtitle1" gutterBottom>{product.description}</Typography>

                        <Divider sx={{ my: 2 }} />

                        {/*Purchase date and Price  */}
                        <Box mt={2} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'end',
                            alignItems: 'end'

                        }}>
                            <IconButton size="small" disabled color="primary" sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'start',
                                alignItems: 'center',
                                flexGrow: 1,
                            }}>
                                {product.quantity > 0 ? <ShoppingCartIcon sx={{ fill: 'green' }} /> : <RemoveShoppingCartIcon sx={{ fill: 'red' }} />}
                                <Typography fontSize={14} sx={{
                                    marginLeft: '5px',
                                    color: `${product.quantity > 0 ? 'green' : 'red'}`,
                                }}>{product.quantity > 0 ? 'in stock' : 'out of stock'}</Typography>
                            </IconButton>

                            <Typography gutterBottom variant="h4" component="div" sx={{
                                color: `${product.quantity > 0 ? 'black' : 'grey'}`,
                            }}>
                                {displayPrice}
                            </Typography>
                        </Box>
                    </Card>


                    {/* Reviews Section */}
                    <Card elevation={3} sx={{ padding: 2, width: '650px' }}>
                        <Typography variant="h5" gutterBottom>Reviews ({product.reviews.length})</Typography>

                        <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2, gap: 2 }}>
                            {/* Reviews */}
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review) => (
                                    <Card key={review._id} sx={{ maxWidth: 300, flexShrink: 0 }}>
                                        <CardHeader
                                            title={<Rating value={review.rating} precision={0.5} readOnly size="large"
                                                icon={<StarIcon style={{ fill: 'gray' }} fontSize="large" />}
                                                emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />} />}
                                        />
                                        <CardContent sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'start',
                                            alignItems: 'start',
                                            textAlign: 'left',
                                            padding: 2,
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 2
                                            }}>

                                                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                                                    {review.user.username.charAt(0)}
                                                </Avatar>
                                                <Typography variant="h5" color="text.secondary" ml={2}>
                                                    {review.user.username}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {review.comment}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                ))) : (
                                <Typography variant="body1" sx={{ color: 'gray' }}>No reviews yet</Typography>
                            )}
                        </Box>
                    </Card>
                </Box>) : <Typography variant="h4" color="textSecondary">Product not found</Typography>
    );

}

export default TouristViewProduct;