import React from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationDropdown = ({ notifications, setNotifications, clearAllUserNotifications }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // Mark all notifications as read when the menu is closed
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    clearAllUserNotifications();
  };

  return (
    <>
      {/* Notification Button */}
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.filter((n) => !n.isRead).length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notification Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: "60ch",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ padding: "16px", backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Notifications
          </Typography>
        </Box>
        <Divider />

        {/* Notifications */}
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem
              key={index}
              sx={{
                padding: 0,
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  boxShadow: notification.isRead ? "none" : "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  borderLeft: notification.isRead ? "4px solid #ccc" : "4px solid #1976d2",
                  padding: "8px",
                  margin: "4px",
                  transition: "box-shadow 0.3s ease, background-color 0.3s ease",
                }}
              >
                <CardContent sx={{ padding: "8px" }}>
                  <ListItemText
                    primary={notification.message}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: notification.isRead ? "400" : "600",
                      color: notification.isRead ? "text.secondary" : "text.primary",
                    }}
                  />
                </CardContent>
              </Card>
            </MenuItem>
          ))
        ) : (
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationDropdown;
