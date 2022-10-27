import React from 'react'
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'
import TextField from "@mui/material/TextField";

import { useGetAnimeSearchQuery } from '../services/jikanApi';
import { Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null)
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
    const { data: searchResult } = useGetAnimeSearchQuery(debouncedSearchQuery);

    const getData = () => {
        if (searchQuery) {
            const updatedOptions = searchResult.data.map((p) => {
                return { title: p.title, key: p.mal_id };
            });
            setOptions(updatedOptions);
        } else { setOptions([]); }
    };

    const onInputChange = (event, value, reason) => {
        if (value) {
            setSearchQuery(value);
        } else {
            setOptions([]);
        }
    };

    useEffect(() => {
        getData()
    }, [searchResult])


    return (
        <div>
            <Autocomplete
                open={open}
                onOpen={() => {
                    if (options) {
                        setOpen(true);
                    }
                }}
                onClose={() => setOpen(false)}
                clearOnBlur={false}
                id="combo-box-demo"
                freeSolo
                options={options}
                onInputChange={onInputChange}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderOption={(props, option) => (
                    <a
                        component="li" {...props}
                        key={option.key}
                        onClick={() => {
                            navigate(`/anime/${option?.key}`)
                            setOpen(false)
                        }}>
                        {option.title}
                    </a>
                )}
                renderInput={(params) => (
                    <TextField {...params} label="Search for anime" variant="outlined" />
                )}
            />
        </div>
    );
}

export default SearchBar