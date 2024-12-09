import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { Cached as CachedIcon } from "@mui/icons-material";
import { Star as StarIcon } from "@mui/icons-material";
import EditMuseumForm from "../../components/tourismGovernorComponents/EditMusuemForm";

const ManageMuseumPage = ({ museum }) => {
  if (!museum) {
    return (
      <h2>
        Loading
        <CachedIcon
          sx={{
            fontSize: "25px",
            ml: "10px",
            mb: "-5px",
          }}
        />
      </h2>
    );
  }

  const [rating, setRating] = useState(museum.averageRating || 4.5); // Placeholder rating
  const [reviews, setReviews] = useState(museum.reviews || []); // Placeholder reviews

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          width: "500px",
          border: "1px solid lightgrey",
          borderRadius: "10px",
        }}
      >
        {/* Museum Edit Form */}
        <EditMuseumForm museum={museum} />

        {/* Reviews Section
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ color: "grey", mb: "10px" }}>
          Reviews Section
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mb: "10px",
              }}
            >
              <StarIcon sx={{ color: "orange" }} />
              <Typography variant="body2" color="text.secondary">
                {review}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No reviews available.
          </Typography>
        )}
      </Box> */}
      </Box>
    </Box >
  );
};

export default ManageMuseumPage;
