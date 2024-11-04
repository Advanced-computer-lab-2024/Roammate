import React, { useEffect, useState } from 'react';
import { fetchPurchasedProductsByTouristId } from '../../services/api';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, Divider, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import PurchasedProductCard from '../../components/touristComponents/PurchasedProductCard';
import TouristViewPurchasedProduct from './TouristViewPurchasedProduct';

const TouristPurchases = ({ id }) => {
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
                                    Purchases Completed
                                </Typography>
                                {purchases.filter((a) => a.status === 'Completed').map((purchase) => (
                                    <PurchasedProductCard key={purchase._id} purchasedProduct={purchase.product} purchaseDate={purchase.date} status={purchase.status} />
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
                                    Active Purchases
                                </Typography>
                                {purchases.filter((a) => a.status === 'Preparing' || a.status === 'Shipped').map((purchase) => (
                                    <PurchasedProductCard key={purchase._id} purchasedProduct={purchase.product} purchaseDate={purchase.date} status={purchase.status} />
                                ))}
                            </Box>
                        </div> :
                        <h2>loading
                            <CachedIcon sx={{
                                fontSize: '25px',
                                ml: '10px',
                                mb: '-5px',
                            }} />
                        </h2>}
                </div> :
                purchases && <TouristViewPurchasedProduct product={purchases.find(
                    (purchase) => purchase.product._id === purchasedProductId
                ).product} touristId={id} purchaseDate={
                    purchases.find(
                        (purchase) => purchase.product._id === purchasedProductId
                    ).date
                } status={
                    purchases.find(
                        (purchase) => purchase.product._id === purchasedProductId
                    ).status
                } />}
        </div>

    );
}

export default TouristPurchases;