import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import dayjs from "dayjs";

const TouristViewComplaint = ({ complaint }) => {
  if (!complaint) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">
          Loading
          <CachedIcon
            sx={{
              fontSize: "25px",
              ml: "10px",
              mb: "-5px",
            }}
          />
        </Typography>
      </Box>
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
          Complaint Body
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          {complaint.body}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Reply */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
        >
          Reply from Admin
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: complaint.reply ? "text.secondary" : "text.disabled",
            fontStyle: complaint.reply ? "normal" : "italic",
          }}
        >
          {complaint.reply ? complaint.reply : "No reply provided yet."}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Status */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
        >
          Status
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color:
              complaint.status === "Resolved" ? "success.main" : "warning.main",
            fontWeight: "bold",
          }}
        >
          {complaint.status === "Resolved" ? "Approved" : "Pending Approval"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Creation Date */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
        >
          Created On
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {dayjs(complaint.createdAt).format("MMMM D, YYYY")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TouristViewComplaint;
