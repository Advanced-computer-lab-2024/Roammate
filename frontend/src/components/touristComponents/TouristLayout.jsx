import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import SnowboardingIcon from "@mui/icons-material/Snowboarding";
import { Favorite, Login } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import FlightIcon from '@mui/icons-material/Flight';
import MuseumIcon from "@mui/icons-material/Museum";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReportIcon from "@mui/icons-material/Report";
import { ShoppingCart } from "@mui/icons-material";
import { useState } from "react";

import { fetchUserNotifications, readAllUserNotifications } from '../../services/api';

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Badge, Collapse, ListItemIcon, ListSubheader } from "@mui/material";
import CurrencySelector from "./CurrencySelector";
import { fetchConversionRates, getUserCart, logout } from "../../services/api";
import { AirplaneTicket } from "@mui/icons-material";
import HotelIcon from '@mui/icons-material/Hotel';

import NotificationDropdown from '../sharedComponents/NotificationDropdown';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 240;
const TouristLayout = () => {
    const userId = localStorage.getItem("userId");
    const [open, setOpen] = React.useState(false);
    const [myBookingsOpen, setMyBookingsOpen] = React.useState(open);
    const [cartItemCount, setCartItemCount] = useState(0); // Track cart item count
    const [buttons, setButtons] = React.useState([
        "Activities",
        "Itineraries",
        "Products",
        "Monuments",
    ]);
    const [activeButton, setActiveButton] = React.useState(
        localStorage.getItem("activeButton")
    );
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [id, setId] = React.useState(queryParams.get("id") || "");
    const [myBookmarksOpen, setMyBookmarksOpen] = React.useState(false);



    const handleCartClick = () => {
        navigate("/tourist/cart");
        setActiveButton("Cart");
    };

    const [notifications, setNotifications] = React.useState([]);

    const _fetchUserNotifications = async () => {
        try {
            let result = await fetchUserNotifications(userId);
            setNotifications(result);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const _readAllUserNotifications = async () => {
        try {
            await readAllUserNotifications(userId);
        } catch (error) {
            console.error("Error reading notifications:", error);
        }
    };

    React.useEffect(() => {
        const fetchRates = async () => {
            try {
                await fetchConversionRates();
            } catch (error) {
                console.error("Error fetching rates:", error);
            }
        };

        const fetchCartData = async () => {
            try {
                const cart = await getUserCart(userId); // Fetch the user's cart
                const totalItems = cart?.products.reduce(
                    (sum, product) => sum + product.quantity,
                    0
                );
                setCartItemCount(totalItems || 0); // Update the item count
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };
        if (userId) {
            fetchCartData();
        }


        //fetch rates
        fetchRates();

        // if (location.pathname.startsWith("/tourist/cart")) {
        //   return;
        // }

        //fetch path
        if (location.pathname === "/tourist" || location.pathname === "/") {
            setActiveButton("Activities");
        }

        if (activeButton === "Activities") {
            navigate(`/tourist/activities?id=${id}`);
        } else if (activeButton === "Itineraries") {
            navigate(`/tourist/itineraries?id=${id}`);
        } else if (activeButton === "Products") {
            navigate(`/tourist/products?id=${id}`);
        } else if (activeButton === "Monuments") {
            navigate(`/tourist/monuments?id=${id}`);
        } else if (activeButton === "Edit Profile") {
            navigate("/tourist/editProfile");
        }
        localStorage.setItem("activeButton", activeButton);

        if (userId) {
            _fetchUserNotifications();
        }
    }, [activeButton, navigate, userId]);

    const toggleDrawer = () => {
        setOpen(!open);
        setMyBookingsOpen(false);
        setMyBookmarksOpen(false);
    };

    const handleMyBookingsClick = () => {
        setMyBookingsOpen(!myBookingsOpen);
    };

    const handleMyBookMarksClick = () => {
        setMyBookmarksOpen(!myBookmarksOpen);
    };

    const handleLogOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <Box
                flexGrow={1}
                display="flex"
                justifyContent="right"
                alignItems="center"
                sx={{ height: 64 }}
            >
                <IconButton size="medium" onClick={toggleDrawer} sx={{ mr: 1 }}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>
            <Divider />
            <List
                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Roammate
            //     </ListSubheader>
            // }
            >
                <ListItemButton
                    onClick={() => {
                        navigate("/tourist");
                        toggleDrawer();
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItemButton>

                <Divider />

                {userId && <Box>
                    <ListItemButton onClick={handleMyBookingsClick}>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Bookings" />
                        {myBookingsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={myBookingsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    toggleDrawer();
                                    navigate("/tourist/bookings/activities");
                                    setActiveButton("");
                                }}
                            >
                                <ListItemIcon>
                                    <SnowboardingIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="My Activities"
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                    }}
                                />
                            </ListItemButton>

                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    toggleDrawer();
                                    navigate("/tourist/bookings/itineraries");
                                    setActiveButton("");
                                }}
                            >
                                <ListItemIcon>
                                    <MapIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="My Itineraries"
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                    }}
                                />
                            </ListItemButton>

                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    toggleDrawer();
                                    navigate("/tourist/bookings/flights");
                                    setActiveButton("");
                                }}
                            >
                                <ListItemIcon>
                                    <FlightIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="My Flights"
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                    }}
                                />
                            </ListItemButton>

                            {/* <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                                toggleDrawer();
                                navigate("/tourist/bookings/visits");
                                setActiveButton("");
                            }}
                        >
                            <ListItemIcon>
                                <MuseumIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Visits"
                                primaryTypographyProps={{
                                    fontSize: "0.9rem",
                                }}
                            />
                        </ListItemButton> */}
                        </List>
                    </Collapse>



                    <ListItemButton
                        onClick={() => {
                            toggleDrawer();
                            navigate("/tourist/purchases");
                            setActiveButton("");
                        }}
                    >
                        <ListItemIcon>
                            <ShoppingBagIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Purchases"} />
                    </ListItemButton>


                    <Divider />

                    <ListItemButton
                        onClick={() => {
                            navigate("/tourist/wishlist");
                            setActiveButton("");
                        }}
                    >
                        <ListItemIcon>
                            <Favorite fontSize="small" />{" "}
                        </ListItemIcon>

                        <ListItemText
                            primary="My Products Wishlist"

                        />

                    </ListItemButton>


                    <ListItemButton
                        onClick={handleMyBookMarksClick}
                    >
                        <ListItemIcon>
                            <BookmarkIcon fontSize="small" />{" "}
                        </ListItemIcon>
                        <ListItemText
                            primary="My Bookmarks"
                        />
                        {myBookmarksOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={myBookmarksOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding onClick={toggleDrawer}>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    navigate("/tourist/savedActivities");
                                    setActiveButton("");
                                }}
                            >
                                <ListItemIcon>
                                    <SnowboardingIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="My Activities"
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                    }}
                                />
                            </ListItemButton>

                            <ListItemButton

                                sx={{ pl: 4 }}
                                onClick={() => {
                                    navigate("/tourist/savedItineraries");
                                    setActiveButton("");
                                }}
                            >
                                <ListItemIcon>
                                    <MapIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="My Itineraries"
                                    primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                    }}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItemButton
                        onClick={() => {
                            toggleDrawer();
                            navigate("/tourist/flights");
                            setActiveButton("");
                        }}
                    >
                        <ListItemIcon>
                            <AirplaneTicket />
                        </ListItemIcon>
                        <ListItemText primary={"Flights"} />
                    </ListItemButton>

                    <ListItemButton
                        onClick={() => {
                            toggleDrawer();
                            navigate("/tourist/hotels");
                            setActiveButton("");
                        }}
                    >
                        <ListItemIcon>
                            <HotelIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Hotels"} />
                    </ListItemButton>

                    <Divider
                        sx={{
                            mt: "10px",
                            mb: "10px",
                        }}
                    />

                    <ListItemButton
                        onClick={() => {
                            toggleDrawer();
                            navigate("/tourist/complaints");
                            setActiveButton("");
                        }}
                    >
                        <ListItemIcon>
                            <ReportIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Complaints"
                            primaryTypographyProps={{
                                fontSize: "1rem",
                            }}
                        />
                    </ListItemButton>
                </Box>}

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
            <Drawer open={open} onClose={toggleDrawer}>
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
                        onClick={toggleDrawer}
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

                    {userId && <NotificationDropdown notifications={notifications} setNotifications={setNotifications} readAllUserNotifications={_readAllUserNotifications} />}

                    <CurrencySelector />

                    {userId && <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="profile"

                        onClick={handleLogOut}
                    >
                        <LogoutIcon />
                    </IconButton>}

                    {!userId && <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="profile"
                        onClick={() => navigate("/login")}
                    >
                        <LoginIcon />
                    </IconButton>}




                    {userId && <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="profile"
                        sx={{ ml: 2 }}
                        onClick={() => setActiveButton("Edit Profile")}
                    >
                        <AccountCircleIcon />
                    </IconButton>}
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
                            onClick={() => {
                                setActiveButton(button);
                                setId("");
                            }}
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
                <Outlet context={{ setActiveButton, setCartItemCount, cartItemCount }} />
            </Box>

            <Box
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: 3,
                    padding: "8px 16px", // Added padding for spacing
                    display: "flex",
                    alignItems: "center",
                    gap: 1, // Space between icon and text
                    cursor: "pointer", // Make it clear the box is clickable
                    transition: "transform 0.3s", // Animation on hover
                    "&:hover": {
                        transform: "scale(1.05)", // Slightly enlarge on hover
                    },
                }}
                onClick={handleCartClick} // Attach click handler to the entire box
            >
                <Badge badgeContent={cartItemCount} color="secondary">
                    <ShoppingCart fontSize="large" color="primary" />
                </Badge>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                    }}
                >
                    Cart ({cartItemCount} items)
                </Typography>
            </Box>
        </Box>
    );
};

export default TouristLayout;
