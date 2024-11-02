import React, { useState, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { fetchProductsBySellerId } from '../../services/api';
import ProductCard from '../../components/sellerComponents/ProductCard';
import { useLocation, useOutletContext } from 'react-router';
import ManageProductPage from './ManageProductPage';


const SellerProductsPage = ({ id }) => {
    const [products, setProducts] = useState([]);
    const [fetch, setFetch] = useState(0);
    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const product_id = queryParams.get('id');

    useEffect(() => {
        const fetchMyProducts = async () => {
            const result = await fetchProductsBySellerId(id);
            setProducts(result);
            setFetch(fetch + 1);
        };
        try {
            fetchMyProducts();
        }
        catch (err) {
            console.log(err);
        }
        if (product_id) {
            setActiveButton(null)
        }
    }, [product_id]);


    return (
        !product_id ?
            <Box>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} sx={{
                        flexGrow: 1,
                    }} >
                        {products.length === 0 && (
                            fetch < 1 ? (< h2 > loading
                                <CachedIcon sx={
                                    {
                                        fontSize: '25px',
                                        ml: '10px',
                                        mb: '-5px',
                                    }
                                } />
                            </h2>) : (<h2>No Products Found</h2>))}
                        {products.map((product) => (
                            <div key={product._id}>
                                <ProductCard product={product} setActiveButton={setActiveButton} />
                            </div>
                        ))}

                    </Grid2>

                    {/* <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    backgroundColor: 'lightgray',
                    p: '15px',
                }}>
                    <Typography variant='h4'>
                        Some other functionalities
                    </Typography>
                </Box> */}

                </Grid2 >
            </Box > :
            <ManageProductPage product={products.find((prod) => prod._id === product_id)} />
    );
}

export default SellerProductsPage;