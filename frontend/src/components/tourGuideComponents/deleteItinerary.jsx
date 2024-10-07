import { useState } from "react";
import { deleteItinerary } from "../../services/api"; // Make sure to define this API call

const DeleteItineraryComponent = () => {
  const [itineraryId, setItineraryId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteItinerary(itineraryId);
      setMessage("Itinerary deleted successfully.");
    } catch (error) {
      setMessage("Failed to delete itinerary.");
    }
  };

  return (
    <div>
      <h2>Delete Itinerary</h2>
      <input
        type="text"
        placeholder="Enter Itinerary ID"
        value={itineraryId}
        onChange={(e) => setItineraryId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Itinerary</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteItineraryComponent;
