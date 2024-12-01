import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeIcon from "@mui/icons-material/Home";
import SnowboardingIcon from "@mui/icons-material/Snowboarding";
import MapIcon from "@mui/icons-material/Map";
import MuseumIcon from "@mui/icons-material/Museum";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryIcon from '@mui/icons-material/Category';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { fetchUserNotifications, readAllUserNotifications } from '../../services/api';

import { Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../services/api";

import NotificationDropdown from '../sharedComponents/NotificationDropdown';

const navItems = [
  "Home",
  "Add Admin",
  "Add Governor",
  "Add Promocode",
  "Account Deletion Requests",
  'Create Product',
  "Products",
  "Activities",
  "Itineraries",
  "Monuments",
  "My Products",
];

const drawerWidth = 240;
const AdminLayout = () => {
  const adminId = localStorage.getItem('userId');
  const [open, setOpen] = React.useState(false);
  const [buttons, setButtons] = React.useState([
    "Users",
    "Registrations",
    "Complaints",
  ]);
  const [activeButton, setActiveButton] = React.useState();
  const navigate = useNavigate();

  const [notifications, setNotifications] = React.useState([]);

  const _fetchUserNotifications = async () => {
    try {
      let result = await fetchUserNotifications(adminId);
      setNotifications(result);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const _readAllUserNotifications = async () => {
    try {
      await readAllUserNotifications(adminId);
    } catch (error) {
      console.error("Error reading notifications:", error);
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/admin' && activeButton !== 'Users') {
      setActiveButton('Users');
    }

    if (activeButton === "Users") {
      navigate("/admin/users");
    } else if (activeButton === "Registrations") {
      navigate("/admin/registrations");
    } else if (activeButton === "Complaints") {
      navigate(`/admin/complaints?id=`);
    } else if (activeButton === "Edit Profile") {
      navigate("/admin/editProfile");
    } else if (activeButton === "Add Promocode") {
      navigate("/admin/add-promocode");
    } else if (activeButton === "Account Deletion Requests") {
      navigate("/admin/deletion-requests");
    } else if (activeButton === "Activities") {
      navigate(`/admin/activities?id=`);
    } else if (activeButton === "Itineraries") {
      navigate(`/admin/itineraries?id=`);
    } else if (activeButton === "Products") {
      navigate(`/admin/products?id=`);
    } else if (activeButton === "My Products") {
      navigate(`/admin/my-products?id=`);
    } else if (activeButton === 'Create Product') {
      navigate('/admin/create-product');
    }
    _fetchUserNotifications();
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

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      >

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Users")
        }>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Add Admin")
        }>
          <ListItemIcon>
            <AccountCircleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Add Admin" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Add Governor")
        }>
          <ListItemIcon>
            <AccountCircleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Add Governor" />
        </ListItemButton>

        <Divider />

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Account Deletion Requests")
        }>
          <ListItemIcon>
            <PersonRemoveIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Account Deletion Requests" />
        </ListItemButton>

        <Divider />

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Create Product")
        }>
          <ListItemIcon>
            <AddCircleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Create Product" />
        </ListItemButton>


        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("My Products")
        }>
          <ListItemIcon>
            <CategoryIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="My Products" />
        </ListItemButton>

        <Divider />

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Activities")
        }>
          <ListItemIcon>
            <SnowboardingIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Activities" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Itineraries")
        }>
          <ListItemIcon>
            <MapIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Itineraries" />
        </ListItemButton>


        <ListItemButton sx={{ pl: 4 }} onClick={
          () => setActiveButton("Monuments")
        }>
          <ListItemIcon>
            <MuseumIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Monuments" />
        </ListItemButton>

        {/* <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <CategoryIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton> */}


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

          <NotificationDropdown notifications={notifications} setNotifications={setNotifications} readAllUserNotifications={_readAllUserNotifications} />


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

export default AdminLayout;
