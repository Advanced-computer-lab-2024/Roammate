const { DeliveryAddress } = require("../models");
const { User } = require("../models");
const mongoose = require("mongoose");

// Create a new delivery address
const createDeliveryAddress = async (req, res) => {
  const {
    userId,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = req.body;

  try {
    const newAddress = new DeliveryAddress({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    const savedAddress = await newAddress.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { deliveryAddresses: savedAddress._id } },
      { new: true }
    );

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Error creating delivery address", error });
  }
};

// Get all delivery addresses for a user
const getDeliveryAddressesByUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Find the user and populate only the deliveryAddresses field
    const user = await User.findById(userId, "deliveryAddresses").populate(
      "deliveryAddresses"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.deliveryAddresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving delivery addresses", error });
  }
};

// Update a delivery address by ID
const updateDeliveryAddressById = async (req, res) => {
  const { id } = req.params;
  const {
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid address ID" });
  }

  try {
    const updatedAddress = await DeliveryAddress.findByIdAndUpdate(
      id,
      {
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        isDefault,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Delivery address not found" });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Error updating delivery address", error });
  }
};

// Delete a delivery address by ID
const deleteDeliveryAddressById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid address ID" });
  }

  try {
    // Find the address to delete
    const addressToDelete = await DeliveryAddress.findById(id);

    if (!addressToDelete) {
      return res.status(404).json({ message: "Delivery address not found" });
    }

    const userId = addressToDelete.userId;

    // Count the total addresses for the user
    const addressCount = await DeliveryAddress.count({ userId });

    if (addressCount === 1) {
      return res
        .status(400)
        .json({ message: "Cannot delete the only delivery address" });
    }

    // Delete the address
    const deletedAddress = await DeliveryAddress.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Failed to delete address" });
    }

    // If the deleted address was default, set another address as default
    if (addressToDelete.isDefault) {
      const anotherAddress = await DeliveryAddress.findOne({ userId });

      if (anotherAddress) {
        anotherAddress.isDefault = true;
        await anotherAddress.save();
      }
    }

    res.status(200).json({ message: "Delivery address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting delivery address", error });
  }
};

const setDefaultAddress = async (req, res) => {
  const { userId } = req.params;
  const { addressId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(addressId)
  ) {
    return res.status(400).json({ message: "Invalid user ID or address ID" });
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the address belongs to the user
    const addressExists = user.deliveryAddresses.some(
      (addrId) => addrId.toString() === addressId
    );
    if (!addressExists) {
      return res
        .status(400)
        .json({ message: "Address does not belong to the user" });
    }

    // Update all addresses to not default
    await DeliveryAddress.updateMany({ userId }, { isDefault: false });

    // Set the specified address to default
    const updatedAddress = await DeliveryAddress.findByIdAndUpdate(
      addressId,
      { isDefault: true },
      { new: true }
    );

    res.status(200).json({
      message: "Default address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Error setting default address", error });
  }
};

module.exports = {
  createDeliveryAddress,
  getDeliveryAddressesByUser,
  updateDeliveryAddressById,
  deleteDeliveryAddressById,
  setDefaultAddress,
};
