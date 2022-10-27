import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Link, Grid } from '@mui/material/'
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';
import { asyncToggleTheme } from '../app/theme/themeSlice';
import logo from '../img/logo-no-background.png'

const pages = [
    {
        name: 'Top Anime',
        url: `/top/anime`
    },
    {
        name: 'Top Manga',
        url: `/top/manga`
    },
    {
        name: 'Recommendations',
        url: `/recommendations`
    },
    {
        name: 'Random',
        url: `/random`
    },
    {
        name: 'Schedules',
        url: `/schedules`
    },
]

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // get theme from store
    const theme = useSelector((state) => state.theme);

    // initialize dispatch variable
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Grid sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <NavLink to='/'>
                            <img src={logo} alt='app-logo' width={'80px'} style={{ marginRight: '15px' }} />
                        </NavLink>
                    </Grid>
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component={NavLink} to={'/'}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages?.map((page, idx) => (
                                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                                    <Link
                                        color="inherit"
                                        underline="none"
                                        component={NavLink} to={page.url}
                                        textAlign="center"
                                    >{page.name}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Grid sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <NavLink to='/'>
                            <img src={logo} alt='app-logo' width={'60px'} style={{ marginRight: '70px' }} />
                        </NavLink>
                    </Grid>
                    {/* <NavLink to='/'>
                        <img src={logo} alt='app-logo' width={'80px'} style={{ marginRight: '15px' }} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </NavLink> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, idx) => (
                            <Button
                                key={idx}
                                onClick={handleCloseNavMenu}
                                component={NavLink} to={page.url}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                        justifyContent="flex-end">
                        <SearchBar />
                    </Box>
                    <Box sx={{ flexGrow: 0 }} style={{ paddingLeft: '20px' }}>
                        <IconButton
                            sx={{ ml: 1 }}
                            // onClick={changeTheme} 
                            onClick={() => dispatch(asyncToggleTheme())}
                            color="inherit">
                            {theme.darkTheme === true ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default ResponsiveAppBar