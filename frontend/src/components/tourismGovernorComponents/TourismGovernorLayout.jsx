import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MuseumIcon from "@mui/icons-material/Museum";
import LabelIcon from '@mui/icons-material/Label';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../services/api";

import { Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const navItems = ["Home", "Add Musuems", "Manage Tags"];

const drawerWidth = 240;
const TourismGovernorLayout = () => {
  const [open, setOpen] = React.useState(false);
  const [buttons, setButtons] = React.useState(["Museums"]);
  const [activeButton, setActiveButton] = React.useState("Museums");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (activeButton === "Home") {
      setActiveButton("Museums");
    }
    if (activeButton === "Museums") {
      navigate(`/tourismGovernor/musuems?id=`);
    } else if (activeButton === "Add Musuems") {
      //   navigate("/seller");
    } else if (activeButton === "Edit Profile") {
      navigate("/tourismGovernor/editProfile");
    }
  }, [activeButton, navigate]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="right"
        alignItems="center"
        sx={{ height: 64 }}
      >
        <IconButton size="medium" onClick={toggleDrawer(false)} sx={{ mr: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((text, index) => (
          <ListItem
            disablePadding
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemButton onClick={() => setActiveButton(text)}>
              {text === "Home" ? <HomeIcon /> : <MuseumIcon />}
              <ListItemText primary={text} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        pl: `calc(${open ? drawerWidth : 0}px)`,
        transition: "padding-left 225ms",
      }}
    >
      <CssBaseline />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: `calc(${open ? drawerWidth : 0}px)`,
          transition: "padding-left 225ms",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: `${open ? "none" : "block"}`,
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "left",
              }}
            >
              R
            </Typography>
            <PublicIcon />
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "left",
              }}
            >
              AMMATE
            </Typography>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="profile"
            sx={{ ml: 2 }}
            onClick={handleLogOut}
          >
            <LogoutIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="profile"
            sx={{ ml: 2 }}
            onClick={() => setActiveButton("Edit Profile")}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary",
          mt: "50px",
          mb: "0",
        }}
      >
        <Box
          variant="text"
          aria-label="text primary button group"
          sx={{
            mb: "20px",
          }}
        >
          {buttons.map((button, index) => (
            <Button
              variant="text"
              key={index}
              onClick={() => setActiveButton(button)}
              sx={{
                borderBottom: `${activeButton === button ? "3px solid lightgreen" : "default"
                  }`,
              }}
            >
              {button}
            </Button>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          mt: "0px",
        }}
      >
        <Outlet context={{ setActiveButton }} />
      </Box>
    </Box>
  );
};

export default TourismGovernorLayout;
