import { useEffect, useState } from "react";
import { fetchFilteredMuseums, fetchMuseumTags } from "../../services/api"; // Import relevant API functions

const FilterMuseums = () => {
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMuseums, setShowMuseums] = useState(false);
  const [allTags, setAllTags] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]); // Array to store selected tags

  const loadMuseums = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await fetchFilteredMuseums({
        tags: filters.selectedTags,
      });
      setMuseums(response.data);
    } catch (err) {
      setError("Failed to load museums.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const fetchedTags = (await fetchMuseumTags()).data; // Fetch tags for filtering
      setAllTags(fetchedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleToggleMuseums = () => {
    setShowMuseums((prev) => !prev);
    if (!showMuseums) {
      loadMuseums({ selectedTags });
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadMuseums({ selectedTags });
  };

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId)); // Remove tag if already selected
    } else {
      setSelectedTags([...selectedTags, tagId]); // Add tag if not selected
    }
  };

  useEffect(() => {
    loadMuseums();
    loadTags();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleMuseums}>
        {showMuseums ? "Hide Museums" : "Show Museums"}
      </button>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>Select Tags:</label>
          <div>
            {allTags.map((tag) => (
              <div key={tag._id}>
                <label>
                  <input
                    type="checkbox"
                    value={tag._id}
                    checked={selectedTags.includes(tag._id)}
                    onChange={() => handleTagChange(tag._id)}
                  />
                  {tag.type} : {tag.value}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Apply Filters</button>
      </form>

      {/* Display Museums */}
      {showMuseums && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {museums.map((museum) => (
            <li
              key={museum._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0" }}>{museum.name}</h3>
              <p>
                <strong>Description:</strong> {museum.description}
              </p>
              {museum.location && museum.location.coordinates && (
                <p>
                  <strong>Location:</strong>{" "}
                  {museum.location.coordinates.join(", ")}
                </p>
              )}
              <p>
                <strong>Ticket Price:</strong> ${museum.ticketPrice}
              </p>
              <div>
                <strong>Opening Hours:</strong>
                <ul>
                  {museum.openingHours.map((hours, index) => (
                    <li key={index}>
                      {hours.day}: {hours.open} - {hours.close}
                    </li>
                  ))}
                </ul>
              </div>
              {museum.pictures.length > 0 && (
                <div>
                  <strong>Pictures:</strong>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {museum.pictures.map((picture, index) => (
                      <img
                        key={index}
                        src={picture}
                        alt={museum.name}
                        style={{ width: "100px", margin: "5px" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterMuseums;
