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

                <Grid container spacing={3}>
                    {rows?.slice(0, 24).map((card) => (
                        <Grid item key={card.mal_id} xs={12} sm={6} md={3} lg={2}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={`/anime/${card?.mal_id}`}
                                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                                >
                                    <Box sx={{ position: 'relative', pt: '140%', overflow: 'hidden', flexShrink: 0 }}>
                                        <CardMedia
                                            component="img"
                                            image={card?.images?.jpg?.large_image_url || card?.images?.jpg?.image_url}
                                            alt={card.title}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                }
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                lineHeight: 1.3,
                                                height: '2.6em',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                mb: 1
                                            }}
                                        >
                                            {card?.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                            {card?.type || 'Unknown Type'} • {card?.source || 'Unknown Source'}
                                        </Typography>
                                        <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                                            {(card?.members || 0).toLocaleString()} waiting
                                        </Typography>
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
