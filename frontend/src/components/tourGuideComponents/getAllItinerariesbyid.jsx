import { useState } from "react";
import { getItineraryById } from "../../services/api"; // Make sure to define this API call

const ViewItineraryComponent = () => {
  const [itineraryId, setItineraryId] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setItineraryId(e.target.value);
  };

  const handleView = async () => {
    try {
      const response = await getItineraryById(itineraryId);
      setItinerary(response.data);
      setError(null);
    } catch (error) {
      setItinerary(null);
      setError("Itinerary not found");
    }
  };

  return (
    <div>
      <h2>View Itinerary</h2>
      <input
        type="text"
        placeholder="Enter Itinerary ID"
        value={itineraryId}
        onChange={handleChange}
      />
      <button onClick={handleView}>View Itinerary</button>

      {itinerary && (
        <div>
          <h3>Itinerary Details</h3>
          <p>Name: {itinerary.name}</p>
          <p>Location: {itinerary.location}</p>
          <p>Price: {itinerary.price}</p>
          {/* Add more fields as needed */}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ViewItineraryComponent;
