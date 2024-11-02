import CachedIcon from '@mui/icons-material/Cached';

const TouristViewProduct = ({ product }) => {
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

    return (
        <h2>{product.name}</h2>
    );
}

export default TouristViewProduct;