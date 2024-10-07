import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const fetchActivities = async () => {
  var activies = await axios.get(`${API_URL}activity`);
  //   alert(JSON.stringify(activies.data, null, 2));
  return activies;
};

export const createPreferenceTag = async (data) => {
  const response = await axios.post(`${API_URL}preferenceTags`, data);
  return response;
};

export const fetchPreferenceTags = async () => {
  const response = await axios.get(`${API_URL}preferenceTags`);
  return response;
};

export const deletePreferenceTag = async (id) => {
  const response = await axios.delete(`${API_URL}preferenceTags/${id}`);
  return response;
};

export const updatePreferenceTag = async (id, data) => {
  const response = await axios.put(`${API_URL}preferenceTags/${id}`, data);
  return response;
};

export const createItinerary = async (data) => {
  const response = await axios.post(`${API_URL}itinerary`, data);
  return response;
};

export const getAllItineraries = async () => {
  const response = await axios.get(`${API_URL}itinerary`);
  return response;
};

// Get an itinerary by ID
export const getItineraryById = async (id) => {
  const response = await axios.get(`${API_URL}itinerary/${id}`);
  return response;
};

// Update an itinerary by ID
export const updateItinerary = async (id, data) => {
  const response = await axios.put(`${API_URL}itinerary/${id}`, data);
  return response;
};

// Delete an itinerary by ID
export const deleteItinerary = async (id) => {
  const response = await axios.delete(`${API_URL}itinerary/${id}`);
  return response;
};

// Filter itineraries based on certain criteria
export const filterItineraries = async (filters) => {
  alert(filters.location);
  const response = await axios.get(`${API_URL}itineraryFilter`, {
    params: filters,
  });
  return response;
};

export const fetchMuseums = async () => {
  var museums = await axios.get(`${API_URL}museums`);
  //   alert(JSON.stringify(activies.data, null, 2));
  return museums;
};
