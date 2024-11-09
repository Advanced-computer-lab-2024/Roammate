import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {
    Box, Button, Chip, Divider, FormControl, FormControlLabel,
    Grid2, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchAllPreferenceTags } from '../../services/api';

const sortParams = ['price', 'rating'];

const SortAndFilterProducts = ({ setFilterAndSortCriteria, setFetch }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortParam, setSortParam] = useState('');
    const [isAscending, setIsAscending] = useState(true);

    const handleSortOrderChange = () => {
        setIsAscending(!isAscending);
    }

    const handleApplyFilters = () => {
        const filterCriteria = {
            minPrice,
            maxPrice,
            order: isAscending ? sortParam : `-${sortParam}`
        }
        setFilterAndSortCriteria(filterCriteria);
        setFetch((prev) => prev + 1);
    }

    return (
        <Grid2 xs={0} sx={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '250px',
                gap: '10px',
                border: '1px solid #e0e0e0',
                height: 'fit-content',
                borderRadius: '5px',
                padding: '15px',
            }

        }>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '5px',
            }}>
                {/* <SortIcon sx={{
                    ml: '10px',
                    fontSize: '30px',
                }} /> */}
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                }}>
                    Sort
                </Typography>

            </Box>
            <Box
                orientation="horizontal"
                color="primary"
                aria-label="vertical outlined primary button group"
                variant="outlined"
            >
                {sortParams.map((param, index) => (
                    <Button key={index} onClick={() => {
                        if (sortParam === param) {
                            setSortParam('');
                        } else {
                            setSortParam(param)
                        }
                    }}
                        sx={{
                            borderBottom: `${sortParam === param ? '3px solid lightgreen' : 'default'}`,
                        }}>
                        {param}
                    </Button>
                ))}

            </Box>

            <FormControlLabel
                control={
                    <IconButton onClick={handleSortOrderChange}>
                        <SwapVertIcon />
                    </IconButton>
                }
                label={isAscending ? "Ascending" : "Descending"}
            />

            <Divider sx={{
                mt: '20px',
                mb: '20px',
                width: '100%',
            }} />
            <Typography variant="h5" sx={{
                fontWeight: 'bold',
            }}>
                Filter
            </Typography>
            <form style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexGrow: 1,
                    maxWidth: '200px',
                    gap: '10px',

                }
            }>

                {/*Price*/}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <InputLabel sx={{
                        textAlign: 'left',
                        mb: '10px'
                    }}>
                        Price
                    </InputLabel>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                    }}>
                        <TextField
                            id="standard-number"
                            label="Min"
                            type="number"
                            sx={{
                                mr: '10px'
                            }}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <TextField
                            id="standard-number"
                            label="Max"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </Box>
                </Box>


            </form>

            <Button variant="contained" sx={{
                mt: '20px',
                width: '100%',
            }} onClick={handleApplyFilters}>
                Apply
            </Button>
        </Grid2>);
}

export default SortAndFilterProducts;