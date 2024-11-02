import { useState, useEffect } from "react";
import {
  createMonument,
  fetchPreferenceTags,
  fetchMonumentTags,
} from "../../services/api";

const CreateMonumentComponent = ({ id }) => {
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
  const [allMonumentTags, setAllMonumentTags] = useState([]);

  // Fetch tags when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = (await fetchPreferenceTags()).data;
        const fetchedMonumentTags = (await fetchMonumentTags()).data;
        setAllTags(fetchedTags);
        setAllMonumentTags(fetchedMonumentTags);
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
      const response = await createMonument(data);
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
      <h2>Creating Monument</h2>
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

        {/* Monument Tags Dropdown */}
        <label htmlFor="monumentTags">Monument Tags:</label>
        <select
          id="monumentTags"
          value={tags}
          onChange={(e) => setTags([...tags, e.target.value])}
          multiple
          required
        >
          {Array.isArray(allMonumentTags) && allMonumentTags.length > 0 ? (
            allMonumentTags.map((monumentTag) => (
              <option key={monumentTag._id} value={monumentTag._id}>
                {monumentTag.type} : {monumentTag.value}
              </option>
            ))
          ) : (
            <option disabled>No Monument Tags Available</option>
          )}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMonumentComponent;
