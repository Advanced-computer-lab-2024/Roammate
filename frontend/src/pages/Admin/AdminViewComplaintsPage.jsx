import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { approveComplaint } from "../../services/api";

const AdminViewComplaint = ({ complaint }) => {
  const [reply, setReply] = useState(complaint.reply || "");
  const [status, setStatus] = useState(complaint.status);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!reply) {
      alert("Please provide a reply before approving.");
      return;
    }
    setLoading(true);
    try {
      await approveComplaint({ reply }, complaint._id);
      setStatus("Resolved");
    } catch (error) {
      console.error("Failed to approve complaint:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!complaint) {
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
          {complaint.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Body */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
        >
          Complaint Details
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          {complaint.body}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Tourist Info */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Issuer Information
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Username: {complaint.issuerId.username} <br />
          User ID: {complaint.issuerId._id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Reply */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Admin Reply
        </Typography>
        {status === "Resolved" ? (
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            {reply || "No reply provided yet."}
          </Typography>
        ) : (
          <TextField
            label="Write a Reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}

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
            color: status === "Resolved" ? "success.main" : "warning.main",
            fontWeight: "bold",
          }}
        >
          {status === "Resolved" ? "Approved" : "Pending Approval"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Creation Date */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Created On
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {dayjs(complaint.createdAt).format("MMMM D, YYYY")}
        </Typography>

        {/* Approve Button */}
        {status !== "Resolved" && (
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              disabled={loading}
            >
              {loading ? "Approving..." : "Approve"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminViewComplaint;
