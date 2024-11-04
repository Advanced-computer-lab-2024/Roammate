const AccountDeletionRequest = require("../models/AccountDeletionRequest");
const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
const Seller = require("../models/Seller");
const mongoose = require("mongoose");

// Get all deletion requests
const getAllDeletionRequests = async (req, res) => {
  try {
    const deletionRequests = await AccountDeletionRequest.find();
    res.status(200).json(deletionRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get deletion requests by user ID
const getDeletionRequestsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletionRequests = await AccountDeletionRequest.find({
      accountId: userId,
    });
    if (!deletionRequests.length) {
      return res
        .status(404)
        .json({ message: "No deletion requests found for this user." });
    }
    res.status(200).json(deletionRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a deletion request by ID
const deleteDeletionRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const deletionRequest = await AccountDeletionRequest.findByIdAndDelete(id);
    if (!deletionRequest) {
      return res.status(404).json({ message: "Deletion request not found." });
    }
    res.status(200).json({ message: "Deletion request deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a deletion request's status to "approved" or "pending"
const editDeletionRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "pending"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed values are 'approved' or 'pending'.",
    });
  }

  try {
    const deletionRequest = await AccountDeletionRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!deletionRequest) {
      return res.status(404).json({ message: "Deletion request not found." });
    }
    res.status(200).json({
      message: "Deletion request status updated successfully.",
      deletionRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeletionRequestsFilterCriteria = (status) => {
  const filter = {};
  if (status) {
    filter.status = status;
  }
  return filter;
};

const getDeletionRequestsSortCriteria = (order) => {
  const sortCriteria = {};
  if (order === "createdAt") {
    sortCriteria.createdAt = 1; // Ascending
  } else if (order === "-createdAt") {
    sortCriteria.createdAt = -1; // Descending
  } else {
    sortCriteria.createdAt = -1; // Default to descending if order is not specified
  }
  return sortCriteria;
};

const searchDeletionRequestsWithFiltersAndSort = async (req, res) => {
  const { status, order } = req.query;

  try {
    const filterCriteria = getDeletionRequestsFilterCriteria(status);
    const sortCriteria = getDeletionRequestsSortCriteria(order);

    const deletionRequests = await AccountDeletionRequest.find(filterCriteria)
      .populate("accountId") // Populate user details based on account type, if needed
      .sort(sortCriteria);

    res.status(200).json(deletionRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveDeletionRequest = async (req, res) => {
  const { deletionRequestId } = req.params;

  try {
    // Step 1: Find the deletion request by ID and update its status to "approved"
    const deletionRequest = await AccountDeletionRequest.findByIdAndUpdate(
      deletionRequestId,
      { status: "approved" },
      { new: true }
    );

    if (!deletionRequest) {
      return res.status(404).json({ message: "Deletion request not found" });
    }

    // Step 2: Determine the correct model based on accountType
    const { accountType, accountId } = deletionRequest;
    let Model;

    switch (accountType) {
      case "Tourist":
        Model = Tourist;
        break;
      case "Tour Guide":
        Model = TourGuide;
        break;
      case "Advertiser":
        Model = Advertiser;
        break;
      case "Seller":
        Model = Seller;
        break;
      default:
        return res.status(400).json({ message: "Invalid account type" });
    }

    // Step 3: Delete the user from the appropriate model based on accountId
    const deletedUser = await Model.findByIdAndDelete(accountId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Send a success response
    res.status(200).json({
      message: `${accountType} with ID ${accountId} has been deleted successfully.`,
      deletionRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const denyDeletionRequest = async (req, res) => {
  const { deletionRequestId } = req.params;
  try {
    const deletionRequest = await AccountDeletionRequest.findByIdAndUpdate(
      deletionRequestId,
      { status: "denied" },
      { new: true }
    );
    if (!deletionRequest) {
      return res.status(404).json({ message: "Deletion request not found" });
    }
    res.status(200).json(deletionRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkDeletionRequestStatus = async (req, res) => {
  const { accountId, accountType } = req.query;

  try {
    const deletionRequest = await AccountDeletionRequest.findOne({
      accountId: new mongoose.Types.ObjectId(accountId),
      accountType,
    }).lean(); // Optional: use `lean()` to get a plain JavaScript object without Mongoose metadata

    if (!deletionRequest) {
      return res.status(404).json({ message: "No deletion request found." });
    }

    res.status(200).json({
      status: deletionRequest.status,
      createdAt: deletionRequest.createdAt,
      accountId: deletionRequest.accountId,
      accountType: deletionRequest.accountType,
    });
  } catch (error) {
    console.error("Error fetching deletion request status:", error);
    res
      .status(500)
      .json({ message: "Error checking deletion request status." });
  }
};

module.exports = {
  approveDeletionRequest,
  denyDeletionRequest,
  getAllDeletionRequests,
  getDeletionRequestsByUserId,
  deleteDeletionRequest,
  editDeletionRequestStatus,
  searchDeletionRequestsWithFiltersAndSort,
  checkDeletionRequestStatus,
};
