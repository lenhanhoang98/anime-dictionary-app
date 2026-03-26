import React, { useState } from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Container, CardActionArea, Button, Box, Chip, Stack } from '@mui/material'
import { useGetUpComingAnimeQuery, useGetTopQuery } from '../services/jikanApi';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HomePage = () => {
    const [pages, setPages] = useState(1);
    
    // Fetch different sections data
    const { data: heroData, isFetching: heroFetching } = useGetTopQuery({ type: 'anime', pages: 1 }); // Overall Top
    const { data: airingData, isFetching: airingFetching } = useGetTopQuery({ type: 'anime', pages: 1, filter: 'airing' });
    const { data: upcomingData, isFetching: upcomingFetching } = useGetUpComingAnimeQuery(pages);
    
    // Safety check for data structure
    const featured = heroData?.data?.[0]; // This is the #1 rated overall
    const topRated = airingData?.data?.slice(0, 6); // Top 6 currently airing
    const upcoming = upcomingData?.data;

    if (heroFetching || airingFetching || (upcomingFetching && pages === 1)) return <Loader />

    return (
        <Box sx={{ pb: 8 }}>
            {/* HERO SECTION */}
            {featured && (
                <Box 
                    sx={{ 
                        position: 'relative', 
                        height: { xs: '500px', md: '650px' },
                        width: '100%',
                        mb: 6,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'black'
                    }}
                >
                    {/* Background Image with Gradient */}
                    <Box 
                        sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${featured?.images?.jpg?.large_image_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            filter: 'brightness(0.5) blur(3px)',
                            transform: 'scale(1.1)',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to right, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.7) 30%, rgba(15, 23, 42, 0.2) 100%)',
                            }
                        }}
                    />

                    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                        <Grid container spacing={6} alignItems="center">
                            {/* NEW POSTER CARD */}
                            <Grid item xs={12} md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Box 
                                    sx={{ 
                                        width: '100%', 
                                        borderRadius: 3, 
                                        overflow: 'hidden', 
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transform: 'rotate(-2deg)'
                                    }}
                                >
                                    <CardMedia 
                                        component="img" 
                                        image={featured?.images?.jpg?.large_image_url} 
                                        alt={featured?.title}
                                        sx={{ width: '100%', height: 'auto' }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={8} lg={9}>
                                <Stack spacing={2} alignItems="flex-start">
                                    <Chip 
                                        label={`#1 Top Rated Overall • ${featured?.type}`}
                                        color="primary" 
                                        sx={{ 
                                            fontWeight: 900, 
                                            borderRadius: 1.5, 
                                            bgcolor: '#fbbf24', 
                                            color: 'black',
                                            textTransform: 'uppercase',
                                            letterSpacing: 1
                                        }}
                                    />
                                    <Typography 
                                        variant="h2" 
                                        sx={{ 
                                            fontWeight: 900, 
                                            color: 'white',
                                            lineHeight: 1.1,
                                            fontSize: { xs: '2.5rem', md: '4rem' },
                                            textShadow: '0 4px 12px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        {featured?.title}
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#fbbf24' }}>
                                            <StarIcon sx={{ mr: 0.5 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{featured?.score || 'N/A'}</Typography>
                                        </Box>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                                            {featured?.episodes || '?'} Episodes • {featured?.status}
                                        </Typography>
                                    </Stack>
                                    <Typography 
                                        sx={{ 
                                            color: 'rgba(255,255,255,0.8)', 
                                            fontSize: '1.1rem',
                                            maxWidth: '600px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {featured?.synopsis}
                                    </Typography>
                                    <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                                        <Button 
                                            component={Link}
                                            to={`/anime/${featured?.mal_id}`}
                                            variant="contained" 
                                            size="large"
                                            startIcon={<PlayArrowIcon />}
                                            sx={{ 
                                                px: 4, 
                                                py: 1.5, 
                                                fontSize: '1.1rem',
                                                borderRadius: 2,
                                                bgcolor: 'primary.main',
                                                '&:hover': { bgcolor: 'primary.dark' }
                                            }}
                                        >
                                            View Details
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            size="large"
                                            sx={{ 
                                                px: 4, 
                                                py: 1.5, 
                                                borderRadius: 2,
                                                color: 'white',
                                                borderColor: 'white',
                                                backdropFilter: 'blur(4px)',
                                                bgcolor: 'rgba(255,255,255,0.1)',
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    bgcolor: 'rgba(255,255,255,0.2)'
                                                }
                                            }}
                                        >
                                            Add to List
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            )}

            <Container maxWidth="xl">
                {/* TOP AIRING SECTION */}
                <Box sx={{ mb: 8 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center' }}>
                            Top Airing This Season <ArrowForwardIcon sx={{ ml: 1, color: 'primary.main' }} />
                        </Typography>
                        <Button component={Link} to="/top/airing" variant="text" sx={{ fontWeight: 700 }}>View All</Button>
                    </Stack>
                    <Grid container spacing={2.5}>
                        {topRated?.map((card, idx) => (
                            <Grid key={`top-${card.mal_id}-${idx}`} size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }} sx={{ display: 'flex', minWidth: 0 }}>
                                <Card 
                                    elevation={0}
                                    sx={{ 
                                        width: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <CardActionArea component={Link} to={`/anime/${card?.mal_id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                        <Box sx={{ width: '100%', aspectRatio: '2/3', position: 'relative' }}>
                                            <CardMedia component="img" image={card?.images?.jpg?.large_image_url} alt={card?.title} sx={{ height: '100%', objectFit: 'cover' }} />
                                            <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', color: '#fbbf24', px: 1, py: 0.5, borderRadius: 1.5, display: 'flex', alignItems: 'center' }}>
                                                <StarIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
                                                <Typography variant="caption" sx={{ fontWeight: 800 }}>{card?.score}</Typography>
                                            </Box>
                                        </Box>
                                        <CardContent sx={{ p: 1.5, flexGrow: 1, minHeight: 100 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.9rem', wordBreak: 'break-word' }}>
                                                {card?.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* UPCOMING SECTION */}
                <Box>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            Coming Soon
                        </Typography>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Button variant="outlined" disabled={pages === 1} onClick={() => setPages(p => p - 1)} sx={{ minWidth: 40, width: 40, height: 40, borderRadius: 2 }}>&lt;</Button>
                            <Typography sx={{ fontWeight: 800 }}>{pages}</Typography>
                            <Button variant="outlined" onClick={() => setPages(p => p + 1)} sx={{ minWidth: 40, width: 40, height: 40, borderRadius: 2 }}>&gt;</Button>
                        </Stack>
                    </Box>

                    <Grid container spacing={2.5}>
                        {upcoming?.slice(0, 24).map((card, idx) => (
                            <Grid key={`up-${card.mal_id}-${idx}`} size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }} sx={{ display: 'flex', minWidth: 0 }}>
                                <Card 
                                    elevation={0}
                                    sx={{ 
                                        width: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <CardActionArea component={Link} to={`/anime/${card?.mal_id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                        <Box sx={{ width: '100%', aspectRatio: '2/3' }}>
                                            <CardMedia component="img" image={card?.images?.jpg?.large_image_url} alt={card?.title} sx={{ height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                        <CardContent sx={{ p: 1.5, flexGrow: 1, minHeight: 100 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.85rem', wordBreak: 'break-word' }}>
                                                {card?.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1, fontSize: '0.7rem' }}>
                                                {card?.type} • {card?.status}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* BOTTOM PAGINATION */}
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ mt: 8 }}>
                        <Button variant="soft" size="large" disabled={pages === 1} onClick={() => { setPages(pages - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} sx={{ px: 4, borderRadius: 2 }}>Previous</Button>
                        <Box sx={{ px: 3, py: 1, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{pages}</Typography>
                        </Box>
                        <Button variant="soft" size="large" onClick={() => { setPages(pages + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} sx={{ px: 4, borderRadius: 2 }}>Next Page</Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default HomePage