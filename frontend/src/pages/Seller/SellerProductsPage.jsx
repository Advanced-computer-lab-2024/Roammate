import React, { useState, useEffect, useCallback } from "react";
import { Box, Checkbox, CircularProgress, Divider, FormControlLabel, FormGroup, Grid, Grid2 } from "@mui/material";
import { fetchProductsBySellerId } from "../../services/api";
import ProductCard from "../../components/sellerComponents/ProductCard";
import { useLocation, useOutletContext } from "react-router";
import ManageProductPage from "./ManageProductPage";
import Typography from "@mui/material/Typography";
import SearchBar from "../../components/touristComponents/SearchBar";
import SortAndFilterProducts from "../../components/touristComponents/SortAndFilterProducts";

const SellerProductsPage = () => {
  const id = localStorage.getItem("userId");

  const [archivedProducts, setArchivedProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [fetchProducts, setFetchProducts] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get("id");
  const [rerender, setRerender] = useState(0);

  //For search, filter and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  //-------------------------------------------------------------------------

  const [active, setActive] = useState(true);
  const [archived, setArchived] = useState(true);

  useEffect(() => {
    // console.log("rerendering");

    const fetchMyProducts = async () => {
      const searchFilterAndSortCriteria = {
        query: searchQuery,
        ...filterAndSortCriteria
      };
      const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
      const result = await fetchProductsBySellerId(id, queryParameters);
      // console.log(result);
      // Split products into archived and active
      const archived = result.filter((product) => product.archived);
      const active = result.filter((product) => !product.archived);

      setArchivedProducts(archived);
      setActiveProducts(active);
      setFetchProducts(fetchProducts + 1);
    }

    try {
      setArchivedProducts([]);
      setActiveProducts([]);
      setFetchProducts(0);
      fetchMyProducts();
    } catch (err) {
      console.log(err);
    }
    if (product_id) {
      setActiveButton(null);
    }
  }, [id, product_id, fetch, rerender]);


  // const updateProductStatus = useCallback(
  //   (updatedProduct) => {
  //     console.log("updating product status", updatedProduct);
  //     setActiveProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product._id === updatedProduct._id ? updatedProduct : product
  //       )
  //     );
  //     setArchivedProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product._id === updatedProduct._id ? updatedProduct : product
  //       )
  //     );
  //   },
  //   [setActiveProducts, setArchivedProducts]
  // );

  const selectedProduct =
    activeProducts.find((prod) => prod._id === product_id) ||
    archivedProducts.find((prod) => prod._id === product_id);

  return !product_id ? (
    <Box ml={3}>
      {/* Active Products Section */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFetch={setFetch}
      />

      <Grid2 container spacing={1}>
        <Grid2
          xs={12}
          sx={{
            flexGrow: 1,
          }}
        >
          <FormGroup sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            mb: "20px",
            gap: "20px"
          }}>
            <FormControlLabel control={<Checkbox defaultChecked size="medium" onChange={() => setActive(!active)} />} label="View Active Products" />
            <FormControlLabel control={<Checkbox defaultChecked size="medium" onChange={() => setArchived(!archived)} />} label="View Archived Products" />
          </FormGroup>


          {active && <Box>
            {/* Active Products Section */}
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                mt: "20px",
                mb: "35px",
                color: "grey",
                textAlign: "left",
              }}
            >
              Active Products
            </Typography>
            {activeProducts.length === 0 &&
              (fetchProducts < 1 ? (
                <CircularProgress />
              ) : (
                <h2>No Active Products Found</h2>
              ))}
            {activeProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                // updateProductStatus={updateProductStatus}
                setRerender={setRerender}
              />
            ))}

          </Box>}





          {/* Archived Products Section */}
          {archived && <Box >

            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                mb: "35px",
                color: "grey",
                textAlign: "left",
              }}
            >
              Archived Products
            </Typography>
            {archivedProducts.length === 0 &&
              (fetchProducts < 1 ? (
                <CircularProgress />
              ) : (
                <h2>No Archived Products Found</h2>
              ))}
            {archivedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                // updateProductStatus={updateProductStatus}
                setRerender={setRerender}
              />
            ))}
          </Box>}


        </Grid2>

        <SortAndFilterProducts
          setFilterAndSortCriteria={setFilterAndSortCriteria}
          setFetch={setFetch}
        />

      </Grid2>
    </Box>

  ) : (
    <ManageProductPage
      product={selectedProduct}
      productId={selectedProduct ? selectedProduct._id : null}
    />
  );
};

export default SellerProductsPage;
