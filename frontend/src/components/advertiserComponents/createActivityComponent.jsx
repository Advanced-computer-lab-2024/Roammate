import { useState, useEffect } from "react";
import {
  createActivity,
  fetchCategories,
  fetchPreferenceTags,
} from "../../services/api"; //

const CreateActivityComponent = ({ id }) => {
  const [name, setName] = useState("");
  const [locationType] = useState("Point");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isBookingAvailable, setIsBookingAvailable] = useState(true);

  // Fetch categories and tags when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        const fetchedTags = (await fetchPreferenceTags()).data;
        setAllCategories(fetchedCategories);
        setAllTags(fetchedTags);
      } catch (error) {
        console.error("Error fetching categories or tags:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      location: {
        type: locationType,
        coordinates,
      },
      price,
      category,
      tags,
      advertiser: [id],
      availability: {
        startDate,
        endDate,
      },
      isBookingAvailable,
    };

    try {
      const response = await createActivity(data); // Assuming you have a createActivity function in your API
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <div>
        <div>Creating Activity</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            min="0"
          />

          {/* Category Dropdown */}
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

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

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <label htmlFor="isBookingAvailable">Booking Available:</label>
          <input
            type="checkbox"
            id="isBookingAvailable"
            checked={isBookingAvailable}
            onChange={(e) => setIsBookingAvailable(e.target.checked)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateActivityComponent;
