import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, TextField } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import { useNavigate } from "react-router";
import { approveComplaint } from "../../services/api";

const ComplaintCard = ({ complaint }) => {
  const [status, setStatus] = useState(complaint.status);
  const [reply, setReply] = useState(complaint.reply || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Card sx={{ width: 500, mb: 4 }}>
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
            {complaint.title}
          </Typography>
        </Box>

        {/* Complaint Body */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "left",
            mb: "10px",
            width: "100%",
          }}
        >
          {complaint.body}
        </Typography>

        {/* Tourist Info */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "left",
            mb: "10px",
            width: "100%",
          }}
        >
          <strong>username:</strong> {complaint.issuerId.username} <br />
          <strong>email: </strong>{complaint.issuerId.email}
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
            Submitted on: {dayjs(complaint.createdAt).format("YYYY/MM/DD")}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {status === "Resolved" ? (
              <CheckCircleIcon sx={{ fill: "green", mr: 1 }} />
            ) : (
              <PendingIcon sx={{ fill: "orange", mr: 1 }} />
            )}
            <Typography
              fontSize={14}
              sx={{ color: status === "Resolved" ? "green" : "orange" }}
            >
              {status}
            </Typography>
          </Box>
        </Box>

        {/* Reply Field */}
        {status !== "Resolved" && (
          <TextField
            label="Add a Reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 1,
          mt: -1,
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/admin/complaints?id=${complaint._id}`)}
          endIcon={<ArrowForwardIosIcon />}
        >
          View Details
        </Button>
        {status !== "Resolved" && (
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

export default ComplaintCard;
