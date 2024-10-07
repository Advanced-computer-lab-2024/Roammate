import { useEffect, useState } from "react";
import { fetchActivities } from "../../services/api";

const GetActivities = () => {
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

  const handleToggleActivites = () => {
    setShowActivities((prev) => !prev);
    if (!showActivities) {
      loadActivities();
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleActivites}>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetActivities;
