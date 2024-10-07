import { useEffect, useState } from "react";
import { fetchActivities, updateActivity } from "../../services/api";

const GetActivitiesWithEdit = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showActivities, setShowActivities] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    price: "",
    location: { coordinates: ["", ""] }, // Ensure default coordinates are properly handled
    // discounts: [],
    availability: { startDate: "", endDate: "" },
    isBookingAvailable: false,
    category: [], // Assuming this will be IDs for the categories
    tags: [], // Assuming this will be IDs for the tags
    rating: "", // Add ratings field
  });

  const loadActivities = async () => {
    setLoading(true);
    try {
      const response = await fetchActivities();
      setActivities(response.data);
    } catch (err) {
      setError("Failed to load activities.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActivities = () => {
    setShowActivities((prev) => !prev);
    if (!showActivities) {
      loadActivities();
    }
  };

  const handleEditClick = (activity) => {
    setEditingActivity(activity);
    setUpdatedDetails({
      name: activity.name,
      price: activity.price,
      location: { coordinates: activity.location.coordinates },
      discounts: activity.discounts,
      availability: {
        startDate: activity.availability.startDate,
        endDate: activity.availability.endDate,
      },
      isBookingAvailable: activity.isBookingAvailable,
      category: activity.category.map((cat) => cat._id), // Store IDs of the categories
      tags: activity.tags.map((tag) => tag._id), // Store IDs of the tags
      rating: activity.rating,
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
    } else if (name === "discounts" || name === "category" || name === "tags") {
      const items = value.split(",").map((item) => item.trim());
      setUpdatedDetails((prev) => ({ ...prev, [name]: items }));
    } else {
      setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirmEdit = async () => {
    try {
      await updateActivity(editingActivity._id, updatedDetails);
      setEditingActivity(null); // Close the edit form
      loadActivities(); // Refresh activities
    } catch (err) {
      console.error("Error updating activity:", err);
      setError("Failed to update activity."); // Set error state to inform user
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleActivities}>
        {showActivities ? "Hide Activities" : "Show Activities"}
      </button>
      {showActivities && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {activities.map((activity) => (
            <li
              key={activity._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0" }}>{activity.name}</h3>

              {activity.location && activity.location.coordinates && (
                <p>
                  <strong>Location:</strong>{" "}
                  {activity.location.coordinates.join(", ")}
                </p>
              )}

              <p>
                <strong>Price:</strong> ${activity.price}
              </p>

              {activity.discounts && activity.discounts.length > 0 && (
                <div>
                  <strong>Discounts:</strong>
                  <ul>
                    {activity.discounts.map((discount, index) => (
                      <li key={index}>
                        {discount.percentage}% -{" "}
                        {discount.description || "No description"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activity.availability &&
                activity.availability.startDate &&
                activity.availability.endDate && (
                  <p>
                    <strong>Availability:</strong> From{" "}
                    {new Date(
                      activity.availability.startDate
                    ).toLocaleDateString()}{" "}
                    to{" "}
                    {new Date(
                      activity.availability.endDate
                    ).toLocaleDateString()}
                  </p>
                )}

              <p>
                <strong>Booking Available:</strong>{" "}
                {activity.isBookingAvailable ? "Yes" : "No"}
              </p>

              {activity.category && activity.category.length > 0 && (
                <p>
                  <strong>Categories:</strong>{" "}
                  {activity.category.map((cat, index) => (
                    <span key={index}>
                      {cat.name}
                      {index < activity.category.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              {activity.tags && activity.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong>{" "}
                  {activity.tags.map((tag, index) => (
                    <span key={index}>
                      {tag.name}
                      {index < activity.tags.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              <p>
                <strong>Rating:</strong> {activity.rating || "No rating"}
              </p>

              <button onClick={() => handleEditClick(activity)}>Edit</button>

              {editingActivity && editingActivity._id === activity._id && (
                <div>
                  <h4>Edit Activity</h4>
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
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={updatedDetails.price}
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
                  {/* <label>
                    Discounts (format: percentage, description):
                    <input
                      type="text"
                      name="discounts"
                      value={updatedDetails.discounts.join(", ")}
                      onChange={handleUpdateChange}
                    />
                  </label> */}
                  <label>
                    Availability Start Date:
                    <input
                      type="date"
                      name="availability.startDate"
                      value={
                        updatedDetails.availability.startDate.split("T")[0]
                      } // Adjust for date input
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Availability End Date:
                    <input
                      type="date"
                      name="availability.endDate"
                      value={updatedDetails.availability.endDate.split("T")[0]} // Adjust for date input
                      onChange={handleUpdateChange}
                    />
                  </label>
                  <label>
                    Booking Available:
                    <input
                      type="checkbox"
                      name="isBookingAvailable"
                      checked={updatedDetails.isBookingAvailable}
                      onChange={() =>
                        setUpdatedDetails((prev) => ({
                          ...prev,
                          isBookingAvailable: !prev.isBookingAvailable,
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
                  <button onClick={() => setEditingActivity(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetActivitiesWithEdit;
