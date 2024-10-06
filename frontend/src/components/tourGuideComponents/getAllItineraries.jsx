import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllItineraries } from "../../services/api"; // Make sure to define this API call

const GetAllItineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    budget: '',
    date: '',
    location: '',
    language: '',
  });

  // Fetch all itineraries function
  const fetchItineraries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/itineraries'); // Adjust endpoint if needed
      setItineraries(response.data);
    } catch {
      setError('Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  // Fetch itineraries on component mount
  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
      return; // Do nothing if search term is empty
    }

    fetchSearchedItineraries(trimmedSearchTerm);
  };

  const fetchSearchedItineraries = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/searchitinerary/${name}`);
      setItineraries(response.data);
    } catch {
      setError('Failed to search itineraries');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/filteritineraries', {
        params: filter,
      });
      setItineraries(response.data);
    } catch {
      setError('Failed to filter itineraries');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Available Itineraries</h2>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Search by Name:
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Itinerary Name" 
          />
        </label>
        <button type="submit" style={{ marginLeft: '10px' }}>Search</button>
      </form>

      {/* Filter by Budget, Date, Location, Language */}
      <form onSubmit={handleFilterSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Budget:
          <input 
            type="text" 
            value={filter.budget} 
            onChange={(e) => setFilter({ ...filter, budget: e.target.value })} 
            placeholder="Min,Max" 
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Date:
          <input 
            type="date" 
            value={filter.date} 
            onChange={(e) => setFilter({ ...filter, date: e.target.value })} 
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Location:
          <input 
            type="text" 
            value={filter.location} 
            onChange={(e) => setFilter({ ...filter, location: e.target.value })} 
            placeholder="Location" 
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Language:
          <input 
            type="text" 
            value={filter.language} 
            onChange={(e) => setFilter({ ...filter, language: e.target.value })} 
            placeholder="Language" 
          />
        </label>
        <button type="submit" style={{ marginLeft: '10px' }}>Filter</button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>{itinerary.name}</h3>
            <p><strong>Location:</strong> {itinerary.location}</p>
            <p><strong>Price:</strong> ${itinerary.price}</p>
            <p><strong>Duration:</strong> {itinerary.duration} hours</p>
            <p><strong>Language:</strong> {itinerary.language}</p>
            <p><strong>Pick-Up/Drop-Off:</strong> {itinerary.pickUpDropOffLocation}</p>
            <p><strong>Available Dates:</strong></p>
            <ul>
              {itinerary.availableDates.map((date, index) => (
                <li key={index}>
                  {new Date(date.startDate).toLocaleDateString()} - {new Date(date.endDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
            <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
            <p><strong>Activities:</strong></p>
            <ul>
              {itinerary.activities.map((activity) => (
                <li key={activity._id}>{activity.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllItineraries;
