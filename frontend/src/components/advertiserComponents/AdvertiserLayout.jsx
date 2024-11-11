import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const navItems = ['Home', 'Create Activity'];

const drawerWidth = 240;
const AdvertiserLayout = () => {
    const [open, setOpen] = React.useState(false);
    const [buttons, setButtons] = React.useState(['My Activities']);
    const [activeButton, setActiveButton] = React.useState('My Activities');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [id, setId] = React.useState(queryParams.get('id') || '');

    React.useEffect(() => {
        if (activeButton === 'My Activities') {
            navigate(`/advertiser/my-activities?id=${id}`);
        } else if (activeButton === 'Edit Profile') {
            navigate('/advertiser/editProfile');
        } else if (activeButton === 'Create Activity') {
            navigate('/advertiser/create-activity');
        }

    }, [activeButton, navigate, id]);


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Box flexGrow={1} display="flex" justifyContent="right" alignItems="center" sx={{ height: 64 }} >
                <IconButton size="medium" onClick={toggleDrawer(false)} sx={{ mr: 1 }}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navItems.map((text, index) => (
                    <ListItem disablePadding key={index} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ListItemButton onClick={
                            () => {
                                if (text === 'Home') {
                                    setId('');
                                    setActiveButton('My Activities');
                                } else if (text === 'Create Activity') {
                                    setActiveButton('Create Activity');
                                }
                            }
                        }>
                            {text === 'Home' ? <HomeIcon /> : <AddCircleIcon />}
                            <ListItemText primary={text} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>


        </Box >
    );

    return (

        <Box sx={{
            display: 'flex', flexDirection: 'column', flexGrow: 1, pl: `calc(${open ? drawerWidth : 0}px)`,
            transition: 'padding-left 225ms',
        }}>
            <CssBaseline />
            <Drawer open={open} onClose={toggleDrawer(false)}>
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
                        onClick={toggleDrawer(true)}

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
                            setId('');
                            setActiveButton(button);
                        }}
                            sx={{
                                borderBottom: `${activeButton === button ? '3px solid lightgreen' : 'default'}`,
                            }
                            }
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

export default AdvertiserLayout;