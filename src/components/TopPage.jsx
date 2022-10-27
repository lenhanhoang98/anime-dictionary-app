import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink, useParams } from 'react-router-dom'

import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Paper, Grid, Box, Typography, Button } from '@mui/material';

import { useGetTopQuery } from '../services/jikanApi'

import Loader from './Loader'
import { useEffect } from 'react';

function Row(props) {
    const { row } = props;
    const animeType = ["TV", "Movie", "Ova", "Special", "Ona", "Music"]
    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell/>
                <TableCell component="th" scope="row">
                    <Typography variant="h6" gutterBottom>
                        {row.rank}
                    </Typography>

                </TableCell>
                <TableCell component="th" scope="row">
                    <Grid container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start">
                        <img
                            width={100}
                            height={140}
                            src={row?.images?.jpg?.image_url}
                            alt=''>
                        </img>
                        <Box>
                            <Grid style={{ paddingLeft: '10px' }}
                                container
                                direction="column"
                                alignItems="flex-start">
                                {animeType.includes(row?.type)
                                    ? <NavLink
                                        variant="h6"
                                        to={`/anime/${row?.mal_id}`}
                                        underline="hover"
                                        style={{ textDecoration: 'none', fontSize: '20px', color: '#1976d2' }}>
                                        {row.title}
                                    </NavLink>
                                    : <NavLink
                                        variant="h6"
                                        to={`/manga/${row?.mal_id}`}
                                        underline="hover"
                                        style={{ textDecoration: 'none', fontSize: '20px', color: '#1976d2' }}>
                                        {row.title}
                                    </NavLink>}
                                <Typography variant="subtitle2" gutterBottom>
                                    {row.title_japanese}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Status: {row.status}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    Members: {row.members}
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.scored_by}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        type: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        scored_by: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        members: PropTypes.number.isRequired,
        image: PropTypes.string,
        status: PropTypes.string.isRequired,
        title_japanese: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
    }).isRequired
};


const TopPage = () => {
    const [pages, setPages] = useState(1)
    const { type } = useParams()
    const { data, isFetching } = useGetTopQuery({ type, pages })
    const rows = data?.data
    useEffect(() => {
        setPages(1)
    }, [type])

    if (isFetching) return <Loader />

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Rank</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Scored By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.title} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
        </div>
    )
}

export default TopPage