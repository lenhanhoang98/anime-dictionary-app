import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography, Button, Container, Card, CardMedia, CardContent, CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom';
import { useGetUpComingAnimeQuery } from '../services/jikanApi'
import Loader from './Loader'

const Upcoming = () => {
    const [pages, setPages] = useState(1);
    const { data, isFetching } = useGetUpComingAnimeQuery(pages);
    const rows = data?.data;

    useEffect(() => {
        // scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pages]);

    if (isFetching && !rows) return <Loader />

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                            Upcoming Anime
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Discover the most anticipated upcoming series
                        </Typography>
                    </Box>

                    {/* Top Pagination */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="soft"
                            disabled={pages === 1}
                            onClick={() => setPages(p => p - 1)}
                            sx={{ borderRadius: '50%', minWidth: 40, width: 40, height: 40 }}
                        >
                            &lt;
                        </Button>
                        <Typography sx={{ fontWeight: 700 }}>{pages}</Typography>
                        <Button
                            variant="soft"
                            onClick={() => setPages(p => p + 1)}
                            sx={{ borderRadius: '50%', minWidth: 40, width: 40, height: 40 }}
                            disabled={!data?.pagination?.has_next_page}
                        >
                            &gt;
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={2.5}>
                    {rows?.slice(0, 24).map((card, idx) => (
                        <Grid key={`${card.mal_id}-${idx}`} size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }}
                            sx={{ display: 'flex', minWidth: 0 }}
                        >
                            <Card 
                                elevation={0}
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={`/anime/${card?.mal_id}`}
                                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1, minWidth: 0 }}
                                >
                                    <Box sx={{ width: '100%', aspectRatio: '2/3', overflow: 'hidden', flexShrink: 0, bgcolor: 'background.default' }}>
                                        <CardMedia
                                            component="img"
                                            image={card?.images?.jpg?.large_image_url || card?.images?.jpg?.image_url}
                                            alt={card.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ p: 1.25, display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 125, minWidth: 0 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 800,
                                                lineHeight: 1.25,
                                                mb: 1,
                                                color: 'text.primary',
                                                fontSize: '0.8rem',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word'
                                            }}
                                        >
                                            {card?.title}
                                        </Typography>
                                        <Box sx={{ mt: 'auto' }}>
                                            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>
                                                {card?.type || 'Unknown Type'} • {card?.source || 'Unknown Source'}
                                            </Typography>
                                            <Typography variant="caption" color="primary.main" display="block" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>
                                                {(card?.members || 0).toLocaleString()} waiting
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Bottom Pagination */}
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={pages === 1}
                        onClick={() => setPages(p => p - 1)}
                    >
                        Previous Page
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{pages}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={!data?.pagination?.has_next_page}
                        onClick={() => setPages(p => p + 1)}
                    >
                        Next Page
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default Upcoming
