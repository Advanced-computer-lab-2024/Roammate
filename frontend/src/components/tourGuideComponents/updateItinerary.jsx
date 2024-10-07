import { useState } from "react";
import { updateItinerary } from "../../services/api"; // Make sure to define this API call

const UpdateItineraryComponent = () => {
  const [itineraryId, setItineraryId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: 0,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await updateItinerary(itineraryId, formData);
      console.log("Itinerary updated:", response.data);
      setError(null);
    } catch (error) {
      setError("Failed to update itinerary");
    }
  };

  return (
    <div>
      <h2>Update Itinerary</h2>
      <input
        type="text"
        placeholder="Enter Itinerary ID"
        value={itineraryId}
        onChange={(e) => setItineraryId(e.target.value)}
      />

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleUpdate}>Update Itinerary</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateItineraryComponent;
