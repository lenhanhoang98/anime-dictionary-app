import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom'

import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Paper, Grid, Box, Typography, Button, Container, Chip, Link } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { useGetTopQuery } from '../services/jikanApi'
import Loader from './Loader'

function Row(props) {
    const { row } = props;
    const isAnime = ["TV", "Movie", "Ova", "Special", "Ona", "Music"].includes(row?.type);
    const detailLink = isAnime ? `/anime/${row?.mal_id}` : `/manga/${row?.mal_id}`;

    // Helper for Rank styling
    let rankColor = 'text.secondary';
    if (row.rank === 1) rankColor = '#fbbf24'; // Gold
    else if (row.rank === 2) rankColor = '#94a3b8'; // Silver
    else if (row.rank === 3) rankColor = '#b45309'; // Bronze

    return (
        <React.Fragment>
            <TableRow hover sx={{ "& > *": { borderBottom: "1px solid", borderColor: 'divider' }, transition: 'background-color 0.2s', '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                    <Typography variant={row.rank <= 3 ? "h4" : "h5"} sx={{ fontWeight: 800, color: rankColor }}>
                        #{row.rank}
                    </Typography>
                </TableCell>
                <TableCell sx={{ pl: { xs: 1, md: 4 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, md: 3 } }}>
                        <Link component={RouterLink} to={detailLink} sx={{ display: 'block', flexShrink: 0 }}>
                            <Box
                                component="img"
                                src={row?.images?.jpg?.image_url}
                                alt={row.title}
                                sx={{
                                    width: { xs: 50, sm: 70 },
                                    height: { xs: 75, sm: 100 },
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            />
                        </Link>
                        <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <Link 
                                component={RouterLink} 
                                to={detailLink}
                                underline="hover"
                                color="text.primary"
                                sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                                {row.title}
                            </Link>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: { xs: 'none', sm: 'block' } }}>
                                {row.title_japanese}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label={row.type} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                <Chip label={`${(row.members || 0).toLocaleString()} users`} size="small" variant="outlined" color="secondary" sx={{ borderRadius: 1 }} />
                            </Box>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon color="warning" fontSize="small" />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {row.score || 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.object.isRequired
};


const TopPage = () => {
    const [pages, setPages] = useState(1);
    const { type } = useParams();
    const location = useLocation();
    
    // Check if the current route is for manga
    const isManga = location.pathname.includes('/manga');
    // If we have type parameter from route, use it. Otherwise guess from URL.
    const apiType = type || (isManga ? 'manga' : 'anime');

    const { data, isFetching } = useGetTopQuery({ type: apiType, pages })
    const rows = data?.data

    useEffect(() => {
        setPages(1);
    }, [apiType]);

    if (isFetching && !rows) return <Loader />

    const pageTitle = apiType === 'manga' ? 'Top Manga' : 'Top Anime';

    return (
        <Box sx={{ py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {pageTitle}
                    </Typography>
                    
                    {/* Top Pagination */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button 
                            variant="soft" 
                            disabled={pages === 1}
                            onClick={() => setPages(p => p - 1)}
                            sx={{ borderRadius: '50%', minWidth: 40, width: 40, height: 40 }}
                        >
                            &lt;
                        </Button>
                        <Typography sx={{ fontWeight: 700 }}>{pages}</Typography>
                        <Button 
                            variant="soft" 
                            onClick={() => setPages(p => p + 1)}
                            sx={{ borderRadius: '50%', minWidth: 40, width: 40, height: 40 }}
                            disabled={!data?.pagination?.has_next_page}
                        >
                            &gt;
                        </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                    <Table aria-label="top anime table" sx={{ tableLayout: 'fixed' }}>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell sx={{ width: { xs: '80px', sm: '120px' }, fontWeight: 700, color: 'text.secondary', textAlign: 'center' }}>Rank</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', pl: { xs: 1, md: 4 } }}>Title</TableCell>
                                <TableCell sx={{ width: { xs: '100px', sm: '150px' }, fontWeight: 700, color: 'text.secondary', textAlign: 'center' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row) => (
                                <Row key={row.mal_id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Bottom Pagination */}
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button 
                        variant="contained" 
                        size="large"
                        disabled={pages === 1}
                        onClick={() => {
                            setPages(pages - 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Previous Page
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{pages}</Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        size="large"
                        disabled={!data?.pagination?.has_next_page}
                        onClick={() => {
                            setPages(pages + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Next Page
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default TopPage