import {
  Box,
  Button,
  Checkbox,
  Select,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchAllPreferenceTags,
  fetchAllMonumentTags,
  updateMonument,
} from "../../services/api";

const EditMuseumForm = ({ museum }) => {
  const [name, setName] = useState(museum.name);
  const [description, setDescription] = useState(museum.description);
  const [location, setLocation] = useState(museum.location);
  const [tags, setTags] = useState(museum.tags);
  const [monumentTags, setMonumentTags] = useState(museum.monumentTags);
  const [ticketPrices, setTicketPrices] = useState(museum.ticketPrices);
  const [openingHours, setOpeningHours] = useState(museum.openingHours);
  const [selectedTags, setSelectedTags] = useState(
    museum.tags.map((tag) => tag.name)
  );
  const [selectedMonumentTags, setSelectedMonumentTags] = useState(
    museum.monumentTags.map((tag) => tag.name)
  );
  const [allAvailableTags, setAllAvailableTags] = useState([]);
  const [allAvailableMonumentTags, setAllAvailableMonumentTags] = useState([]);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await fetchAllPreferenceTags();
        const monumentTags = await fetchAllMonumentTags();
        setAllAvailableTags(tags);
        setAllAvailableMonumentTags(monumentTags);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTags();
  }, []);

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleMonumentTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMonumentTags(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleTicketPriceChange = (index, field, value) => {
    const updatedPrices = [...ticketPrices];
    updatedPrices[index][field] = value;
    setTicketPrices(updatedPrices);
  };

  const handleDeleteTicketPrice = (index) => {
    const updatedPrices = [...ticketPrices];
    updatedPrices.splice(index, 1);
    setTicketPrices(updatedPrices);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedMuseum = {
      name,
      description,
      location,
      tags: allAvailableTags
        .filter((tag) => selectedTags.includes(tag.name))
        .map((tag) => tag._id),
      monumentTags: allAvailableMonumentTags
        .filter((tag) => selectedMonumentTags.includes(tag.name))
        .map((tag) => tag._id),
      ticketPrices,
      openingHours,
    };
    try {
      await updateMonument(museum._id, updatedMuseum);
      setDisabled(true);
      setEdit(false);
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        gap: "20px",
        padding: "20px",
        width: "500px",
      }}
    >
      <h2>Museum Details</h2>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          width: "100%",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        {/* Name */}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          disabled={disabled}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "100%" }}
        />

        {/* Description */}
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          value={description}
          disabled={disabled}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ width: "100%" }}
        />

        {/* Location */}
        <TextField
          label="Location (Lat, Lng)"
          variant="outlined"
          value={`${location.lng}, ${location.lat}`}
          disabled={disabled}
          onChange={(e) =>
            setLocation({ ...location, [e.target.name]: e.target.value })
          }
          sx={{ width: "100%" }}
        />

        {/* Tags */}
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allAvailableTags.map((tag) => (
              <MenuItem key={tag._id} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Monument Tags */}
        <h2>Monument Tags</h2>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Choose Monument Tags</InputLabel>
          <Select
            multiple
            value={selectedMonumentTags}
            disabled={disabled}
            onChange={handleMonumentTagChange}
            input={<OutlinedInput label="Choose Monument Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allAvailableMonumentTags.map((tag) => (
              <MenuItem key={tag._id} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Ticket Prices */}
        <h2>Ticket Prices</h2>
        {ticketPrices.map((price, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              border: "1px solid lightgray",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "gray" }}>
                Ticket Price {index + 1}
              </Typography>
              <IconButton
                disabled={disabled}
                onClick={() => handleDeleteTicketPrice(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <TextField
              placeholder="For"
              variant="outlined"
              value={price.for}
              disabled={disabled}
              onChange={(e) =>
                handleTicketPriceChange(index, "for", e.target.value)
              }
              sx={{ width: "100%" }}
            />
            <TextField
              placeholder="price"
              variant="outlined"
              type="number"
              value={price.price}
              disabled={disabled}
              onChange={(e) =>
                handleTicketPriceChange(index, "price", e.target.value)
              }
              sx={{ width: "100%" }}
            />
          </Box>
        ))}

        <Button
          variant="contained"
          disabled={disabled}
          onClick={() =>
            setTicketPrices([...ticketPrices, { for: "", price: 0 }])
          }
          sx={{ backgroundColor: "gray", color: "white", width: "100%" }}
        >
          Add Ticket Price
        </Button>

        {/* Opening Hours */}
        <h2>Opening Hours</h2>
        {openingHours.map((hours, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              border: "1px solid lightgray",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <TextField
              label="Day"
              variant="outlined"
              value={hours.day}
              disabled={disabled}
              onChange={(e) => {
                const updatedHours = [...openingHours];
                updatedHours[index].day = e.target.value;
                setOpeningHours(updatedHours);
              }}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Open"
              variant="outlined"
              type="time"
              value={hours.open}
              disabled={disabled}
              onChange={(e) => {
                const updatedHours = [...openingHours];
                updatedHours[index].open = e.target.value;
                setOpeningHours(updatedHours);
              }}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Close"
              variant="outlined"
              type="time"
              value={hours.close}
              disabled={disabled}
              onChange={(e) => {
                const updatedHours = [...openingHours];
                updatedHours[index].close = e.target.value;
                setOpeningHours(updatedHours);
              }}
              sx={{ width: "100%" }}
            />
          </Box>
        ))}

        <Divider />

        {err && <Typography sx={{ color: "red" }}>{err}</Typography>}

        {!edit && (
          <Button
            variant="contained"
            onClick={() => {
              setDisabled(false);
              setEdit(true);
            }}
            sx={{ color: "white", width: "100%" }}
          >
            Edit
          </Button>
        )}

        {edit && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "green", color: "white", width: "100%" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDisabled(true);
                setEdit(false);
              }}
              sx={{ backgroundColor: "red", color: "white", width: "100%" }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default EditMuseumForm;
