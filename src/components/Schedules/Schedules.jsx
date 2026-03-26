import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import { useGetSchedulesAnimeQuery } from '../../services/jikanApi';
import Loader from '../Loader';

const Schedules = ({ weekday }) => {
    const { data, isFetching } = useGetSchedulesAnimeQuery(weekday)
    const cards = data?.data

    if (isFetching) return <Loader />

    return (
        <Box sx={{ pb: 4 }}>
            <Grid container spacing={3}>
                {cards?.slice(0, 24).map((card, idx) => (
                    <Grid item key={card.mal_id || idx} xs={12} sm={6} md={3} lg={2}>
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
                                        }}
                                    >
                                        {card?.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {card?.type} • {card?.status}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Schedules