import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../services/api";

const ManageAddressesComponent = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newAddressData, setNewAddressData] = useState({});
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await fetchUserAddresses(userId);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setNewAddressData(address);
    setEditMode(true);
    setCreateMode(false);
  };

  const handleSaveAddress = async () => {
    try {
      await updateAddress(selectedAddress._id, newAddressData);
      const updatedAddresses = addresses.map((addr) =>
        addr._id === selectedAddress._id
          ? { ...newAddressData, _id: addr._id }
          : addr
      );
      setAddresses(updatedAddresses);
      setEditMode(false);
      setSelectedAddress(null);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleCreateAddress = async () => {
    try {
      const newAddress = await createAddress(userId, newAddressData);
      setAddresses([...addresses, newAddress]);
      setCreateMode(false);
      setNewAddressData({});
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      const updatedAddresses = addresses.filter(
        (addr) => addr._id !== addressId
      );
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(userId, addressId);
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === addressId,
      }));
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
        Manage Delivery Addresses
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        startIcon={<AddIcon />}
        onClick={() => {
          setCreateMode(true);
          setEditMode(false);
          setNewAddressData({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          });
        }}
      >
        Add New Address
      </Button>
      <List>
        {addresses.map((address) => (
          <Card
            key={address._id}
            sx={{
              mb: 2,
              backgroundColor: address.isDefault ? "#e8f5e9" : "#fff",
            }}
          >
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={`${address.addressLine1}, ${
                    address.city || "Unknown City"
                  }, ${address.country || "Unknown Country"}`}
                  secondary={
                    address.isDefault
                      ? "Default Address"
                      : "Click the checkmark to set as default"
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEditAddress(address)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleSetDefault(address._id)}
                    color={address.isDefault ? "primary" : "default"}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteAddress(address._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>

      {(editMode || createMode) && (
        <Box
          sx={{
            mt: 4,
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            {editMode ? "Edit Address" : "Add New Address"}
          </Typography>
          <TextField
            label="Address Line 1"
            value={newAddressData.addressLine1}
            onChange={(e) =>
              setNewAddressData({
                ...newAddressData,
                addressLine1: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address Line 2"
            value={newAddressData.addressLine2}
            onChange={(e) =>
              setNewAddressData({
                ...newAddressData,
                addressLine2: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            value={newAddressData.city}
            onChange={(e) =>
              setNewAddressData({ ...newAddressData, city: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="State"
            value={newAddressData.state}
            onChange={(e) =>
              setNewAddressData({ ...newAddressData, state: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Postal Code"
            value={newAddressData.postalCode}
            onChange={(e) =>
              setNewAddressData({
                ...newAddressData,
                postalCode: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Country"
            value={newAddressData.country}
            onChange={(e) =>
              setNewAddressData({ ...newAddressData, country: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            {editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveAddress}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateAddress}
              >
                Add Address
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setEditMode(false);
                setCreateMode(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ManageAddressesComponent;
