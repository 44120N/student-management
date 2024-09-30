import React, { useState } from 'react';
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
import Button from '@mui/material/Button';
import { Icon, Stack } from '@mui/material';
import ColorPalette from './ColorPalette';

const drawerWidth = 240;
const navItems = ['Home', 'Sign Up'];

const handleLogout = () => {
    sessionStorage.setItem('token', '')
    sessionStorage.setItem('user', '')
}

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: "#000"}}>
            <Typography variant="h6" sx={{ my: 2, color: '#fff' }}>
                Student Management
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} href={item=="Home" ? "/" : "/" + item.replaceAll(' ', '').toLowerCase()}>
                        <ListItemText primary={item} sx={{ color: '#fff', textTransform: 'uppercase' }}/>
                    </ListItemButton>
                </ListItem>
                ))}
                {sessionStorage.getItem('user') ? 
                    <Button sx={{ color: '#fff' }} onClick={handleLogout} href='/'>Logout</Button> 
                : 
                    <ListItemButton sx={{ textAlign: 'center' }} href='/login'>
                        <ListItemText primary={'Login'} sx={{ color: '#fff', textTransform: 'uppercase' }}/>
                    </ListItemButton>
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <ColorPalette>
            <Box sx={{ display: 'flex', marginTop: "-48px"}}>
                <CssBaseline />
                <AppBar component="nav" style={{ backgroundColor: "#000" }}>
                    <Toolbar sx={{justifyContent: "space-between"}}>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton color='inherit' sx={{ borderRadius: 0, display: { xs: 'none', sm: 'block' } }}>
                            <Icon style={{height: '8vh', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1}}>
                                <img className='icon' src="/zero_one.png" alt="logo" style={{maxHeight: "8vh"}}/>
                            </Icon>
                        </IconButton>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: {sm: 2, md: 3, lg: 4, xl: 5}}}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#fff' }} href={item=="Home" ? "/" : "/" + item.replaceAll(' ', '').toLowerCase()}>
                                    {item}
                                </Button>
                            ))}
                            {sessionStorage.getItem('user') ? 
                                <Button sx={{ color: '#fff' }} onClick={handleLogout} href='/'>Logout</Button> 
                            :
                                <Button sx={{ color: '#fff' }} href='/login'>
                                    Login
                                </Button>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#000" },
                    }}
                    >
                    {drawer}
                    </Drawer>
                </nav>
                <Box component="main" sx={{ p: 3 }}>
                    <Toolbar />
                </Box>
            </Box>
        </ColorPalette>
    );
}

export default Navbar;
