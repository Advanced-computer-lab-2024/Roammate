import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { approveDeletionRequest } from "../../services/api";

const AdminViewDeletionRequest = ({ request }) => {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveDeletionRequest(request._id);
      setStatus("Approved");
    } catch (error) {
      console.error("Failed to approve deletion request:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!request) {
    return (
      <h2>
        Loading
        <CachedIcon
          sx={{
            fontSize: "25px",
            ml: "10px",
            mb: "-5px",
          }}
        />
      </h2>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Account Deletion Request
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Account Info */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
        >
          Account Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          Account Type: {request.accountType} <br />
          Account ID: {request.accountId}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Status */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Status
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: status === "Approved" ? "success.main" : "warning.main",
            fontWeight: "bold",
          }}
        >
          {status === "Approved" ? "Approved" : "Pending Approval"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Creation Date */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Requested On
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {dayjs(request.createdAt).format("MMMM D, YYYY")}
        </Typography>

        {/* Approve Button */}
        {status !== "Approved" && (
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              disabled={loading}
            >
              {loading ? "Approving..." : "Approve Deletion Request"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminViewDeletionRequest;
