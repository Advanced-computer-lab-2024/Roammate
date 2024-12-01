import React, { useEffect, useState } from 'react';
import { fetchPurchasedProductsByTouristId } from '../../services/api';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import PurchasedProductCard from '../../components/touristComponents/PurchasedProductCard';
import TouristViewPurchasedProduct from './TouristViewPurchasedProduct';

const TouristPurchases = () => {
    const id = localStorage.getItem('userId');


    const [purchases, setPurchases] = useState();
    //get query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const purchasedProductId = queryParams.get('id');

    useEffect(() => {
        const fetchPurchases = async () => {
            const response = await fetchPurchasedProductsByTouristId(id);
            setPurchases(response);

        }
        fetchPurchases();
    }, [id, purchasedProductId]);


    return (
        <div>
            {!purchasedProductId ?
                <div>
                    {purchases ?
                        <div>

                            <Box>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'left'
                                }}>
                                    Active Purchases
                                </Typography>
                                {purchases.filter((a) => a.status === 'Preparing' || a.status === 'Shipped').map((purchase) => (
                                    <PurchasedProductCard key={purchase._id} purchase={purchase} />
                                ))}
                            </Box>

                            <Divider sx={{
                                mt: '20px',
                                mb: '20px',
                            }} />

                            <Box>
                                <Typography sx={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    mb: '25px',
                                    color: 'grey',
                                    textAlign: 'left'
                                }}>
                                    Purchases Completed
                                </Typography>
                                {purchases.filter((a) => a.status === 'Completed').map((purchase) => (
                                    <PurchasedProductCard key={purchase._id} purchase={purchase} />
                                ))}
                            </Box>


                        </div> :
                        <CircularProgress />}
                </div> :
                purchases && <TouristViewPurchasedProduct touristId={id}
                    purchase={purchases.find((purchase) => purchase._id === purchasedProductId)}
                />}
        </div>

    );
}

export default TouristPurchases;