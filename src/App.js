import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Typography, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'
import { AppBar, HomePage, Random, TopPage, Recommendations, Anime, Schedules } from './components'
import { darkTheme, lightTheme } from './theme/theme'
import WeekDay from './components/Schedules/WeekDay';



const App = () => {
    // get theme from store
    const theme = useSelector((state) => state.theme)

    return (
        <div>
            <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
                <CssBaseline />
                <div>
                    <AppBar />
                </div>
                <div>
                    <Box>
                        <div className='routes'>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/top/:type' element={<TopPage />} />
                                <Route path='/recommendations' element={<Recommendations />} />
                                <Route path='/:type/:id' element={<Anime />} />
                                <Route path='/random' element={<Random />} />
                                <Route path='/schedules' element={<WeekDay />} />
                            </Routes>
                        </div>
                    </Box>
                </div>
                <div>
                    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                        <Typography variant="h6" align="center" gutterBottom>
                            Anime Dictionary
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            component="p"
                        >
                            This app was created using JIKAN API (Unofficial MyAnimeList API).
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {'Copyright © '}
                            <Link color="inherit" to="/">
                                Website
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default App