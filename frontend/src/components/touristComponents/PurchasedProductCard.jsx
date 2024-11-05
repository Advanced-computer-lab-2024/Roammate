import React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
const DATE_FORMAT = 'YYYY/MM/DD';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, CardMedia, IconButton, Rating, Snackbar } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import po from '../../components/po.png';
import { useNavigate } from 'react-router';

const PurchasedProductCard = ({ purchasedProduct, purchaseDate, status }) => {
    const [name, setname] = useState(purchasedProduct.name);
    const [description, setDescription] = useState(purchasedProduct.description);
    const [date, setDate] = useState(dayjs(purchaseDate).format(DATE_FORMAT));
    const [rating, setRating] = useState(purchasedProduct.averageRating);
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);


    const copyLinkToClipboard = async () => {
        const link = `${window.location.origin}/tourist/products?id=` + purchasedProduct._id;
        await navigator.clipboard.writeText(link);
        handleClick();
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Card sx={{ maxWidth: 600, mb: 4 }}>
            {/* <CardMedia
                component="img"
                height="195"
                image={po}
                alt="random"
                sx={{
                    objectFit: 'cover',
                    objectPosition: 'top',
                }}
            /> */}

            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/*Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'start',
                    width: '100%',
                }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        flexGrow: 1,
                        textAlign: 'left',
                    }} >
                        {name}
                    </Typography>
                    <Rating name="read-only" value={rating} readOnly precision={0.5}
                        icon={<StarIcon style={{ fill: 'orange' }} />}
                        emptyIcon={<StarIcon style={{ fill: 'lightgray' }} />}
                    />
                    <IconButton size="small" color="primary" sx={{
                        mt: '-5px',
                        ml: '10px',
                    }} onClick={copyLinkToClipboard}>
                        <ShareIcon />
                    </IconButton>
                </Box>

                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'left',
                    mb: '10px',
                    width: '100%',
                }}>
                    {description}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Typography gutterBottom component="div" sx={{
                        flexGrow: 1,
                        textAlign: 'left',
                        fontSize: '16px',
                        color: 'text.secondary',
                        fontWeight: 'bold',
                    }} >
                        {
                            `purchased on ${dayjs(date).format(DATE_FORMAT)}`
                        }


                        <IconButton size="small" disabled color="primary" sx={{
                            ml: '10px',
                        }}>
                            {
                                status === 'Completed' ? <CheckCircleOutlineIcon sx={{
                                    fill: 'green'
                                }} /> : status === 'Cancelled' ? <CancelIcon sx={{
                                    fill: 'red'
                                }} /> : status === 'Preparing' ? <HourglassTopIcon sx={{
                                    fill: 'orange'
                                }} /> : <LocalShippingIcon sx={{
                                    fill: 'blue'
                                }} />
                            }
                            <Typography variant="body2" sx={{
                                color: ` ${status === 'Completed' ?
                                    'green' : status === 'Cancelled' ?
                                        'red' : status === 'Preparing' ? 'orange' : 'blue'
                                    }`,
                                ml: '5px',
                            }}>
                                {status}
                            </Typography>
                        </IconButton>
                    </Typography>
                </Box>


            </CardContent>
            <CardActions sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                mb: '10px',
                mt: '-20px',
                width: '100%',
            }}>
                {
                    status === 'Shipped' && <Button color="primary"
                        onClick={() => navigate(`/tourist/purchases?id=${purchasedProduct._id}`)}>
                        View Details
                        <ArrowForwardIosIcon />
                    </Button>
                }
                {status === 'Preparing' && <Button variant="contained"
                    onClick={() => navigate(`/tourist/purchases?id=${purchasedProduct._id}`)}
                    endIcon={<CancelIcon sx={{
                        fill: 'white'
                    }} />}
                    sx={{
                        backgroundColor: 'red',
                    }}
                >
                    Cancel
                </Button>
                }
                {status === 'Completed' && <Button variant="contained"
                    onClick={() => navigate(`/tourist/purchases?id=${purchasedProduct._id}`)}
                    endIcon={<ArrowForwardIosIcon />}>
                    Review
                </Button>}
            </CardActions>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    sx={{
                        width: '100%',
                        backgroundColor: '#FFBF00',
                    }}
                >
                    Product Link Copied to Clipboard
                </Alert>
            </Snackbar>

        </Card >
    );
}

export default PurchasedProductCard;