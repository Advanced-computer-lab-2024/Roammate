import React, { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import { useNavigate } from "react-router";

const ComplaintCard = ({ complaint }) => {
  const [status, setStatus] = useState(complaint.status);
  const [title, setTitle] = useState(complaint.title);
  const [body, setBody] = useState(complaint.body);
  const [createdAt, setCreatedAt] = useState(complaint.createdAt);
  const navigate = useNavigate();

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
            {title}
          </Typography>
          <IconButton
            size="small"
            color="primary"
            sx={{
              mt: "-5px",
              ml: "10px",
            }}
          >
            <ShareIcon />
          </IconButton>
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
          {body}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "left",
              fontSize: "16px",
              color: "text.secondary",
            }}
          >
            Submitted on: {dayjs(createdAt).format("YYYY/MM/DD")}
          </Typography>

          <IconButton
            size="small"
            disabled
            color="primary"
            sx={{
              ml: "10px",
            }}
          >
            {status === "Resolved" ? (
              <CheckCircleIcon sx={{ fill: "green" }} />
            ) : (
              <PendingIcon sx={{ fill: "orange" }} />
            )}
            <Typography
              fontSize={14}
              sx={{
                color: `${status === "Resolved" ? "green" : "orange"}`,
                ml: "5px",
              }}
            >
              {status}
            </Typography>
          </IconButton>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          mb: "10px",
          mt: "-20px",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/tourist/complaints?id=${complaint._id}`)}
          endIcon={<ArrowForwardIosIcon />}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComplaintCard;
