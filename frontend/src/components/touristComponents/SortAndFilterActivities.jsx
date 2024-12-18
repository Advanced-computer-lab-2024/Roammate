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
import { fetchAllActivityCategories, fetchAllPreferenceTags } from '../../services/api';

const sortParams = ['price', 'rating'];

const SortAndFilterActivities = ({ setFilterAndSortCriteria, setFetch }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [sortParam, setSortParam] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [AllAvailableCategoryTags, setAllAvailableCategoryTags] = useState([])
    const [AllAvailableTags, setAllAvailableTags] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const categories = await fetchAllActivityCategories();
                const tags = await fetchAllPreferenceTags();
                setAllAvailableCategoryTags(categories);
                setAllAvailableTags(tags);
            } catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [])


    const handleCategoryChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleTagChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleSortOrderChange = () => {
        setIsAscending(!isAscending);
    }

    const handleApplyFilters = () => {
        const filterCriteria = {
            minPrice: minPrice ? minPrice / JSON.parse(localStorage.getItem('rates'))["conversion_rates"][localStorage.getItem('currency')] : '',
            maxPrice: maxPrice ? maxPrice / JSON.parse(localStorage.getItem('rates'))["conversion_rates"][localStorage.getItem('currency')] : '',
            minRating,
            maxRating,
            minDate: minDate ? minDate : '',
            maxDate: maxDate ? maxDate : '',
            category: AllAvailableCategoryTags.filter((category) => selectedCategories.includes(category.name)).map((category) => category._id),
            tags: AllAvailableTags.filter((tag) => selectedTags.includes(tag.name)).map((tag) => tag._id),
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
                {/*<SortIcon sx={{
                    ml: '10px',
                    fontSize: '30px',
                }} />*/}
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

                {/*Rating*/}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <InputLabel sx={{
                        textAlign: 'left',
                        mb: '10px'
                    }}>
                        Rating
                    </InputLabel>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <TextField
                            id="standard-number"
                            label="Min"
                            type="number"
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                        />
                        <TextField
                            id="standard-number"
                            label="Max"
                            type="number"
                            value={maxRating}
                            onChange={(e) => setMaxRating(e.target.value)}
                        />
                    </Box>
                </Box>

                {/*Date*/}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <InputLabel sx={{
                        textAlign: 'left'
                    }}>
                        Date
                    </InputLabel>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="From" value={minDate} onChange={
                                    (newValue) => setMinDate(newValue)
                                } />
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="To"
                                    value={maxDate}
                                    onChange={
                                        (newValue) => setMaxDate(newValue)
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>


                    </Box>
                </Box>

                {/*Category*/}
                <InputLabel sx={{
                    textAlign: 'left',
                    width: '100%',
                    mb: '-10px'
                }}>Category</InputLabel>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel>Choose</InputLabel>
                    <Select
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        input={<OutlinedInput label="Choose" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}

                    >
                        {AllAvailableCategoryTags.map((category) => (
                            <MenuItem
                                key={category._id}
                                value={category.name}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/*Tags*/}
                <InputLabel sx={{
                    textAlign: 'left',
                    width: '100%',
                    mb: '-10px'
                }}>Tags</InputLabel>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel>Choose</InputLabel>
                    <Select
                        multiple
                        value={selectedTags}
                        onChange={handleTagChange}
                        input={<OutlinedInput label="Choose" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}

                    >
                        {AllAvailableTags.map((tag) => (
                            <MenuItem
                                key={tag._id}
                                value={tag.name}
                            >
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </form>

            <Button variant="contained" sx={{
                mt: '20px',
                width: '100%',
            }} onClick={handleApplyFilters}>
                Apply
            </Button>
        </Grid2>);
}

export default SortAndFilterActivities;