import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import {
  requestProfileDeletion,
  checkDeletionRequestStatus,
} from "../../services/api"; // Assuming API has checkDeletionRequestStatus

const DeleteProfileRequest = ({ id, type }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isRequestPending, setIsRequestPending] = useState(false);

  useEffect(() => {
    const fetchDeletionStatus = async () => {
      try {
        const response = await checkDeletionRequestStatus(id, type);
        if (response.status === "Pending") {
          setIsRequestPending(true);
          setStatus("A deletion request is already pending.");
        }
      } catch (error) {
        console.error("Error checking deletion request status:", error);
      }
    };

    fetchDeletionStatus();
  }, [id, type]);

  const handleDeleteRequest = async () => {
    try {
      await requestProfileDeletion(id, type);
      setStatus("Deletion request sent successfully.");
      setError("");
      setIsRequestPending(true);
    } catch (error) {
      setError("Failed to send deletion request.");
      setStatus("");
      console.error("Deletion request error:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Request Account Deletion
      </Typography>
      {status && <Typography color="success.main">{status}</Typography>}
      {error && <Typography color="error.main">{error}</Typography>}
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteRequest}
        disabled={isRequestPending}
        sx={{ mt: 2, width: "100%" }}
      >
        {isRequestPending
          ? "Deletion Request Pending"
          : "Request Account Deletion"}
      </Button>
    </Box>
  );
};

export default DeleteProfileRequest;
