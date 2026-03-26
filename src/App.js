import React from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Typography, Box, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'
import { AppBar, HomePage, Random, TopPage, Recommendations, Anime, Upcoming } from './components'
import { darkTheme, lightTheme } from './theme/theme'
import WeekDay from './components/Schedules/WeekDay';



const App = () => {
    // get theme from store
    const theme = useSelector((state) => state.theme)

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
                <CssBaseline />
                <AppBar />
                
                <Box component="main" className='routes' sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/top/:type' element={<TopPage />} />
                        <Route path='/recommendations' element={<Recommendations />} />
                        <Route path='/:type/:id' element={<Anime />} />
                        <Route path='/random' element={<Random />} />
                        <Route path='/schedules' element={<WeekDay />} />
                        <Route path='/upcoming' element={<Upcoming />} />
                    </Routes>
                </Box>

                <Box component="footer" sx={{ 
                    bgcolor: 'background.paper', 
                    py: 6, 
                    mt: 'auto',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    textAlign: 'center'
                }}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                            Anime Dictionary
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, maxWidth: '600px', mx: 'auto' }}
                        >
                            Powered by JIKAN API (Unofficial MyAnimeList API). 
                            Discover upcoming anime, ratings, and schedules in one place.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {'© '} {new Date().getFullYear()} {' '}
                            <Link 
                                color="primary" 
                                component={NavLink} 
                                to="/"
                                style={{ textDecoration: 'none', fontWeight: 600 }}
                            >
                                Anime Dictionary
                            </Link>
                        </Typography>
                    </Container>
                </Box>
            </ThemeProvider>
        </Box>
    )
}

export default App