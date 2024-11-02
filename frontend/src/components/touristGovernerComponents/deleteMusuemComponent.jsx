import { useEffect, useState } from "react";
import { fetchMonuments, deleteMonument } from "../../services/api"; // Ensure you have a deleteMonument function in your API services

const DeleteMonumentComponent = () => {
  const [monuments, setMonuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMonuments, setShowMonuments] = useState(false);

  const loadMonuments = async () => {
    setLoading(true);
    try {
      const response = await fetchMonuments();
      setMonuments(response.data);
    } catch (err) {
      setError("Failed to load monuments.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMonuments();
  }, []);

  const handleDelete = async (monumentId) => {
    if (!window.confirm("Are you sure you want to delete this monument?")) return;

    try {
      console.log(monumentId);
      await deleteMonument(monumentId);
      setMonuments(monuments.filter((monument) => monument._id !== monumentId));
      alert("Monument deleted successfully.");
    } catch (error) {
      console.error("Error deleting monument:", error);
      alert("Failed to delete monument.");
    }
  };

  const handleToggleMonuments = () => {
    setShowMonuments((prev) => !prev);
    if (!showMonuments) {
      loadMonuments();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleMonuments}>
        {showMonuments ? "Hide Monuments" : "Show Delete Monuments"}
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
                <strong>Entry Fee:</strong> ${monument.entryFee}
              </p>

              {monument.openingHours && (
                <p>
                  <strong>Opening Hours:</strong>{" "}
                  {monument.openingHours.map((hours) => (
                    <span key={hours._id}>
                      {hours.day}: {hours.open} - {hours.close}
                      <br />
                    </span>
                  ))}
                </p>
              )}

              <p>
                <strong>Booking Available:</strong>{" "}
                {monument.isBookingAvailable ? "Yes" : "No"}
              </p>

              <button
                onClick={() => handleDelete(monument._id)}
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

export default DeleteMonumentComponent;
