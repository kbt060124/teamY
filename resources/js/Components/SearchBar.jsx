import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
    const [query, setQuery] = useState('')

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const searchQuery = e => {
        e.preventDefault();
        if (!query.trim()) {
            return
        }
        // router.push(`search?query=${encodeURIComponent(query)}`)
    }

    return (
        <Box
            component={'form'}
            onSubmit={searchQuery}
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
