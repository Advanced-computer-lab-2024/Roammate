import { useState, useEffect } from "react";
import { createItinerary, fetchActivities } from "../../services/api"; // Ensure to define fetchActivities in your API service

const CreateItineraryComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    activities: [],
    location: "",
    price: 0,
    language: "English",
    availableDates: [{ startDate: "", endDate: "" }],
    pickUpDropOffLocation: "",
    accessibility: false,
    duration: 0,
  });

  const [allActivities, setAllActivities] = useState([]); // State to hold activities fetched from the backend

  // Fetch activities when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedActivities = (await fetchActivities()).data;
        setAllActivities(fetchedActivities); // Assuming fetchActivities returns an array of activities
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle date input change for available dates
  const handleDateChange = (index, field, value) => {
    const updatedDates = [...formData.availableDates];
    updatedDates[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      availableDates: updatedDates,
    }));
  };

  // Add new date range
  const addDateRange = () => {
    setFormData((prevData) => ({
      ...prevData,
      availableDates: [
        ...prevData.availableDates,
        { startDate: "", endDate: "" },
      ],
    }));
  };

  // Handle activity selection
  const handleActivityChange = (e) => {
    const selectedActivities = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      activities: selectedActivities,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createItinerary(formData);
      console.log("Itinerary created:", response.data);
    } catch (error) {
      console.error("Error creating itinerary:", error);
    }
  };

  return (
    <div>
      <h2>Create Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Available Dates:</label>
          {formData.availableDates.map((dateRange, index) => (
            <div key={index}>
              <label htmlFor={`startDate-${index}`}>Start Date:</label>
              <input
                type="date"
                id={`startDate-${index}`}
                value={dateRange.startDate}
                onChange={(e) =>
                  handleDateChange(index, "startDate", e.target.value)
                }
                required
              />

              <label htmlFor={`endDate-${index}`}>End Date:</label>
              <input
                type="date"
                id={`endDate-${index}`}
                value={dateRange.endDate}
                onChange={(e) =>
                  handleDateChange(index, "endDate", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={addDateRange}>
            Add Date Range
          </button>
        </div>

        {/* Activity Dropdown */}
        <div>
          <label htmlFor="activities">Select Activities:</label>
          <select
            id="activities"
            multiple
            value={formData.activities}
            onChange={handleActivityChange}
            required
          >
            {allActivities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pickUpDropOffLocation">
            Pick Up/Drop Off Location:
          </label>
          <input
            type="text"
            id="pickUpDropOffLocation"
            name="pickUpDropOffLocation"
            value={formData.pickUpDropOffLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="accessibility">Accessibility:</label>
          <input
            type="checkbox"
            id="accessibility"
            name="accessibility"
            checked={formData.accessibility}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration (hours):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <button type="submit">Create Itinerary</button>
      </form>
    </div>
  );
};

export default CreateItineraryComponent;
