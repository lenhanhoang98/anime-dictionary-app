import React from 'react'
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'
import TextField from "@mui/material/TextField";

import { useGetAnimeSearchQuery } from '../services/jikanApi';
import { Autocomplete, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null)
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
    const { data: searchResult } = useGetAnimeSearchQuery(debouncedSearchQuery);

    const getData = React.useCallback(() => {
        if (searchQuery && searchResult?.data) {
            const updatedOptions = searchResult.data.map((p) => {
                return { title: p.title, key: p.mal_id };
            });
            setOptions(updatedOptions);
        } else { setOptions([]); }
    }, [searchQuery, searchResult]);

    const onInputChange = (event, value, reason) => {
        if (value) {
            setSearchQuery(value);
        } else {
            setOptions([]);
        }
    };

    useEffect(() => {
        getData()
    }, [getData])


    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                if (options.length > 0) {
                    setOpen(true);
                }
            }}
            onClose={() => setOpen(false)}
            clearOnBlur={false}
            id="anime-search-bar"
            freeSolo
            options={options}
            onInputChange={onInputChange}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
            sx={{ width: { xs: '100%', sm: 300 } }}
            renderOption={(props, option) => {
                const { key, ...otherProps } = props;
                return (
                    <Box
                        component="li" 
                        {...otherProps}
                        key={option.key}
                        onClick={() => {
                            navigate(`/anime/${option?.key}`)
                            setOpen(false)
                        }}
                        sx={{ 
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            py: 1,
                            px: 2,
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.08)' }
                        }}
                    >
                        {option.title}
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Search for anime..." 
                    variant="outlined" 
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: '1px solid', borderColor: 'primary.main' },
                        }
                    }}
                />
            )}
        />
    );
}

export default SearchBar