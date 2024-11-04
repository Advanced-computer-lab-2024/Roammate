import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";
import { approveDeletionRequest } from "../../services/api";

const DeletionRequestCard = ({ request, onApprove }) => {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveDeletionRequest(request._id);
      setStatus("approved");
      onApprove(request._id); // Trigger any additional actions on approval
    } catch (error) {
      console.error("Failed to approve deletion request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 650, mb: 4 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            width: "100%",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "left",
            }}
          >
            Account Deletion Request
          </Typography>
        </Box>

        {/* Account Type and ID */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "left",
            mb: "10px",
            width: "100%",
          }}
        >
          Account Type: {request.accountType} <br />
          Account ID: {request.accountId}
        </Typography>

        {/* Date and Status */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{
              fontSize: "16px",
              color: "text.secondary",
            }}
          >
            Requested on: {new Date(request.createdAt).toLocaleDateString()}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {status === "approved" ? (
              <CheckCircleIcon sx={{ fill: "green", mr: 1 }} />
            ) : (
              <PendingIcon sx={{ fill: "orange", mr: 1 }} />
            )}
            <Typography
              fontSize={14}
              sx={{ color: status === "approved" ? "green" : "orange" }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          mt: -1,
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/admin/deletion-requests?id=${request._id}`)}
          endIcon={<ArrowForwardIosIcon />}
        >
          View Details
        </Button>
        {status !== "approved" && (
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            disabled={loading}
          >
            {loading ? "Approving..." : "Approve"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default DeletionRequestCard;
