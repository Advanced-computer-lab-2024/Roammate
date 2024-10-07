import { useEffect, useState } from "react";
import { fetchMuseums, updateMuseum } from "../../services/api";

const GetMuseumsWithEdit = () => {
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMuseums, setShowMuseums] = useState(false);
  const [editingMuseum, setEditingMuseum] = useState(null);
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

  const loadMuseums = async () => {
    setLoading(true);
    try {
      const response = await fetchMuseums();
      setMuseums(response.data);
    } catch (err) {
      setError("Failed to load museums.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMuseums = () => {
    setShowMuseums((prev) => !prev);
    if (!showMuseums) {
      loadMuseums();
    }
  };

  const handleEditClick = (museum) => {
    setEditingMuseum(museum);
    setUpdatedDetails({
      name: museum.name,
      location: { coordinates: museum.location.coordinates },
      openingHours: museum.openingHours,
      ticketPrice: museum.ticketPrice,
      isAccessible: museum.isAccessible,
      category: museum.category.map((cat) => cat._id), // Store IDs of the categories
      tags: museum.tags.map((tag) => tag._id), // Store IDs of the tags
      rating: museum.rating,
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
      await updateMuseum(editingMuseum._id, updatedDetails);
      setEditingMuseum(null); // Close the edit form
      loadMuseums(); // Refresh museums
    } catch (err) {
      console.error("Error updating museum:", err);
      setError("Failed to update museum."); // Set error state to inform user
    }
  };

  useEffect(() => {
    loadMuseums();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleMuseums}>
        {showMuseums ? "Hide Museums" : "Show Museums"}
      </button>
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

              {museum.location && museum.location.coordinates && (
                <p>
                  <strong>Location:</strong>{" "}
                  {museum.location.coordinates.join(", ")}
                </p>
              )}

              <p>
                {museum.openingHours.map((hours) => (
                  <p
                    key={hours._id}
                  >{`${hours.day}: ${hours.open} - ${hours.close}`}</p>
                ))}
              </p>
              <p>
                <strong>Ticket Price:</strong> ${museum.ticketPrice}
              </p>
              <p>
                <strong>Accessible:</strong>{" "}
                {museum.isAccessible ? "Yes" : "No"}
              </p>

              {museum.category && museum.category.length > 0 && (
                <p>
                  <strong>Categories:</strong>{" "}
                  {museum.category.map((cat, index) => (
                    <span key={index}>
                      {cat.name}
                      {index < museum.category.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              {museum.tags && museum.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong>{" "}
                  {museum.tags.map((tag, index) => (
                    <span key={index}>
                      {tag.name}
                      {index < museum.tags.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              {museum.specificTags && museum.specificTags.length > 0 && (
                <p>
                  <strong>Specific Tags:</strong>{" "}
                  {museum.specificTags.map((tag, index) => (
                    <span key={index}>
                      {tag.name}
                      {index < museum.tags.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              <button onClick={() => handleEditClick(museum)}>Edit</button>

              {editingMuseum && editingMuseum._id === museum._id && (
                <div>
                  <h4>Edit Museum</h4>
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
                  <button onClick={() => setEditingMuseum(null)}>Cancel</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetMuseumsWithEdit;
