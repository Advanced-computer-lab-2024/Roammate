import { useEffect, useState } from "react";
import { fetchMuseums } from "../../services/api"; // Assume you have an API service for fetching museums

const GetMuseums = () => {
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

  const handleToggleMuseums = () => {
    setShowMuseums((prev) => !prev);
    if (!showMuseums) {
      loadMuseums();
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
              <p>
                <strong>Description:</strong> {museum.description}
              </p>

              {museum.location && museum.location.coordinates && (
                <p>
                  <strong>Location:</strong>{" "}
                  {museum.location.coordinates.join(", ")}
                </p>
              )}

              {museum.pictures && museum.pictures.length > 0 && (
                <div>
                  <strong>Pictures:</strong>
                  <ul>
                    {museum.pictures.map((pic, index) => (
                      <li key={index}>
                        <img
                          src={pic}
                          alt={`Museum picture ${index + 1}`}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p>
                <strong>Ticket Price:</strong> ${museum.ticketPrice}
              </p>

              {museum.openingHours && museum.openingHours.length > 0 && (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetMuseums;
