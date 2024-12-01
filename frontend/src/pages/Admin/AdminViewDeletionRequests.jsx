import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import {
  approveDeletionRequest,
  denyDeletionRequest,
} from "../../services/api";

const AdminViewDeletionRequest = ({ request }) => {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveDeletionRequest(request._id);
      setStatus("approved");
    } catch (error) {
      console.error("Failed to approve deletion request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    setLoading(true);
    try {
      await denyDeletionRequest(request._id);
      setStatus("denied");
    } catch (error) {
      console.error("Failed to deny deletion request:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!request) {
    return (
      <CircularProgress />
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
          Username:{" "}
          {request.accountId.username !== null ? request.accountId.username : "No id"}
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
            color:
              status === "approved"
                ? "success.main"
                : status === "denied"
                  ? "error.main"
                  : "warning.main",
            fontWeight: "bold",
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
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

        {/* Approve/Deny Buttons */}
        {status === "pending" && (
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 5 }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              disabled={loading}
            >
              {loading ? "Approving..." : "Approve"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeny}
              disabled={loading}
            >
              {loading ? "Denying..." : "Deny"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminViewDeletionRequest;
