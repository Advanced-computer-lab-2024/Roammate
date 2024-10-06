const DEFAULT_LANGUAGE = 'English';
const DEFAULT_BUDGET = 1000;
const MIN_BUDGET = 100;
const MAX_BUDGET = 10000;
const DATE_FORMAT = 'YYYY-MM-DD';  // Assuming the format you want to use for dates


import React, { useState } from 'react';
import { filterItineraries } from "../../services/api"; // Assuming your API functions are in this file
import dayjs from 'dayjs';

const FilterItineraries = () => {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [date, setDate] = useState(dayjs().format(DATE_FORMAT)); // Default to current date
  const [preferences, setPreferences] = useState('');
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleFilter = async () => {
    const filters = {
      budget,
      date,
      preferences,
      language,
    };

    try {
      const response = await filterItineraries(filters);
      setFilteredResults(response.data);
    } catch (error) {
      console.error('Error filtering itineraries:', error);
    }
  };

  return (
    <div>
      <h3>Filter Itineraries</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleFilter(); }}>
        {/* Budget Filter */}
        <label htmlFor="budget">Budget:</label>
        <input
          type="number"
          id="budget"
          min={MIN_BUDGET}
          max={MAX_BUDGET}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        {/* Date Filter */}
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Preferences Filter */}
        <label htmlFor="preferences">Preferences (comma separated):</label>
        <input
          type="text"
          id="preferences"
          value={preferences}
          placeholder="e.g., beach, mountains"
          onChange={(e) => setPreferences(e.target.value)}
        />

        {/* Language Filter */}
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          {/* Add more language options as needed */}
        </select>

        <button type="submit">Filter</button>
      </form>

      {/* Render filtered results */}
      {filteredResults.length > 0 && (
        <div>
          <h4>Filtered Itineraries:</h4>
          <ul>
            {filteredResults.map((itinerary) => (
              <li key={itinerary.id}>
                {itinerary.name} - {itinerary.budget} - {itinerary.date} - {itinerary.language}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterItineraries;
