import SellerAnalyticsPage from "../Seller/SellerAnalyticsPage";
import { Box, Typography } from "@mui/material";

const AdminAnalyticsPage = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
                Admin Analytics Page
            </Typography>
            <SellerAnalyticsPage />
        </Box>

    );
}

export default AdminAnalyticsPage;