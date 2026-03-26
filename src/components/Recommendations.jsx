import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetRecommendationsQuery } from '../services/jikanApi'
import Loader from './Loader'

const Recommendations = () => {
    const { data, isFetching } = useGetRecommendationsQuery()
    const recList = data?.data
    const [recommendations, setRecommendations] = useState([]);

    const handleClick = (item, index) => {
        if (recommendations[index].activeItem === 1) return; // Prevent re-clicking

        const newRecommends = [...recommendations];
        const potentialRecs = newRecommends[index].allRecommendations;
        // Randomly pick one recommended anime from the grouped list
        const randomRec = potentialRecs[Math.floor(Math.random() * potentialRecs.length)];
        
        newRecommends[index].entry[1] = randomRec;
        newRecommends[index].activeItem = 1;
        setRecommendations(newRecommends);
    }

    useEffect(() => {
        if (recList) {
            // Group duplicate base anime recommendations
            const grouped = {};
            recList.forEach(item => {
                if (!item.entry || item.entry.length < 2) return;
                
                const baseAnime = item.entry[0];
                const recAnime = item.entry[1];
                
                if (!grouped[baseAnime.mal_id]) {
                    grouped[baseAnime.mal_id] = {
                        baseEntry: baseAnime,
                        recommendedEntries: []
                    };
                }
                grouped[baseAnime.mal_id].recommendedEntries.push(recAnime);
            });

            const newRecommends = Object.values(grouped).map(group => ({
                mal_id: `group-${group.baseEntry.mal_id}`,
                entry: [group.baseEntry, null], // entry[1] will be populated on click
                allRecommendations: group.recommendedEntries,
                activeItem: 0,
            }));
            
            // Set first 24 unique base anime
            setRecommendations(newRecommends.slice(0, 24));
        }
    }, [recList])

    if (isFetching) return <Loader />

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Recommendations
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Click on an anime you like to see our recommendation
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {recommendations.map((rec, index) => {
                        const isFlipped = rec.activeItem === 1;
                        const currentEntry = isFlipped ? rec.entry[1] : rec.entry[0];
                        const titleText = isFlipped ? "You may love this" : "If you like this...";

                        return (
                            <Grid item key={rec.mal_id} xs={12} sm={6} md={3} lg={2}>
                                <Card
                                    sx={{ 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                                        boxShadow: isFlipped ? '0 8px 24px rgba(236, 72, 153, 0.2)' : '0 4px 20px rgba(0,0,0,0.05)',
                                        borderColor: isFlipped ? 'secondary.main' : 'divider',
                                        borderWidth: isFlipped ? 2 : 1,
                                        borderStyle: 'solid'
                                    }}
                                >
                                    <Box sx={{ bgcolor: isFlipped ? 'secondary.main' : 'background.default', py: 1, textAlign: 'center' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: isFlipped ? '#fff' : 'text.secondary', textTransform: 'uppercase' }}>
                                            {titleText}
                                        </Typography>
                                    </Box>

                                    <CardActionArea
                                        onClick={() => !isFlipped && handleClick(rec, index)}
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                                        disabled={isFlipped}
                                    >
                                        <Box sx={{ position: 'relative', pt: '130%', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                image={currentEntry?.images?.jpg?.large_image_url || currentEntry?.images?.jpg?.image_url}
                                                alt={currentEntry?.title}
                                                sx={{ 
                                                    position: 'absolute',
                                                    top: 0, left: 0, width: '100%', height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease',
                                                    '&:hover': {
                                                        transform: !isFlipped ? 'scale(1.05)' : 'none',
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                            <Typography 
                                                variant="subtitle2" 
                                                sx={{ 
                                                    fontWeight: 700,
                                                    lineHeight: 1.3,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {currentEntry?.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    {isFlipped && (
                                        <CardActions sx={{ p: 2, pt: 0, justifyContent: 'center' }}>
                                            <Button 
                                                variant="contained" 
                                                color="secondary"
                                                fullWidth
                                                endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.8rem !important' }}/>}
                                                href={`/anime/${currentEntry?.mal_id}`}
                                                sx={{ borderRadius: 2 }}
                                            >
                                                Details
                                            </Button>
                                        </CardActions>
                                    )}
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}

export default Recommendations