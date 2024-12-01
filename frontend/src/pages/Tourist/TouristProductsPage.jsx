import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import ProductCard from "../../components/touristComponents/ProductCard";
import CachedIcon from "@mui/icons-material/Cached";
import SearchBar from "../../components/touristComponents/SearchBar";
import { searchAndFilterProducts } from "../../services/api";
import SortAndFilterProducts from "../../components/touristComponents/SortAndFilterProducts";
import { useLocation, useOutletContext } from "react-router";
import TouristViewProduct from "./TouristViewProductPage";

const TouristProductsPage = () => {
  const touristId = localStorage.getItem("userId");

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAndSortCriteria, setFilterAndSortCriteria] = useState({});
  const [fetch, setFetch] = useState(0);
  const { setActiveButton } = useOutletContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryProductId = queryParams.get("id");

  useEffect(() => {
    fetchProducts();
    if (queryProductId) {
      setActiveButton(null);
    }
  }, [queryProductId, fetch]);

  const fetchProducts = async () => {
    const searchFilterAndSortCriteria = {
      query: searchQuery,
      ...filterAndSortCriteria
    };
    const queryParameters = new URLSearchParams(searchFilterAndSortCriteria);
    // console.log(queryParameters.toString());
    const result = await searchAndFilterProducts(queryParameters);
    setProducts(result);
  };

  return !queryProductId ? (
    <Box>
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
          {products.length === 0 &&
            (fetch < 1 ? <CircularProgress /> : <h2>No Products Found</h2>)}
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} id={touristId} />
            </div>
          ))}
        </Grid2>

        <SortAndFilterProducts
          setFilterAndSortCriteria={setFilterAndSortCriteria}
          setFetch={setFetch}
        />
      </Grid2>
    </Box>
  ) : (
    <TouristViewProduct id={queryProductId} />
  );
};

export default TouristProductsPage;
