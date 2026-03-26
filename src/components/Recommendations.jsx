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

                <Grid container spacing={2.5}>
                    {recommendations.map((rec, index) => {
                        const isFlipped = rec.activeItem === 1;
                        const currentEntry = isFlipped ? rec.entry[1] : rec.entry[0];
                        const titleText = isFlipped ? "You may love this" : "If you like this...";

                        return (
                            <Grid key={`${rec.mal_id}-${index}`} size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }}
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
                                        borderColor: isFlipped ? 'secondary.main' : 'divider',
                                        transition: 'all 0.4s ease',
                                        boxShadow: isFlipped ? '0 8px 24px rgba(236, 72, 153, 0.2)' : 'none',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            borderColor: isFlipped ? 'secondary.main' : 'primary.main',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <Box sx={{ bgcolor: isFlipped ? 'secondary.main' : 'background.default', py: 0.5, textAlign: 'center' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: isFlipped ? '#fff' : 'text.secondary', textTransform: 'uppercase', fontSize: '0.6rem' }}>
                                            {titleText}
                                        </Typography>
                                    </Box>

                                    <CardActionArea
                                        onClick={() => !isFlipped && handleClick(rec, index)}
                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1, minWidth: 0 }}
                                        disabled={isFlipped}
                                    >
                                        <Box sx={{ width: '100%', aspectRatio: '2/3', overflow: 'hidden', flexShrink: 0, bgcolor: 'background.default' }}>
                                            <CardMedia
                                                component="img"
                                                image={currentEntry?.images?.jpg?.large_image_url || currentEntry?.images?.jpg?.image_url}
                                                alt={currentEntry?.title}
                                                sx={{ 
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                        <CardContent sx={{ p: 1.25, display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 90, minWidth: 0 }}>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    fontWeight: 800,
                                                    lineHeight: 1.25,
                                                    color: 'text.primary',
                                                    fontSize: '0.75rem',
                                                    wordBreak: 'break-word',
                                                    overflowWrap: 'break-word'
                                                }}
                                            >
                                                {currentEntry?.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    {isFlipped && (
                                        <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center', mt: 'auto' }}>
                                            <Button 
                                                variant="contained" 
                                                color="secondary"
                                                fullWidth
                                                size="small"
                                                endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.6rem !important' }}/>}
                                                href={`/anime/${currentEntry?.mal_id}`}
                                                sx={{ borderRadius: 1, fontSize: '0.7rem' }}
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