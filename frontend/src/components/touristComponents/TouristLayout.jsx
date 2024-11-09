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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';
import MapIcon from '@mui/icons-material/Map';
import MuseumIcon from '@mui/icons-material/Museum';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReportIcon from '@mui/icons-material/Report';

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Collapse, ListItemIcon, ListSubheader } from '@mui/material';
import CurrencySelector from "./CurrencySelector";
import { fetchConversionRates } from "../../services/api";
import { AirplaneTicket } from "@mui/icons-material";

const drawerWidth = 240;
const TouristLayout = () => {
    const [open, setOpen] = React.useState(false);
    const [myBookingsOpen, setMyBookingsOpen] = React.useState(open);
    const [buttons, setButtons] = React.useState([
        "Activities",
        "Itineraries",
        "Products",
        "Monuments",
    ]);
    const [activeButton, setActiveButton] = React.useState(localStorage.getItem("activeButton"));
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [id, setId] = React.useState(queryParams.get("id") || "");

    React.useEffect(() => {
        const fetchRates = async () => {
            try {
                await fetchConversionRates();
            } catch (error) {
                console.error("Error fetching rates:", error);
            }
        };
        //fetch rates
        fetchRates()

        //fetch path
        if (location.pathname === "/tourist") {
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
    }, [activeButton, navigate]);

    const toggleDrawer = () => {
        setOpen(!open);
        setMyBookingsOpen(false);
    };

    const handleMyBookingsClick = () => {
        setMyBookingsOpen(!myBookingsOpen);
    };

    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation" >
            <Box flexGrow={1} display="flex" justifyContent="right" alignItems="center" sx={{ height: 64 }} >
                <IconButton size="medium" onClick={toggleDrawer} sx={{ mr: 1 }}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Roammate
            //     </ListSubheader>
            // }
            >

                <ListItemButton
                    onClick={
                        () => {
                            navigate('/tourist');
                            toggleDrawer();
                        }
                    }>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItemButton>

                <ListItemButton
                    onClick={handleMyBookingsClick}>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Bookings" />
                    {myBookingsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={myBookingsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} onClick={
                            () => {
                                toggleDrawer();
                                navigate('/tourist/bookings/activities');
                                setActiveButton('');
                            }}>
                            <ListItemIcon>
                                <SnowboardingIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Activities"
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                }}
                            />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4 }} onClick={
                            () => {
                                toggleDrawer();
                                navigate('/tourist/bookings/itineraries');
                                setActiveButton('');
                            }}>
                            <ListItemIcon>
                                <MapIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Itineraries"
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                }} />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4 }} onClick={
                            () => {
                                toggleDrawer();
                                navigate('/tourist/bookings/visits');
                                setActiveButton('');
                            }}>
                            <ListItemIcon>
                                <MuseumIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Visits"
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                }} />
                        </ListItemButton>

                    </List>
                </Collapse>

                <ListItemButton onClick={
                    () => {
                        toggleDrawer();
                        navigate('/tourist/purchases');
                        setActiveButton('');
                    }}>
                    <ListItemIcon>
                        <ShoppingBagIcon />
                    </ListItemIcon>
                    <ListItemText primary={'My Purchases'} />
                </ListItemButton>

                <ListItemButton onClick={
                    () => {
                        toggleDrawer();
                        navigate('/tourist/flights');
                        setActiveButton('');
                    }}>
                    <ListItemIcon>
                        <AirplaneTicket />
                    </ListItemIcon>
                    <ListItemText primary={'Flights'} />
                </ListItemButton>

                <Divider sx={{
                    mt: '10px',
                    mb: '10px',
                }} />

                <ListItemButton onClick={
                    () => {
                        toggleDrawer();
                        navigate('/tourist/complaints');
                        setActiveButton('');
                    }}>
                    <ListItemIcon>
                        <ReportIcon fontSize='medium' />
                    </ListItemIcon>
                    <ListItemText
                        primary="Complaints"
                        primaryTypographyProps={{
                            fontSize: '1rem',
                        }} />
                </ListItemButton>

            </List>


        </Box >
    );

    return (

        <Box sx={{
            display: 'flex', flexDirection: 'column', flexGrow: 1, pl: `calc(${open ? drawerWidth : 0}px)`,
            transition: 'padding-left 225ms',
        }}>
            <CssBaseline />
            <Drawer open={open} onClose={toggleDrawer}>
                {drawerList}
            </Drawer>
            <AppBar position="fixed" color='primary' sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pl: `calc(${open ? drawerWidth : 0}px)`,
                transition: 'padding-left 225ms',
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            mr: 2, display: `${open ? 'none' : 'block'}`,
                        }}
                        onClick={toggleDrawer}

                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: 'left',
                        alignItems: 'center',
                    }}>
                        <Typography variant="h6" component="div" sx={{
                            textAlign: 'left'
                        }}>
                            R
                        </Typography>
                        <PublicIcon />
                        <Typography variant="h6" component="div" sx={{
                            textAlign: 'left'
                        }}>
                            AMMATE
                        </Typography>
                    </Box>

                    <CurrencySelector />

                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="profile"
                        sx={{ ml: 2 }}
                        onClick={() => setActiveButton('Edit Profile')}
                    >
                        <AccountCircleIcon />
                    </IconButton>

                </Toolbar>

            </AppBar>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'primary', mt: '50px', mb: '0'
            }}>
                <Box variant="text" aria-label="text primary button group" sx={{
                    mb: '20px',
                }}>
                    {buttons.map((button, index) => (
                        <Button variant="text" key={index} onClick={() => {
                            setActiveButton(button)
                            setId('')
                        }}
                            sx={{
                                borderBottom: `${activeButton === button ? '3px solid lightgreen' : 'default'}`,
                            }}
                        >{button}</Button>
                    ))}
                </Box>

            </Box>
            <Box sx={{
                flexGrow: 1, display: 'flex', flexDirection: 'column',
                mt: '0px',
            }}>
                <Outlet context={{ setActiveButton }} />
            </Box>
        </Box >
    );
}

export default TouristLayout;
