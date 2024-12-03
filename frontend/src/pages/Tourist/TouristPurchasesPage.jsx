import React, { useEffect, useState } from "react";
import { fetchPurchasedProductsByTouristId } from "../../services/api";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router";
import PurchasedProductCard from "../../components/touristComponents/PurchasedProductCard";
import TouristViewPurchasedProduct from "./TouristViewPurchasedProduct";

const TouristPurchases = () => {
  const id = localStorage.getItem("userId");

  const [purchases, setPurchases] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const purchasedProductId = queryParams.get("id");

  const fetchPurchases = async () => {
    const response = await fetchPurchasedProductsByTouristId(id);
    setPurchases(response);
  };

  useEffect(() => {
    fetchPurchases();
  }, [id, purchasedProductId]);

  return (
    <div>
      {!purchasedProductId ? (
        <div>
          {purchases ? (
            <div>
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
                  Active Purchases
                </Typography>
                {purchases
                  .filter(
                    (a) => a.status === "Preparing" || a.status === "Shipped"
                  )
                  .map((purchase) => (
                    <PurchasedProductCard
                      key={purchase._id}
                      purchase={purchase}
                      userId={id}
                      onPurchaseDeleted={fetchPurchases} // Pass the callback
                    />
                  ))}
              </Box>

              <Divider
                sx={{
                  mt: "20px",
                  mb: "20px",
                }}
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
                  Purchases Completed
                </Typography>
                {purchases
                  .filter((a) => a.status === "Completed")
                  .map((purchase) => (
                    <PurchasedProductCard
                      key={purchase._id}
                      purchase={purchase}
                      onPurchaseDeleted={fetchPurchases} // Pass the callback
                    />
                  ))}
              </Box>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      ) : (
        purchases && (
          <TouristViewPurchasedProduct
            touristId={id}
            purchase={purchases.find(
              (purchase) => purchase._id === purchasedProductId
            )}
          />
        )
      )}
    </div>
  );
};

export default TouristPurchases;
