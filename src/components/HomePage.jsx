import React, { useState } from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Container, CardActionArea, Button } from '@mui/material'
import { useGetUpComingAnimeQuery } from '../services/jikanApi';
import Loader from './Loader';
import { Link } from 'react-router-dom';


const HomePage = () => {
    const [pages, setPages] = useState(1)
    const { data, isFetching } = useGetUpComingAnimeQuery(pages)
    const cards = data?.data
    if (isFetching) return <Loader />

    return (
        <div>
            <Container sx={{ py: 0 }} maxWidth="false">
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
            </Container>
            <Grid
                paddingTop='20px'
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {pages > 1
                    ? <Button variant="outlined" onClick={() => setPages(pages - 1)}>Prev</Button>
                    : <Button variant="outlined" disabled>Prev</Button>}
                <Typography
                    variant="h5"
                    paddingLeft='5px'
                    paddingRight='5px'
                >
                    {pages}
                </Typography>
                <Button variant="outlined" onClick={() => setPages(pages + 1)}>Next</Button>
            </Grid>
        </div >
    )
}

export default HomePage