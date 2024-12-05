import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { getAllPromoCodes, createPromoCode } from "../../services/api";

const AdminManagePromocodesPage = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState({
    code: "",
    discount: "",
    expirationDate: "",
    usageLimit: "",
  });

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        setLoading(true);
        const result = await getAllPromoCodes();
        const sanitizedData = result.map((item) => {
          return {
            _id: item._id,
            code: item.code || "Unknown",
            discount: item.discount || 0,
            usageLimit: item.usageLimit || 0,
            status: dayjs(item.expirationDate).isAfter(dayjs()) ? "Active" : "Expired",
          };
        });
        setPromoCodes(sanitizedData);
      } catch (err) {
        console.error("Error fetching promo codes:", err);
        setPromoCodes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPromoCodes();
  }, []);

  const toggleDialog = () => setDialogOpen((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromoCode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPromoCode = async () => {
    try {
      const { code, discount, expirationDate, usageLimit } = newPromoCode;
      if (!code || !discount || !expirationDate || !usageLimit) {
        alert("All fields are required");
        return;
      }
      const addedPromoCode = await createPromoCode(
        code,
        Number(discount),
        expirationDate,
        Number(usageLimit)
      );
      const status = dayjs(addedPromoCode.expirationDate).isAfter(dayjs()) ? "Active" : "Expired";
      setPromoCodes((prev) => [
        ...prev,
        { ...addedPromoCode, status },
      ]);
      toggleDialog();
    } catch (err) {
      console.error("Error adding promo code:", err);
    }
  };

  const columns = [
    { field: "code", headerName: "Promo Code", flex: 1 },
    { field: "discount", headerName: "Discount (%)", flex: 1 },
    { field: "usageLimit", headerName: "Usage Limit", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
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
        Promo Codes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleDialog}
        sx={{ mb: 3 }}
      >
        Add New Promo Code
      </Button>
      {loading ? (
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          Loading
          <CachedIcon sx={{ fontSize: "25px", ml: "10px" }} />
        </Typography>
      ) : promoCodes.length === 0 ? (
        <Typography variant="h6">No Promo Codes Found</Typography>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={promoCodes}
            columns={columns}
            getRowId={(row) => row?._id}
          />
        </Box>
      )}
      <Divider sx={{ mt: "20px", mb: "20px" }} />

      <Dialog open={dialogOpen} onClose={toggleDialog}>
        <DialogTitle>Add New Promo Code</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="code"
            label="Promo Code"
            value={newPromoCode.code}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="discount"
            label="Discount (%)"
            type="number"
            value={newPromoCode.discount}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="expirationDate"
            label="Expiration Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newPromoCode.expirationDate}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="usageLimit"
            label="Usage Limit"
            type="number"
            value={newPromoCode.usageLimit}
            onChange={handleInputChange}
          />
        </DialogContent>
        
        <DialogActions>
          <Button
            variant="contained"
            onClick={toggleDialog}
            sx={{ backgroundColor: "red", color: "white", width: "100%" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddPromoCode}
            sx={{ backgroundColor: "green", color: "white", width: "100%" }}
          >
            Add
          </Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminManagePromocodesPage;
