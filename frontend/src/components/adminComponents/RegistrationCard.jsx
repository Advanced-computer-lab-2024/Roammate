import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { updateUserStatus, downloadPdf } from "../../services/api";
import { FileDownload } from "@mui/icons-material";

const RegistrationCard = ({ pendingUser, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async (fileId) => {
    try {
      let response = await downloadPdf(fileId); // blob
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "file.pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      await updateUserStatus(pendingUser._id, "accepted");
      onRemove();
    } catch (error) {
      console.error("Failed to accept:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      await updateUserStatus(pendingUser._id, "guest");
      onRemove();
    } catch (error) {
      console.error("Failed to reject:", error);
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
            @{pendingUser.username}
          </Typography>
        </Box>

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
          Role: {pendingUser.role}
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
          ID: {pendingUser._id}<br />
          Email: {pendingUser.email}

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

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => downloadFile(pendingUser.documents.identification)}
            startIcon={<FileDownload />}
          >Identification
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {pendingUser.role === "tour guide" ? downloadFile(pendingUser.documents.certificate) : downloadFile(pendingUser.documents.taxation)}}
            startIcon={<FileDownload />}
          >{pendingUser.role === "tour guide" ? "Certificate" : "Taxation Registry"} </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleAccept}
            disabled={loading}
          >
            Accept
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleReject}
            disabled={loading}
          >
            Reject
          </Button>
        </Box>

      </CardActions>
    </Card>
  );
};

export default RegistrationCard;
