import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Anime from './Anime'

import { useGetRandomAnimeQuery } from '../services/jikanApi'

import anya from '../img/anya.jpg'

import Loader from './Loader'

const Random = () => {
  const { data, isFetching } = useGetRandomAnimeQuery()
  if (isFetching) return <Loader />

  return (
    <>
      <Container>
        <img src={anya} alt='Anya' width='100%' height='auto' />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center">
          <Typography>
            Boring? Let try your luck with random Anime. Maybe you will love it~
          </Typography>
          <Button variant="contained" size="large" href={`/anime/${data?.data?.mal_id}`}>
            Randomize
          </Button>
        </Grid>
      </Container>
    </>
  )
}

export default Random