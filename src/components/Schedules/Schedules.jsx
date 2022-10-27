import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material'
import { useGetSchedulesAnimeQuery } from '../../services/jikanApi';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const Schedules = ({ weekday }) => {
    const { data, isFetching } = useGetSchedulesAnimeQuery(weekday)
    const cards = data?.data

    if (isFetching) return <Loader />

    return (
        <div>
            <Grid container spacing={2}>
                {cards.slice(0, 24).map((card, idx) => (
                    <Grid item key={idx} xs={12} sm={6} md={2}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardActionArea
                                component={Link}
                                to={`/anime/${card?.mal_id}`}
                            >
                                <CardMedia
                                    component="img"
                                    height={350}
                                    image={card?.images?.jpg?.image_url}
                                    alt=""
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {card?.title.length > 15 ? (
                                            `${card?.title.substring(0, 15)}...`
                                        ) : card?.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Schedules