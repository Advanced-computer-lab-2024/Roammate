import React, { useState } from "react";
import { addGovernor } from "../../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
} from "@mui/material";

const AddGovernorPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addGovernor(formData);
      setMessage(`Tourism Governor "${result.username}" added successfully!`);
      setError(null);
      setFormData({ username: "", password: "" });
    } catch (err) {
      setError(err.error || "Failed to add governor.");
      setMessage(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          Add Tourism Governor
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Add Governor
          </Button>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddGovernorPage;
