import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CachedIcon from "@mui/icons-material/Cached";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import EditProductForm from "../../components/productComponents/EditProductForm";
import "chart.js/auto"; // Auto-register chart.js components
import { getProductSales } from "../../services/api"; // Import your API function

const ManageProductPage = ({ product, productId }) => {
  const [salesDates, setSalesDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getProductSales(productId);
        setSalesDates(response.product.totalSales || []);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  if (loading || !product) {
    return (
      <h2>
        Loading
        <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
      </h2>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
        gap: "50px",
        mt: "20px",
      }}
    >
      <EditProductForm product={product} productsales={salesDates} />

      {/* Reviews Section */}
      <Card elevation={1} sx={{ padding: 2, width: "600px" }}>
        <Typography variant="h5" gutterBottom>
          Reviews ({product.reviews.length})
        </Typography>

        <Box sx={{ display: "flex", overflowX: "auto", padding: 2, gap: 2 }}>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <Card key={review._id} sx={{ maxWidth: 300, flexShrink: 0 }}>
                <CardHeader
                  title={
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="large"
                      icon={
                        <StarIcon style={{ fill: "gray" }} fontSize="large" />
                      }
                      emptyIcon={
                        <StarIcon
                          style={{ fill: "lightgray" }}
                          fontSize="large"
                        />
                      }
                    />
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left",
                    padding: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
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
            ))
          ) : (
            <Typography variant="body1" sx={{ color: "gray" }}>
              No reviews yet
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ManageProductPage;
