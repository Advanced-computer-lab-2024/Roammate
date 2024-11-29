import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import WishlistCard from "../../components/touristComponents/ProductCard"; // Create or reuse a WishlistCard component
import SearchBar from "../../components/touristComponents/SearchBar";
import { getUserWishlistedProducts } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";

const TouristWishlistPage = ({ id }) => {
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();

  const fetchWishlist = async () => {
    try {
      const result = await getUserWishlistedProducts(id);
      // Filter results based on search query
      // const filteredWishlist = result.filter((product) =>
      //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
      // );
      setWishlist(result);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
    setActiveButton(null); // Reset active button if needed
  }, [id, searchQuery, fetch]);

  return (
    <Box>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      />

      <Box>
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "bold",
            mb: "25px",
            color: "grey",
            textAlign: "left",
          }}
        >
          Wishlisted Products
        </Typography>
      </Box>

      <Grid2 container spacing={2}>
        {wishlist.length === 0 &&
          (fetch < 1 ? (
            <CircularProgress />
          ) : (
            <Grid2 xs={12}>
              <h2>No Wishlist Items Found</h2>
            </Grid2>
          ))}
        {wishlist.map((product) => (
          <Grid2 key={product._id} xs={12} sm={6}>
            {" "}
            {/* Adjust for 2 columns on small screens and up */}
            <WishlistCard
              product={product}
              id={id}
              refreshWishlist={fetchWishlist}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default TouristWishlistPage;
