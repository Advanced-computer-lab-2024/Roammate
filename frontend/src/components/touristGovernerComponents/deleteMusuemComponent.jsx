import { useEffect, useState } from "react";
import { fetchMuseums, deleteMuseum } from "../../services/api"; // Ensure you have a deleteMuseum function in your API services

const DeleteMuseumComponent = () => {
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMuseums, setShowMuseums] = useState(false);

  const loadMuseums = async () => {
    setLoading(true);
    try {
      const response = await fetchMuseums();
      setMuseums(response.data);
    } catch (err) {
      setError("Failed to load museums.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMuseums();
  }, []);

  const handleDelete = async (museumId) => {
    if (!window.confirm("Are you sure you want to delete this museum?")) return;

    try {
      console.log(museumId);
      await deleteMuseum(museumId);
      setMuseums(museums.filter((museum) => museum._id !== museumId));
      alert("Museum deleted successfully.");
    } catch (error) {
      console.error("Error deleting museum:", error);
      alert("Failed to delete museum.");
    }
  };

  const handleToggleMuseums = () => {
    setShowMuseums((prev) => !prev);
    if (!showMuseums) {
      loadMuseums();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleToggleMuseums}>
        {showMuseums ? "Hide Museums" : "Show Delete Museums"}
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
                <strong>Entry Fee:</strong> ${museum.entryFee}
              </p>

              {museum.openingHours && (
                <p>
                  <strong>Opening Hours:</strong>{" "}
                  {museum.openingHours.map((hours) => (
                    <span key={hours._id}>
                      {hours.day}: {hours.open} - {hours.close}
                      <br />
                    </span>
                  ))}
                </p>
              )}

              <p>
                <strong>Booking Available:</strong>{" "}
                {museum.isBookingAvailable ? "Yes" : "No"}
              </p>

              <button
                onClick={() => handleDelete(museum._id)}
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

export default DeleteMuseumComponent;
