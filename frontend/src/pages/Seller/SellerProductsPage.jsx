import React, { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
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

  return !product_id ? (
    <Box>
      {/* Active Products Section */}
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Active Products
      </Typography>
      <Grid2 container spacing={1}>
        <Grid2 xs={12} sx={{ flexGrow: 1 }}>
          {activeProducts.length === 0 &&
            (fetch < 1 ? (
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            ) : (
              <h2>No Active Products Found</h2>
            ))}
          {activeProducts.map((product) => (
            <div key={product._id}>
              <ProductCard
                product={product}
                setActiveButton={setActiveButton}
                onToggleArchive={handleToggleArchive}
              />
            </div>
          ))}
        </Grid2>
      </Grid2>

      {/* Archived Products Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Archived Products
      </Typography>
      <Grid2 container spacing={1}>
        <Grid2 xs={12} sx={{ flexGrow: 1 }}>
          {archivedProducts.length === 0 &&
            (fetch < 1 ? (
              <h2>
                Loading
                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
              </h2>
            ) : (
              <h2>No Archived Products Found</h2>
            ))}
          {archivedProducts.map((product) => (
            <div key={product._id}>
              <ProductCard
                product={product}
                setActiveButton={setActiveButton}
                onToggleArchive={handleToggleArchive}
              />
            </div>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  ) : (
    <ManageProductPage
      product={
        activeProducts.find((prod) => prod._id === product_id) ||
        archivedProducts.find((prod) => prod._id === product_id)
      }
    />
  );
};

export default SellerProductsPage;
