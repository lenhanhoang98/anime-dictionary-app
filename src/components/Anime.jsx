import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Typography, Link, Chip, Paper, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';

import { useGetFullByIdQuery } from '../services/jikanApi'
import Loader from './Loader'

const InfoRow = ({ label, value, children }) => {
    if (!value && !children) return null;
    return (
        <Box sx={{ display: 'flex', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ fontWeight: 600, minWidth: '120px', color: 'text.secondary' }}>
                {label}
            </Typography>
            <Box sx={{ flex: 1 }}>
                {children || (
                    <Typography sx={{ fontWeight: 500 }}>
                        {value}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

const LinkList = ({ items }) => {
    if (!items || items.length === 0) return <Typography>None</Typography>;
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <Link href={item.url} underline="hover" color="primary.main" sx={{ fontWeight: 500 }}>
                        {item.name}
                    </Link>
                    {index < items.length - 1 && <Typography component="span" sx={{ mr: 0.5 }}>,</Typography>}
                </React.Fragment>
            ))}
        </Box>
    );
};

const Anime = () => {
    const { type, id } = useParams()
    const { data, isFetching } = useGetFullByIdQuery({ type, id })
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        if (data?.data) {
            setAnime(data.data);
        }
    }, [data]);

    if (isFetching || !anime) return <Loader />

    const posterUrl = anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url;

    return (
        <Box sx={{ pb: 8 }}>
            {/* Hero Section */}
            <Box sx={{ 
                position: 'relative', 
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                mb: 6
            }}>
                {/* Blurred Background */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${posterUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(40px)',
                    opacity: 0.2,
                    zIndex: 0
                }}/>
                
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: { xs: 4, md: 8 }, pb: { xs: 4, md: 6 } }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md="auto" sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box 
                                component="img"
                                src={posterUrl}
                                alt={anime.title}
                                sx={{
                                    width: { xs: 220, sm: 280 },
                                    borderRadius: 4,
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                                    objectFit: 'cover'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                                    {anime.title}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                                    {anime.title_english && anime.title_english !== anime.title ? `${anime.title_english} • ` : ''}
                                    {anime.title_japanese}
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    {anime.genres?.map(genre => (
                                        <Chip key={genre.mal_id} label={genre.name} color="primary" variant="outlined" sx={{ fontWeight: 600, borderRadius: 2 }} />
                                    ))}
                                    {anime.demographics?.map(demo => (
                                        <Chip key={demo.mal_id} label={demo.name} color="secondary" variant="outlined" sx={{ fontWeight: 600, borderRadius: 2 }} />
                                    ))}
                                </Box>

                                <Stack direction="row" spacing={4} sx={{ mt: 'auto', justifyContent: { xs: 'center', md: 'flex-start' }}}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>SCORE</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <StarIcon color="warning" />
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>{anime.score || 'N/A'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>RANKED</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <EmojiEventsIcon sx={{ color: '#fbbf24' }} />
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>#{anime.rank || 'N/A'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>POPULARITY</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <FavoriteIcon color="error" />
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>#{anime.popularity || 'N/A'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>MEMBERS</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <PeopleIcon color="info" />
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>{anime.members?.toLocaleString()}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Content Section */}
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Synopsis</Typography>
                            <Typography sx={{ lineHeight: 1.8, fontSize: '1.05rem', whiteSpace: 'pre-wrap', color: 'text.primary' }}>
                                {anime.synopsis || 'No synopsis available.'}
                            </Typography>
                        </Paper>

                        {anime.background && (
                            <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Background</Typography>
                                <Typography sx={{ lineHeight: 1.8, fontSize: '1.05rem', whiteSpace: 'pre-wrap', color: 'text.primary' }}>
                                    {anime.background}
                                </Typography>
                            </Paper>
                        )}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Information</Typography>
                            
                            <InfoRow label="Type" value={anime.type} />
                            
                            {type === 'anime' ? (
                                <>
                                    <InfoRow label="Episodes" value={anime.episodes || 'Unknown'} />
                                    <InfoRow label="Status" value={anime.status} />
                                    <InfoRow label="Aired" value={anime.aired?.string} />
                                    <InfoRow label="Season" value={anime.season ? `${anime.season} ${anime.year}` : null} />
                                    <InfoRow label="Studios">
                                        <LinkList items={anime.studios} />
                                    </InfoRow>
                                    <InfoRow label="Producers">
                                        <LinkList items={anime.producers} />
                                    </InfoRow>
                                    <InfoRow label="Duration" value={anime.duration} />
                                    <InfoRow label="Rating" value={anime.rating} />
                                </>
                            ) : (
                                <>
                                    <InfoRow label="Volumes" value={anime.volumes || 'Unknown'} />
                                    <InfoRow label="Chapters" value={anime.chapters || 'Unknown'} />
                                    <InfoRow label="Status" value={anime.status} />
                                    <InfoRow label="Published" value={anime.published?.string} />
                                    <InfoRow label="Authors">
                                        <LinkList items={anime.authors} />
                                    </InfoRow>
                                    <InfoRow label="Serialization">
                                        <LinkList items={anime.serializations} />
                                    </InfoRow>
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Anime