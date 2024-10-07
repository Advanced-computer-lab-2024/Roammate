import { useEffect, useState } from "react";
import { fetchActivities, deleteActivity } from "../../services/api"; // Make sure to have deleteActivity function in your API services

const DeleteActivityComponent = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showActivities, setShowActivities] = useState(false);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const response = await fetchActivities();
      setActivities(response.data);
    } catch (err) {
      setError("Failed to load activities.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleDelete = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;

    try {
      console.log(activityId);
      await deleteActivity(activityId);
      setActivities(
        activities.filter((activity) => activity._id !== activityId)
      );
      alert("Activity deleted successfully.");
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Failed to delete activity.");
    }
  };

  const handleToggleActivities = () => {
    setShowActivities((prev) => !prev);
    if (!showActivities) {
      loadActivities();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleActivities}>
        {showActivities ? "Hide Activities" : "Show Delete Activities"}
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

              <button
                onClick={() => handleDelete(activity._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteActivityComponent;
