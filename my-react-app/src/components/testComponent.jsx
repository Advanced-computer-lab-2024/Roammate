import { useEffect, useState } from "react";
import { fetchActivities } from "../services/api"; // Adjust the path as needed

const ActivityComponent = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await fetchActivities();
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    getActivities();
  }, []);

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", "); // Join array items into a string
    } else if (typeof value === "object" && value !== null) {
      return (
        <div style={{ paddingLeft: "20px" }}>
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey}>
              <strong>{nestedKey}:</strong> {renderValue(nestedValue)}{" "}
              {/* Recursive call */}
            </div>
          ))}
        </div>
      );
    }
    return value; // For simple values (string, number, etc.)
  };

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity._id} className="activity-card">
          {Object.entries(activity).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {renderValue(value)}{" "}
              {/* Call the recursive function */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActivityComponent;
