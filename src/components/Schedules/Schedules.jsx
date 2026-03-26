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
            <Grid container spacing={2.5}>
                {cards?.slice(0, 24).map((card, idx) => (
                    <Grid key={`${card.mal_id || 'sch'}-${idx}`} size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }}
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
                                <CardContent sx={{ p: 1.25, display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 110, minWidth: 0 }}>
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
                                            {card?.type} • {card?.status}
                                        </Typography>
                                    </Box>
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