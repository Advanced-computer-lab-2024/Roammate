import React from 'react';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, setSearchQuery, setFetch }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mb: '30px',
        }}>
            <IconButton sx={{
                fontSize: '20px',
                mt: '5px',
                mr: "5px",
                padding: "10px",
            }}
                onClick={() => setFetch((prev) => prev + 1)}>
                <SearchIcon />
            </IconButton>
            <input style={
                {
                    border: 'none',
                    width: '300px',
                    height: '40px',
                    padding: '10px',
                    borderRadius: '50px',
                    boxShadow: '1px 1px 2px 0px #00000033',
                }
            }
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}>
            </input>
        </Box>);
}

export default SearchBar;