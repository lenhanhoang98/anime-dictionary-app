import { Box, Container, Grid, Typography, Link } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useGetFullByIdQuery } from '../services/jikanApi'

import Loader from './Loader'

const Anime = () => {
    const { type, id } = useParams()
    const { data, isFetching } = useGetFullByIdQuery({ type, id })
    const [anime, setAnime] = useState();

    const infoAnime = [
        `Type: ${anime?.type}`,
        `Episodes: ${anime?.episodes}`,
        `Status: ${anime?.status}`,
        `Aired: ${anime?.aired?.string}`,
        `Genres:`,
        anime?.genres?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
        `Producers:`,
        anime?.producers?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
        `Studios:`,
        anime?.studios?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
        `Duration: ${anime?.duration}`,
        `Rating: ${anime?.rating}`,
    ]

    const infoManga = [
        `Type: ${anime?.type}`,
        `Volumes: ${anime?.volumes}`,
        `Chapters: ${anime?.chapters}`,
        `Status: ${anime?.status}`,
        `Published: ${anime?.published?.string}`,
        `Genres:`,
        anime?.genres?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
        `Demographic:`,
        anime?.demographics?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
        `Serialization:`,
        anime?.serializations?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
        `Authors:`,
        anime?.authors?.map((pro, index) => (
            <>
                {index ? ', ' : ''}
                <Link href={pro?.url} underline="none" > {pro.name}</Link>
            </>
        )),
    ]

    const statAnime = [
        `Score: ${anime?.score}`,
        `Ranked: ${anime?.rank}`,
        `Popularity: ${anime?.popularity}`,
        `Members: ${anime?.members}`,
        `Favorites: ${anime?.favorites}`,
    ]

    const renderTyporaphy = (typoItems) => {
        return typoItems.map((items) => (
            <Typography variant="subtitle2" >
                {items ? items : 'none'}
            </Typography>
        ))
    }

    useEffect(() => {
        setAnime(data?.data)
    }, [data])
    if (isFetching) return <Loader />

    return (
        <Container>
            <Container sx={{ py: 0 }} maxWidth="false">
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={4}>
                        <Typography variant="h6">{anime?.title}</Typography>
                        <img
                            src={anime?.images?.jpg?.large_image_url}
                            height='500px'
                            width='350px'
                            alt='' />
                        <Typography>Alternative Titles</Typography>
                        <Typography variant="subtitle2">Japanese: {anime?.title_japanese ? anime?.title_japanese : 'None'}</Typography>
                        <Typography variant="subtitle2">English: {anime?.title_english ? anime?.title_english : 'None'}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start">
                                <Typography variant="h6">
                                    Information
                                </Typography>
                                {type === 'anime' ? renderTyporaphy(infoAnime) : renderTyporaphy(infoManga)}
                                <Typography variant="h6">
                                    Statistics
                                </Typography>
                                {renderTyporaphy(statAnime)}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start">
                                <Typography>
                                    Synopsis:
                                </Typography>
                                <Typography variant="subtitle2">
                                    {anime?.synopsis}
                                </Typography>
                                {anime?.background
                                    ? <>
                                        <Typography>
                                            Background:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {anime?.background}
                                        </Typography>
                                    </>
                                    : <></>}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

export default Anime