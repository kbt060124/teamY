import React, { useState } from 'react'
import { useForm } from "@inertiajs/react";
import { Box, TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
    const { data, setData ,get } = useForm({
        search: ""
    })

    const handleChange = e => {
        setData("search", e.target.value)
        console.log(data);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!data.search.trim()) {
            return
        }
        get(route("search"))
    }

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{
                width: '50%',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TextField
                onChange={handleChange}
                fullWidth
                variant="filled"
                placeholder="検索する"
                sx={{ mr: 2, boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default SearchBar
