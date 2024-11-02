import { useEffect, useState } from "react";
import { fetchMonuments, updateMonument } from "../../services/api";

const GetMonumentsWithEdit = () => {
  const [monuments, setMonuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMonuments, setShowMonuments] = useState(false);
  const [editingMonument, setEditingMonument] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    location: { coordinates: ["", ""] },
    openingHours: "",
    ticketPrice: "",
    isAccessible: false,
    category: [], // Assuming this will be IDs for the categories
    tags: [],
    rating: "", // Add ratings field
  });

  const loadMonuments = async () => {
    setLoading(true);
    try {
      const response = await fetchMonuments();
      setMonuments(response.data);
    } catch (err) {
      setError("Failed to load monuments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMonuments = () => {
    setShowMonuments((prev) => !prev);
    if (!showMonuments) {
      loadMonuments();
    }
  };

  const handleEditClick = (monument) => {
    setEditingMonument(monument);
    setUpdatedDetails({
      name: monument.name,
      location: { coordinates: monument.location.coordinates },
      openingHours: monument.openingHours,
      ticketPrice: monument.ticketPrice,
      isAccessible: monument.isAccessible,
      category: monument.category.map((cat) => cat._id), // Store IDs of the categories
      tags: monument.tags.map((tag) => tag._id), // Store IDs of the tags
      rating: monument.rating,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    if (name === "location") {
      const coords = value.split(",").map((coord) => coord.trim());
      setUpdatedDetails((prev) => ({
        ...prev,
        location: { coordinates: coords },
      }));
    } else if (name === "category" || name === "tags") {
      const items = value.split(",").map((item) => item.trim());
      setUpdatedDetails((prev) => ({ ...prev, [name]: items }));
    } else {
      setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirmEdit = async () => {
    try {
      await updateMonument(editingMonument._id, updatedDetails);
      setEditingMonument(null); // Close the edit form
      loadMonuments(); // Refresh monuments
    } catch (err) {
      console.error("Error updating monument:", err);
      setError("Failed to update monument."); // Set error state to inform user
    }
  };

  useEffect(() => {
    loadMonuments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleMonuments}>
        {showMonuments ? "Hide Monuments" : "Show Monuments"}
      </button>
      {showMonuments && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {monuments.map((monument) => (
            <li
              key={monument._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0" }}>{monument.name}</h3>

              {monument.location && monument.location.coordinates && (
                <p>
                  <strong>Location:</strong>{" "}
                  {monument.location.coordinates.join(", ")}
                </p>
              )}

              <p>
                {monument.openingHours.map((hours) => (
                  <p
                    key={hours._id}
                  >{`${hours.day}: ${hours.open} - ${hours.close}`}</p>
                ))}
              </p>
              <p>
                <strong>Ticket Price:</strong> ${monument.ticketPrice}
              </p>
              <p>
                <strong>Accessible:</strong>{" "}
                {monument.isAccessible ? "Yes" : "No"}
              </p>

              {monument.category && monument.category.length > 0 && (
                <p>
                  <strong>Categories:</strong>{" "}
                  {monument.category.map((cat, index) => (
                    <span key={index}>
                      {cat.name}
                      {index < monument.category.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              {monument.tags && monument.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong>{" "}
                  {monument.tags.map((tag, index) => (
                    <span key={index}>
                      {tag.name}
                      {index < monument.tags.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              {monument.monumentTags && monument.monumentTags.length > 0 && (
                <p>
                  <strong>Specific Tags:</strong>{" "}
                  {monument.monumentTags.map((tag, index) => (
                    <span key={index}>
                      {tag.name}
                      {index < monument.tags.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              <button onClick={() => handleEditClick(monument)}>Edit</button>

              {editingMonument && editingMonument._id === monument._id && (
                <div>
                  <h4>Edit Monument</h4>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={updatedDetails.name}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Location (Lat, Lng):
                    <input
                      type="text"
                      name="location"
                      value={updatedDetails.location.coordinates.join(", ")}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Opening Hours:
                    <input
                      type="text"
                      name="openingHours"
                      value={updatedDetails.openingHours}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Ticket Price:
                    <input
                      type="number"
                      name="ticketPrice"
                      value={updatedDetails.ticketPrice}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Accessible:
                    <input
                      type="checkbox"
                      name="isAccessible"
                      checked={updatedDetails.isAccessible}
                      onChange={() =>
                        setUpdatedDetails((prev) => ({
                          ...prev,
                          isAccessible: !prev.isAccessible,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Category (IDs separated by commas):
                    <input
                      type="text"
                      name="category"
                      value={updatedDetails.category.join(",")}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Tags (IDs separated by commas):
                    <input
                      type="text"
                      name="tags"
                      value={updatedDetails.tags.join(",")}
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Rating:
                    <input
                      type="number"
                      name="rating"
                      value={updatedDetails.rating}
                      min="1"
                      max="5"
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <button onClick={handleConfirmEdit}>Confirm Edit</button>
                  <button onClick={() => setEditingMonument(null)}>Cancel</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetMonumentsWithEdit;
