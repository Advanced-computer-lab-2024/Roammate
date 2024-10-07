import React, { useEffect, useState } from "react";
import { getAllItineraries } from "../../services/api"; // Import the service function

const GetAllItineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the button click and fetch itineraries
  const fetchItineraries = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await getAllItineraries(); // Call the service function
      setItineraries(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>All Itineraries</h2>
      <button onClick={fetchItineraries}>Load Itineraries</button>

      {loading && <p>Loading itineraries...</p>}
      {error && <p>Error: {error}</p>}

      {itineraries.length === 0 && !loading && !error ? (
        <p>No itineraries loaded yet. Click the button to load itineraries.</p>
      ) : (
        <ul>
          {itineraries.map((itinerary) => (
            <li key={itinerary._id}>
              <h3>{itinerary.name}</h3>
              <p>Location: {itinerary.location}</p>
              <p>Price: ${itinerary.price}</p>
              <p>Duration: {itinerary.duration} hours</p>
              <p>Language: {itinerary.language}</p>
              <p>Accessibility: {itinerary.accessibility ? "Yes" : "No"}</p>
              <p>Pickup/Dropoff Location: {itinerary.pickUpDropOffLocation}</p>
              <p>
                Available Dates:{" "}
                {itinerary.availableDates.map((date, index) => (
                  <span key={index}>
                    {new Date(date.startDate).toLocaleDateString()} -{" "}
                    {new Date(date.endDate).toLocaleDateString()}
                  </span>
                ))}
              </p>
              <h4>Activities:</h4>
              <ul>
                {itinerary.activities.map((activity) => (
                  <li key={activity._id}>{activity.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllItineraries;
