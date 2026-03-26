import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Button, MenuItem, Link, Grid } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
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
    {
        name: 'Upcoming',
        url: `/upcoming`
    },
]

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // get theme from store
    const theme = useSelector((state) => state.theme);

    // initialize dispatch variable
    const dispatch = useDispatch();

    return (
        <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Grid sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <NavLink to='/'>
                            <img src={logo} alt='app-logo' width={'80px'} style={{ marginRight: '15px', padding: '10px 0' }} />
                        </NavLink>
                    </Grid>

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
                                        color="text.primary"
                                        underline="none"
                                        component={NavLink} to={page.url}
                                        textAlign="center"
                                        sx={{ width: '100%', py: 1 }}
                                    >{page.name}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Grid sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1 }}>
                        <NavLink to='/'>
                            <img src={logo} alt='app-logo' width={'60px'} />
                        </NavLink>
                    </Grid>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {pages.map((page, idx) => (
                            <Button
                                key={idx}
                                onClick={handleCloseNavMenu}
                                component={NavLink} to={page.url}
                                sx={{ 
                                    my: 2, 
                                    color: 'text.primary', 
                                    display: 'block',
                                    '&.active': {
                                        color: 'primary.main',
                                        background: 'rgba(99, 102, 241, 0.08)',
                                    }
                                }}
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
                            sx={{ 
                                ml: 1,
                                bgcolor: theme.darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                '&:hover': {
                                    bgcolor: theme.darkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                }
                            }}
                            onClick={() => dispatch(asyncToggleTheme())}
                            color="inherit">
                            {theme.darkTheme === true ? <Brightness7Icon color="warning" /> : <Brightness4Icon color="primary" />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default ResponsiveAppBar