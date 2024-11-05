import { Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAllActivityCategories, fetchAllPreferenceTags, updateActivity } from "../../services/api";

const EditActivityForm = ({ activity }) => {
    const [title, setTitle] = useState(activity.title);
    const [description, setDescription] = useState(activity.description);
    const [location, setLocation] = useState(activity.location);
    const [category, setCategory] = useState(activity.category);
    const [tags, setTags] = useState(activity.tags);
    const [price, setPrice] = useState(activity.price);
    const [discount, setDiscount] = useState(activity.discount);
    const [startDate, setStartDate] = useState(dayjs(activity.startDate)); // Initialize with Day.js formatted start date
    const [endDate, setEndDate] = useState(dayjs(activity.endDate));
    const [time, setTime] = useState(activity.time);
    const [isBookingAvailable, setIsBookingAvailable] = useState(activity.isBookingAvailable);
    const [selectedCategories, setSelectedCategories] = useState(activity.category.map((cat) => cat.name));
    const [selectedTags, setSelectedTags] = useState(activity.tags.map((tag) => tag.name));
    const [AllAvailableCategoryTags, setAllAvailableCategoryTags] = useState([])
    const [AllAvailableTags, setAllAvailableTags] = useState([])
    const [edit, setEdit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [err, setErr] = useState("");

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

    const handleDiscountChange = (index, field, value) => {
        const updatedDiscount = [...discount];
        updatedDiscount[index][field] = value;
        setDiscount(updatedDiscount);
    };

    const handleDeleteDiscount = (index) => {
        const updatedDiscount = [...discount];
        updatedDiscount.splice(index, 1);
        setDiscount(updatedDiscount);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newActivity = {
            title,
            description,
            location,
            price,
            category: AllAvailableCategoryTags.filter((category) => selectedCategories.includes(category.name)).map((category) => category._id),
            tags: AllAvailableTags.filter((tag) => selectedTags.includes(tag.name)).map((tag) => tag._id),
            discount,
            startDate,
            endDate,
            time,
            isBookingAvailable,
        }
        try {
            await updateActivity(activity._id, newActivity);
            setDisabled(true);
            setEdit(false);
        } catch (err) {
            setErr(err);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '20px',
                width: '450px',
                border: '1px solid lightgray',
                padding: '20px',
            }}
        >
            <h2>Activity Details</h2>

            {/* <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                mb: '10px',

            }}>
                <Typography variant="h5" sx={{
                    color: 'lightgray',
                }}>rated: </Typography>

                <Rating name="read-only" value={rating} readOnly precision={0.5}
                    icon={<StarIcon style={{ fill: 'orange' }} />}
                    emptyIcon={<StarIcon style={{ fill: 'lightgray' }} />}
                />
            </Box> */}

            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '25px',
                width: '100%',
                alignItems: 'start',
                justifyContent: 'start',
            }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    disabled={disabled}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={description}
                    disabled={disabled}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />
                <h2>Location</h2>
                <TextField
                    label="Location"
                    variant="outlined"
                    value={location.lng + ', ' + location.lat}
                    disabled={disabled}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                {/*Category*/}
                <h2>Category</h2>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel>Choose</InputLabel>
                    <Select
                        multiple
                        value={selectedCategories}
                        disabled={disabled}
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
                <h2>Tags</h2>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel>Choose</InputLabel>
                    <Select
                        multiple
                        value={selectedTags}
                        disabled={disabled}
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

                {/*Price*/}
                <h2>Price</h2>
                <TextField
                    label="Price"
                    variant="outlined"
                    value={price}
                    disabled={disabled}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{
                        width: 'fit-content',
                    }}
                />

                {/*Discount*/}
                {discount && discount.length > 0 && discount.map((disc, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        gap: '10px',
                        width: '100%',
                        border: '1px solid lightgray',
                        padding: '10px',
                        borderRadius: '5px',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'start',
                            gap: '10px',
                            width: '100%',
                        }}>
                            <Typography sx={{
                                color: 'gray',
                                flexGrow: 1,
                                textAlign: 'left',
                            }} variant="h6">Discount {index + 1} </Typography>

                            <IconButton disabled={disabled} onClick={() => {
                                handleDeleteDiscount(index);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        {/*TO DO*/}
                        <TextField
                            label="Percentage"
                            variant="outlined"
                            value={disc.percentage}
                            tyor='percentage'
                            disabled={disabled}
                            onChange={(e) => handleDiscountChange(index, 'percentage', e.target.value)}
                            sx={{
                                width: 'fit-content',
                            }}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            value={disc.description}
                            disabled={disabled}
                            onChange={(e) => handleDiscountChange(index, 'description', e.target.value)}
                            sx={{
                                width: '100%',
                            }}
                        />
                    </Box>
                ))}

                <Button
                    variant="contained"
                    disabled={disabled}

                    onClick={() => {
                        setDiscount([...discount, { percentage: 0, description: "" }]);
                    }}
                    sx={{
                        backgroundColor: 'gray',
                        color: 'white',
                        width: '100%'
                    }}
                >
                    Add Discount
                </Button>

                {/*Date and Time*/}
                <h2>Date and Time</h2>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'start',
                    gap: '25px',
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="From" value={startDate} disabled={disabled}
                                onChange={
                                    (newValue) => setStartDate(newValue)
                                } />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="To"
                                value={endDate}
                                disabled={disabled}
                                onChange={
                                    (newValue) => setEndDate(newValue)
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <TextField
                        label="Time"
                        variant="outlined"
                        value={time}
                        type="time"
                        disabled={disabled}
                        onChange={(e) => setTime(e.target.value)}
                        sx={{
                            width: 'fit-content',
                        }}
                    />
                </Box>

                {/*Booking Availability*/}
                <h2>Booking Availability</h2>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <InputLabel>Is Booking Available?</InputLabel>
                    <Checkbox
                        checked={isBookingAvailable}
                        disabled={disabled}
                        onChange={(e) => setIsBookingAvailable(e.target.checked)}
                    />
                </Box>


                <Divider />

                {err && <Typography sx={{
                    color: 'red'
                }}>{err}</Typography>}

                {!edit && <Button
                    variant="contained"
                    onClick={() => {
                        setDisabled(false);
                        setEdit(true);
                    }}
                    sx={{
                        color: 'white',
                        width: '100%'
                    }}
                >
                    Edit
                </Button>}

                {edit &&
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: '100%'
                    }}><Button
                        variant="contained"
                        onClick={() => {
                            setDisabled(false);
                        }}
                        sx={{
                            backgroundColor: 'green',
                            color: 'white',
                            width: '100%'
                        }}
                        type='submit'
                    >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setDisabled(true);
                                setEdit(false);
                            }}
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                width: '100%'
                            }}
                        >
                            Cancel
                        </Button>
                    </Box >
                }

            </form>

        </Box>
    );
}

export default EditActivityForm;