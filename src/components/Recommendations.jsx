import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material'

import { useGetRecommendationsQuery } from '../services/jikanApi'

import Loader from './Loader'

const Recommendations = () => {
    const { data, isFetching } = useGetRecommendationsQuery()
    const recList = data?.data
    const [recommendations, setRecommendations] = useState([]);

    const handleClick = (item, index) => {
        const newRecommends = [...recommendations];
        newRecommends[index].activeItem = 1;
        setRecommendations(newRecommends);
    }

    useEffect(() => {
        if (recList) {
            const newRecommends = recList.map((item) => {
                return {
                    ...item,
                    activeItem: 0,
                }
            });
            setRecommendations(newRecommends);
        }
    }, [recList])

    if (isFetching) return <Loader />



    return (
        <div>
            <Container sx={{ py: 0 }} maxWidth="false">
                <Grid container spacing={2}>
                    {recommendations.slice(0, 24).map((rec, index) => (
                        <Grid item key={rec.mal_id} xs={12} sm={6} md={2}>
                            <Card>
                                <CardActionArea
                                    onClick={() => handleClick(rec, index)}>
                                    {
                                        rec?.activeItem === 0
                                            ? <>
                                                <CardHeader title='Click if you like' variant='h1' />
                                                <CardMedia
                                                    component="img"
                                                    height={350}
                                                    image={rec?.entry?.[0]?.images?.jpg?.image_url}
                                                    alt=""
                                                />
                                                <CardContent>
                                                    <Typography>
                                                        {rec?.entry?.[0]?.title.length > 19
                                                            ? (`${rec?.entry?.[0]?.title.substring(0, 19)}...`)
                                                            : rec?.entry?.[0]?.title}
                                                    </Typography>
                                                </CardContent></>
                                            : <>
                                                <CardHeader title='You may love this' variant='h1' />
                                                <CardMedia
                                                    component="img"
                                                    height={303}
                                                    image={rec?.entry?.[1]?.images?.jpg?.image_url}
                                                    alt=""
                                                />
                                                <CardContent>
                                                    <Typography>
                                                        {rec?.entry?.[1]?.title.length > 19
                                                            ? (`${rec?.entry?.[1]?.title.substring(0, 19)}...`)
                                                            : rec?.entry?.[1]?.title}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions justifyContent="flex-end">
                                                    <Button size="small" href={`/anime/${rec?.entry?.[1]?.mal_id}`}>Details</Button>
                                                </CardActions>
                                            </>
                                    }
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default Recommendations