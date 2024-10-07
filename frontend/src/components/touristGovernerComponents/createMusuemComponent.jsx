import { useState, useEffect } from "react";
import {
  createMuseum,
  fetchPreferenceTags,
  fetchMuseumTags,
} from "../../services/api";

const CreateMuseumComponent = ({ id }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([""]);
  const [locationType] = useState("Point");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [openingHours, setOpeningHours] = useState([
    { day: "", open: "", close: "" },
  ]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allMuseumTags, setAllMuseumTags] = useState([]);

  // Fetch tags when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = (await fetchPreferenceTags()).data;
        const fetchedMuseumTags = (await fetchMuseumTags()).data;
        setAllTags(fetchedTags);
        setAllMuseumTags(fetchedMuseumTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      pictures,
      location: {
        type: locationType,
        coordinates,
      },
      openingHours,
      ticketPrice,
      tags,
    };

    try {
      const response = await createMuseum(data);
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handlePictureChange = (index, value) => {
    const newPictures = [...pictures];
    newPictures[index] = value;
    setPictures(newPictures);
  };

  const addOpeningHour = () => {
    setOpeningHours([...openingHours, { day: "", open: "", close: "" }]);
  };

  const handleOpeningHourChange = (index, field, value) => {
    const newOpeningHours = [...openingHours];
    newOpeningHours[index][field] = value;
    setOpeningHours(newOpeningHours);
  };

  return (
    <div>
      <h2>Creating Museum</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="pictures">Pictures:</label>
        {pictures.map((picture, index) => (
          <input
            key={index}
            type="text"
            placeholder="Picture URL"
            value={picture}
            onChange={(e) => handlePictureChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={() => setPictures([...pictures, ""])}>
          Add Picture
        </button>

        <label htmlFor="coordinates">Coordinates:</label>
        <input
          type="number"
          id="longitude"
          placeholder="Longitude"
          value={coordinates[0]}
          onChange={(e) =>
            setCoordinates([parseFloat(e.target.value), coordinates[1]])
          }
          required
        />
        <input
          type="number"
          id="latitude"
          placeholder="Latitude"
          value={coordinates[1]}
          onChange={(e) =>
            setCoordinates([coordinates[0], parseFloat(e.target.value)])
          }
          required
        />

        <label htmlFor="openingHours">Opening Hours:</label>
        {openingHours.map((openingHour, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Day"
              value={openingHour.day}
              onChange={(e) =>
                handleOpeningHourChange(index, "day", e.target.value)
              }
              required
            />
            <input
              type="time"
              placeholder="Open"
              value={openingHour.open}
              onChange={(e) =>
                handleOpeningHourChange(index, "open", e.target.value)
              }
              required
            />
            <input
              type="time"
              placeholder="Close"
              value={openingHour.close}
              onChange={(e) =>
                handleOpeningHourChange(index, "close", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={addOpeningHour}>
          Add Opening Hour
        </button>

        <label htmlFor="ticketPrice">Ticket Price:</label>
        <input
          type="number"
          id="ticketPrice"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(parseFloat(e.target.value))}
          required
          min="0"
        />

        {/* Tags Dropdown */}
        <label htmlFor="tags">Tags:</label>
        <select
          id="tags"
          value={tags}
          onChange={(e) => setTags([...tags, e.target.value])}
          multiple
          required
        >
          {Array.isArray(allTags) && allTags.length > 0 ? (
            allTags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))
          ) : (
            <option disabled>No Tags Available</option>
          )}
        </select>

        {/* Museum Tags Dropdown */}
        <label htmlFor="museumTags">Museum Tags:</label>
        <select
          id="museumTags"
          value={tags}
          onChange={(e) => setTags([...tags, e.target.value])}
          multiple
          required
        >
          {Array.isArray(allMuseumTags) && allMuseumTags.length > 0 ? (
            allMuseumTags.map((museumTag) => (
              <option key={museumTag._id} value={museumTag._id}>
                {museumTag.type} : {museumTag.value}
              </option>
            ))
          ) : (
            <option disabled>No Museum Tags Available</option>
          )}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMuseumComponent;
