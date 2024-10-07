import { useEffect, useState } from "react";
import { fetchFilteredActivities, fetchCategories } from "../../services/api";

const FilterActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showActivities, setShowActivities] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [sortOption, setSortOption] = useState("price");
  const [sortDirection, setSortDirection] = useState("ascending");

  const loadActivities = async (filters = {}) => {
    setLoading(true);

    const query = {};
    if (filters.budget) query.budget = filters.budget;
    if (filters.date) query.date = filters.date;
    if (filters.category) query.category = filters.category;
    if (filters.rating) query.rating = filters.rating;

    try {
      const response = await fetchFilteredActivities(query);
      setActivities(response.data);
    } catch (err) {
      setError("Failed to load activities.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setAllCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories or tags:", error);
    }
  };

  const handleToggleActivities = () => {
    setShowActivities((prev) => !prev);
    if (!showActivities) {
      loadActivities({ budget, date, category, rating });
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadActivities({ budget, date, category, rating });
  };

  useEffect(() => {
    loadActivities();
    loadCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Sort activities based on the selected sortOption and sortDirection
  const sortedActivities = [...activities].sort((a, b) => {
    let comparison = 0;

    if (sortOption === "price") {
      comparison = a.price - b.price; // Ascending order for price
    } else if (sortOption === "rating") {
      comparison = (b.rating || 0) - (a.rating || 0); // Descending order for rating
    }

    return sortDirection === "ascending" ? comparison : -comparison;
  });

  return (
    <div>
      <button onClick={handleToggleActivities}>
        {showActivities ? "Hide Activities" : "Show Activities"}
      </button>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>Budget:</label>
          <input
            type="text"
            placeholder="min,max"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label>Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div>
          <label>Sort Direction:</label>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <button type="submit">Apply Filters</button>
      </form>

      {/* Display Activities */}
      {showActivities && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sortedActivities.map((activity) => (
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

              {activity.rating && (
                <p>
                  <strong>Rating:</strong> {activity.rating} / 5
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterActivities;
