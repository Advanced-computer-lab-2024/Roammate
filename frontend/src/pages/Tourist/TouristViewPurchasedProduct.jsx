import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Rating, Button, TextField, IconButton, Card, CardHeader, Avatar, CardContent, Icon, CardMedia } from "@mui/material";
import dayjs from "dayjs";
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import { addReviewToProduct, convertPrice } from "../../services/api";
import ProductImage from "../../components/productComponents/ProductImage";


const DATE_FORMAT = 'YYYY/MM/DD';
const TouristViewPurchasedProduct = ({ purchase, touristId }) => {
    let product = purchase.product;
    const purchaseDate = purchase.date;
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [response, setResponse] = useState(null);
    const [displayPrice, setDisplayPrice] = useState();

    useEffect(() => {
        const getDisplayPrice = async () => {
            try {
                const displayPrice = await convertPrice(product.price);
                setDisplayPrice(displayPrice);
            } catch (error) {
                console.error("Error converting price:", error);
            }
        }
        getDisplayPrice();
    }, [])

    const handleReviewSubmit = async () => {
        try {
            // Create a new review object
            const review = {
                user: touristId,
                rating: rating,
                comment: reviewText,
                date: new Date()
            };

            // Add the review to the product
            const updatedProduct = await addReviewToProduct(product._id, review);
            product = updatedProduct.data;
            setSubmitted(true);
            setResponse("Review submitted successfully!");
        } catch (error) {
            console.error(error);
            setResponse("Failed to submit review");
        }
    };
    const userRatedBefore = () => {
        //Check if the user has already rated this product
        const existingReview = product.reviews.find(review => review.user._id === touristId);
        return existingReview ? existingReview.rating : null;
    };


    return (
        <Box sx={{ padding: 3 }}>
            <Card elevation={3} sx={{
                padding: 2, marginBottom: 3,
                width: '650px',
            }}>

                <Box sx={{
                    mb: '20px'
                }}>
                    <ProductImage imageId={product.image} />
                </Box>


                <Typography variant="h4" gutterBottom>{product.name}</Typography>
                {/* Average Rating */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2
                }}>
                    {/* <Typography variant="h6" color="text.secondary" ml={1}>
                            By:&nbsp;
                        </Typography> */}
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexGrow: 1
                        }}>
                            <CheckIcon sx={{
                                fill: 'green'
                            }} />
                            <Typography variant="body1"

                                sx={{
                                    marginLeft: 1, color: 'grey',
                                }}>purchased on &nbsp;
                                {dayjs(purchaseDate).format(DATE_FORMAT)}</Typography>
                        </Box>


                        <Typography variant="h4">
                            <strong> {displayPrice}</strong>
                        </Typography>
                    </Box>

                </Box>
            </Card>


            {/* Reviews Section */}
            <Card elevation={3} sx={{
                padding: 2,
                width: '650px'
            }}>
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
                <Divider sx={{ my: 2 }} />



                {/* Leave a Review */}
                {
                    purchase.status === 'Completed' ?
                        (userRatedBefore() ?
                            (<Typography variant="h6" sx={{ color: 'gray' }}>You have already rated this product {userRatedBefore()}</Typography>)
                            :
                            (<Box mt={3}>
                                <Typography variant="h6">Leave a Review</Typography>
                                <Rating
                                    value={rating}
                                    onChange={(e, newValue) => setRating(newValue)}
                                    sx={{ marginY: 1 }}
                                    precision={0.5}
                                    icon={<StarIcon style={{ fill: 'orange' }} fontSize="large" />}
                                    emptyIcon={<StarIcon style={{ fill: 'lightgray' }} fontSize="large" />}
                                    disabled={submitted}
                                />
                                <TextField
                                    label="Write your review"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                    disabled={submitted}
                                />
                                <Typography variant="body2" sx={{ color: 'gray' }}>You can't change your review once submitted</Typography>
                                <br />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReviewSubmit}
                                    disabled={!reviewText || rating === 0 || submitted}
                                >
                                    Submit Review
                                </Button>
                                {response && <Typography sx={{
                                    marginTop: 2,
                                    color:
                                        response.includes("successfully") ? 'green' : 'red'
                                }}>{response}</Typography>}
                            </Box>)) : null
                }
            </Card>
        </Box>
    );
};

export default TouristViewPurchasedProduct;
