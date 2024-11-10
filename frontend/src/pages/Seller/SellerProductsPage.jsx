import React, { useState, useEffect } from "react";
import { Box, Divider, Grid } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchProductsBySellerId } from "../../services/api";
import ProductCard from "../../components/sellerComponents/ProductCard";
import { useLocation, useOutletContext } from "react-router";
import ManageProductPage from "./ManageProductPage";
import Typography from "@mui/material/Typography";

const SellerProductsPage = ({ id }) => {
  const [archivedProducts, setArchivedProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get("id");

  useEffect(() => {
    const fetchMyProducts = async () => {
      const result = await fetchProductsBySellerId(id);

      // Split products into archived and active
      const archived = result.filter((product) => product.archived);
      const active = result.filter((product) => !product.archived);

      setArchivedProducts(archived);
      setActiveProducts(active);
      setFetch(fetch + 1);
    };

    try {
      fetchMyProducts();
    } catch (err) {
      console.log(err);
    }

    if (product_id) {
      setActiveButton(null);
    }
  }, [product_id, fetch, id]);

  // Handle toggle archive status
  const handleToggleArchive = (productId, isArchived) => {
    if (isArchived) {
      // Move from active to archived
      const product = activeProducts.find((p) => p._id === productId);
      setActiveProducts(activeProducts.filter((p) => p._id !== productId));
      setArchivedProducts([
        ...archivedProducts,
        { ...product, archived: true },
      ]);
    } else {
      // Move from archived to active
      const product = archivedProducts.find((p) => p._id === productId);
      setArchivedProducts(archivedProducts.filter((p) => p._id !== productId));
      setActiveProducts([...activeProducts, { ...product, archived: false }]);
    }
  };

  const selectedProduct =
    activeProducts.find((prod) => prod._id === product_id) ||
    archivedProducts.find((prod) => prod._id === product_id);

  return !product_id ? (
    <Box>
      {/* Active Products Section */}
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          mb: "25px",
          color: "grey",
          textAlign: "left",
        }}
      >
        Active Products
      </Typography>
      <Grid container spacing={2}>
        {activeProducts.length === 0 &&
          (fetch < 1 ? (
            <Grid xs={12}>
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            </Grid>
          ) : (
            <Grid xs={12}>
              <h2>No Active Products Found</h2>
            </Grid>
          ))}
        {activeProducts.map((product) => (
          <Grid xs={12} sm={6} key={product._id}>
            <ProductCard
              product={product}
              setActiveButton={setActiveButton}
              onToggleArchive={handleToggleArchive}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mt: "20px", mb: "20px" }} />
      {/* Archived Products Section */}
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          mb: "25px",
          color: "grey",
          textAlign: "left",
        }}
      >
        Archived Products
      </Typography>
      <Grid container spacing={2}>
        {archivedProducts.length === 0 &&
          (fetch < 1 ? (
            <Grid xs={12}>
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            </Grid>
          ) : (
            <Grid xs={12}>
              <h2>No Archived Products Found</h2>
            </Grid>
          ))}
        {archivedProducts.map((product) => (
          <Grid xs={12} sm={6} key={product._id}>
            <ProductCard
              product={product}
              setActiveButton={setActiveButton}
              onToggleArchive={handleToggleArchive}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <ManageProductPage
      product={selectedProduct}
      productId={selectedProduct ? selectedProduct._id : null}
    />
  );
};

export default SellerProductsPage;
