import CachedIcon from '@mui/icons-material/Cached';

const TouristViewItinerary = ({ itinerary }) => {
    if (!itinerary) {
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
        <h2>{itinerary.title}</h2>
    );
}

export default TouristViewItinerary;