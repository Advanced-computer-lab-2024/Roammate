import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import {
  requestProfileDeletion,
  checkDeletionRequestStatus,
} from "../../services/api";

const DeleteProfileRequest = ({ id, type }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isRequestPending, setIsRequestPending] = useState(false);

  useEffect(() => {
    const fetchDeletionStatus = async () => {
      try {
        const response = await checkDeletionRequestStatus(id, type);
        setStatus(response.status); // Set the current status from the response

        // Determine button behavior based on status
        if (response.status === "pending") {
          setIsRequestPending(true);
        } else {
          setIsRequestPending(false);
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
      setStatus("pending"); // Update the status to pending immediately
      setError("");
      setIsRequestPending(true);
    } catch (error) {
      setError("You can't request deletion.");
      setStatus("");
      console.error("Deletion request error:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Request Account Deletion
      </Typography>
      {status && <Typography color="success.main">Status: {status}</Typography>}
      {error && <Typography color="error.main">{error}</Typography>}
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteRequest}
        disabled={isRequestPending && status === "pending"} // Disable only if pending
        sx={{ mt: 2, width: "100%" }}
      >
        {isRequestPending && status === "pending"
          ? "Deletion Request Pending"
          : "Request Account Deletion"}
      </Button>
    </Box>
  );
};

export default DeleteProfileRequest;
