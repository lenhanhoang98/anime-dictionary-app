import { Button, Container, Typography, Box, Paper } from '@mui/material'
import React from 'react'
import CasinoIcon from '@mui/icons-material/Casino';

import { useGetRandomAnimeQuery } from '../services/jikanApi'
import anya from '../img/anya.jpg'
import Loader from './Loader'

const Random = () => {
    const { data, isFetching } = useGetRandomAnimeQuery({
        // Prevent caching so every visit gets a new random anime
        refetchOnMountOrArgChange: true
    })

    if (isFetching) return <Loader />

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 4 }}>
            <Container maxWidth="md">
                <Paper 
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <Box 
                        sx={{ 
                            flex: 1, 
                            bgcolor: '#fdd835', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box 
                            component="img" 
                            src={anya} 
                            alt="Anya" 
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </Box>
                    <Box 
                        sx={{ 
                            flex: 1, 
                            p: { xs: 4, md: 6 }, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                            Feeling Lucky?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
                            Bored? Try your luck with a random Anime. Maybe you will love it!
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large" 
                            href={`/anime/${data?.data?.mal_id}`}
                            startIcon={<CasinoIcon />}
                            sx={{ 
                                py: 1.5, 
                                px: 4, 
                                fontSize: '1.1rem',
                                borderRadius: '30px',
                                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
                                '&:hover': {
                                    boxShadow: '0 12px 20px rgba(99, 102, 241, 0.4)',
                                }
                            }}
                        >
                            Randomize !
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default Random