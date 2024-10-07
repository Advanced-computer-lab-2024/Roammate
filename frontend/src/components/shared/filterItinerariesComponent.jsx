import { useEffect, useState } from "react";
import { fetchFilteredItineraries, fetchLocations } from "../../services/api"; // Adjust this import as needed

const FilterItineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showItineraries, setShowItineraries] = useState(false);
  const [allLocations, setAllLocations] = useState([]);

  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [sortOption, setSortOption] = useState("price");
  const [sortDirection, setSortDirection] = useState("ascending");

  const loadItineraries = async (filters = {}) => {
    setLoading(true);

    const query = {};
    if (filters.budget) query.budget = filters.budget;
    if (filters.date) query.date = filters.date;
    if (filters.location) query.location = filters.location;
    if (filters.duration) query.duration = filters.duration;

    try {
      const response = await fetchFilteredItineraries(query);
      setItineraries(response.data);
    } catch (err) {
      setError("Failed to load itineraries.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadLocations = async () => {
    try {
      const fetchedLocations = await fetchLocations();
      setAllLocations(fetchedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleToggleItineraries = () => {
    setShowItineraries((prev) => !prev);
    if (!showItineraries) {
      loadItineraries({ budget, date, location, duration });
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadItineraries({ budget, date, location, duration });
  };

  useEffect(() => {
    loadItineraries();
    loadLocations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Sort itineraries based on the selected sortOption and sortDirection
  const sortedItineraries = [...itineraries].sort((a, b) => {
    let comparison = 0;

    if (sortOption === "price") {
      comparison = a.price - b.price; // Ascending order for price
    } else if (sortOption === "duration") {
      comparison = a.duration - b.duration; // Ascending order for duration
    }

    return sortDirection === "ascending" ? comparison : -comparison;
  });

  return (
    <div>
      <button onClick={handleToggleItineraries}>
        {showItineraries ? "Hide Itineraries" : "Show Itineraries"}
      </button>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>Budget:</label>
          <input
            type="text"
            placeholder="min,max"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {allLocations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Duration (hours):</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        <div>
          <label>Sort Direction:</label>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <button type="submit">Apply Filters</button>
      </form>

      {/* Display Itineraries */}
      {showItineraries && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sortedItineraries.map((itinerary) => (
            <li
              key={itinerary._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0" }}>{itinerary.name}</h3>

              <p>
                <strong>Location:</strong> {itinerary.location}
              </p>

              <p>
                <strong>Price:</strong> ${itinerary.price}
              </p>

              {itinerary.availableDates &&
                itinerary.availableDates.length > 0 && (
                  <div>
                    <strong>Available Dates:</strong>
                    <ul>
                      {itinerary.availableDates.map((date, index) => (
                        <li key={index}>
                          From {new Date(date.startDate).toLocaleDateString()}{" "}
                          to {new Date(date.endDate).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <p>
                <strong>Pick-Up/Drop-Off Location:</strong>{" "}
                {itinerary.pickUpDropOffLocation}
              </p>

              <p>
                <strong>Duration:</strong> {itinerary.duration} hours
              </p>

              <p>
                <strong>Accessibility:</strong>{" "}
                {itinerary.accessibility ? "Yes" : "No"}
              </p>

              <p>
                <strong>Language:</strong> {itinerary.language}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterItineraries;
