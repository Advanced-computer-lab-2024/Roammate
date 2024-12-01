import { useEffect, useState } from 'react';
import { createItinerary, fetchAllPreferenceTags } from '../../services/api';
import { Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateItinerary = () => {
  const id = localStorage.getItem('userId');


  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [timeline, setTimeline] = useState([{
    day: 1,
    plan: [
      {
        startTime: '',
        activity: '',
        location: '',
        description: '',
        accessibility: false,
      },
    ],
  }]);
  const [price, setPrice] = useState();
  const [lang, setLang] = useState();
  const [pickUpLocation, setPickUpLocation] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();
  const [isBookingAvailable, setIsBookingAvailable] = useState();
  const [tags, setTags] = useState([]);
  const [AllAvailableTags, setAllAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Itinerary = {
      title,
      duration,
      startDate,
      endDate,
      timeline,
      price,
      lang,
      pickUpLocation,
      dropOffLocation,
      isBookingAvailable,
      tags: AllAvailableTags.filter((tag) => selectedTags.includes(tag.name)).map((tag) => tag._id),
      tourGuide: id,
    };
    try {
      await createItinerary(Itinerary);
      setMsg('Itinerary created successfully');
      setDisabled(true);
    } catch (error) {
      setMsg('Failed to create itinerary');
    }
  };

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
      <h2>Itinerary Details</h2>

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

        {/*Language*/}
        <TextField
          label="Language"
          variant="outlined"
          value={lang}
          disabled={disabled}
          onChange={(e) => setLang(e.target.value)}
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

        {/*Pick Up Location*/}
        <h2>Pick Up Location</h2>
        <TextField
          label="Pick Up Location"
          variant="outlined"
          value={pickUpLocation}
          disabled={disabled}
          onChange={(e) => setPickUpLocation(e.target.value)}
          sx={{
            width: '100%',
          }}
        />

        {/*Drop Off Location*/}
        <h2>Drop Off Location</h2>
        <TextField
          label="Drop Off Location"
          variant="outlined"
          value={dropOffLocation}
          disabled={disabled}
          onChange={(e) => setDropOffLocation(e.target.value)}
          sx={{
            width: '100%',
          }}
        />


        {/*Date and Time*/}
        <h2>Date</h2>
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
        <Typography
          sx={{
            color: `${msg === 'Itinerary created successfully' ? 'green' : 'red'}`,
          }}
        >{msg}</Typography>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: '100%',
          }}
          disabled={disabled || !title || !duration || !startDate || !endDate || !timeline || !price || !lang || !pickUpLocation || !dropOffLocation || !isBookingAvailable}
        >
          Create Itinerary
        </Button>

      </form>
    </Box>
  );
};

export default CreateItinerary;
