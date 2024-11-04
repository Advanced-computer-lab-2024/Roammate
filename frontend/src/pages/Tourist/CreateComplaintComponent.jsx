import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createComplaint } from "../../services/api"; // Assume this API function posts a complaint
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const PostComplaintForm = ({ touristId, onComplaintPosted }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newComplaint = { title, body, issuerId: touristId };
      await createComplaint(newComplaint);
      setTitle("");
      setBody("");
      onComplaintPosted();
    } catch (err) {
      setError("Failed to post complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "650px",
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

      }}>
        <ReportProblemIcon sx={{ fontSize: 30, color: "red" }} />
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
          Post a Complaint
        </Typography>
      </Box>

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        size="small"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        fullWidth
        multiline
        rows={2}
        required
        size="small"
        sx={{ mb: 1 }}
      />
      {error && (
        <Typography color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}
      {
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          disabled={loading || !title || !body}
          fullWidth
        >
          {loading ? "Posting..." : "Submit"}
        </Button>
      }

    </Box>
  );
};

export default PostComplaintForm;
