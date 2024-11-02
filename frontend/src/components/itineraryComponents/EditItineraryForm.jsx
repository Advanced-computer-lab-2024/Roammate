import { Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAllPreferenceTags, updateItinerary } from "../../services/api";

const EditItineraryForm = ({ itinerary }) => {

    const [title, setTitle] = useState(itinerary.title);
    const [duration, setDuration] = useState(itinerary.duration);
    const [timeline, setTimeline] = useState(itinerary.timeline);
    const [price, setPrice] = useState(itinerary.price);
    const [startDate, setStartDate] = useState(dayjs(itinerary.startDate));
    const [endDate, setEndDate] = useState(dayjs(itinerary.endDate));
    const [lang, setLang] = useState(itinerary.lang);
    const [pickUpLocation, setPickUpLocation] = useState(itinerary.pickUpLocation);
    const [dropOffLocation, setDropOffLocation] = useState(itinerary.dropOffLocation);
    const [isBookingAvailable, setIsBookingAvailable] = useState(itinerary.isBookingAvailable);
    const [selectedTags, setSelectedTags] = useState(itinerary.tags.map((tag) => tag.name));
    const [AllAvailableTags, setAllAvailableTags] = useState([])
    const [edit, setEdit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                const tags = await fetchAllPreferenceTags();
                setAllAvailableTags(tags);
            } catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [])

    const handleTagChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleTimelineChange = (dayIndex, planIndex, field, value) => {
        const updatedTimeline = [...timeline];
        updatedTimeline[dayIndex].plan[planIndex][field] = value;
        setTimeline(updatedTimeline);
    };

    const handleAddActivity = (dayIndex) => {
        const newActivity = {
            startTime: '',
            activity: '',
            location: '',
            description: '',
        };
        const updatedTimeline = [...timeline];
        updatedTimeline[dayIndex].plan.push(newActivity);
        setTimeline(updatedTimeline);
    };

    const handleAddDay = () => {
        const newDay = {
            day: timeline.length + 1,
            plan: [
                {
                    startTime: '',
                    activity: '',
                    location: '',
                    description: '',
                    accessibility: false,
                },
            ],
        };
        setTimeline([...timeline, newDay]);
    };
    const handleDeleteDay = (index) => {
        const newTimeline = timeline.filter((day, i) => i !== index);
        setTimeline(newTimeline);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const newItinerary = {
            title,
            duration,
            timeline,
            price,
            startDate,
            endDate,
            lang,
            pickUpLocation,
            dropOffLocation,
            isBookingAvailable,
            tags: AllAvailableTags.filter((tag) => selectedTags.includes(tag.name)).map((tag) => tag._id),
        }
        try {
            await updateItinerary(itinerary._id, newItinerary);
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
                width: '350px',
            }}
        >
            <h2>Itinerary Details</h2>

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
                    label="Duration"
                    variant="outlined"
                    value={duration}
                    disabled={disabled}
                    onChange={(e) => setDuration(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                {/*Timeline*/}
                <h2>Timeline</h2>
                {timeline && timeline.length > 0 && timeline.map((day, index) => (
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
                            }} variant="h6">Day {index + 1} </Typography>

                            <IconButton disabled={disabled} onClick={() => {
                                handleDeleteDay(index);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        {day.plan && day.plan.length > 0 && day.plan.map((plan, i) => (
                            <Box key={i} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'start',
                                alignItems: 'start',
                                gap: '10px',
                                width: '100%',
                            }}>
                                <TextField
                                    label="Start Time"
                                    variant="outlined"
                                    value={plan.startTime}
                                    type="time"
                                    disabled={disabled}
                                    onChange={(e) => handleTimelineChange(index, i, 'startTime', e.target.value)}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                                <TextField
                                    label="Activity"
                                    variant="outlined"
                                    value={plan.activity}
                                    disabled={disabled}
                                    onChange={(e) => handleTimelineChange(index, i, 'activity', e.target.value)}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                                <TextField
                                    label="Location"
                                    variant="outlined"
                                    value={plan.location}
                                    disabled={disabled}
                                    onChange={(e) => handleTimelineChange(index, i, 'location', e.target.value)}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    value={plan.description}
                                    disabled={disabled}
                                    onChange={(e) => handleTimelineChange(index, i, 'description', e.target.value)}
                                    sx={{
                                        width: '100%',
                                        mb: '30px',
                                    }}
                                />

                            </Box>

                        )
                        )}
                        <Button variant="contained"
                            disabled={disabled}
                            sx={{
                                width: '100%',
                                backgroundColor: 'gray',
                            }} onClick={() => handleAddActivity(index)}>
                            Add Activity
                        </Button>

                    </Box>


                ))}

                <Button variant="contained"
                    disabled={disabled}
                    sx={{
                        width: '100%',
                        backgroundColor: 'gray',
                    }} onClick={handleAddDay}>Add Day</Button>

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
                        width: '100%',
                        mb: '20px',
                    }}
                >
                    Edit
                </Button>}

                {edit &&
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: '100%',
                        mb: '20px',
                    }}>
                        <Button
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

export default EditItineraryForm;