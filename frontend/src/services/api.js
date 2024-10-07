import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const fetchActivities = async () => {
  var activies = await axios.get(`${API_URL}activity`);
  //   alert(JSON.stringify(activies.data, null, 2));
  return activies;
};

export const fetchProducts = async () => {
  var prodcuts = await axios.get(`${API_URL}viewproducts`);
  //   alert(JSON.stringify(activies.data, null, 2));
  return prodcuts;
};

export const fetchFilteredActivities = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}filteractivities?${query}`); // Pass the query string to the backend
  return response;
};

export const fetchFilteredMuseums = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}filtermuseums?${query}`); // Pass the query string to the backend
  return response;
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

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}categories`);
  return response.data;
};

export const createActivity = async (data) => {
  const response = await axios.post(`${API_URL}activity`, data);
  return response.data;
};

export const deleteActivity = async (activityId) => {
  try {
    const response = await axios.delete(`${API_URL}activity/${activityId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};

export const updateActivity = async (activityId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}activity/${activityId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}editproduct/${productId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const fetchActivityCategories = async () => {
  return await axios.get(`${API_URL}/categories`);
};

export const createActivityCategory = async (categoryData) => {
  return await axios.post(`${API_URL}/categories`, categoryData);
};

export const updateActivityCategory = async (categoryId, categoryData) => {
  return await axios.put(`${API_URL}/categories/${categoryId}`, categoryData);
};

export const deleteActivityCategory = async (categoryId) => {
  return await axios.delete(`${API_URL}/categories/${categoryId}`);
};

export const createMuseum = async (data) => {
  return await axios.post(`${API_URL}museums`, data);
};

export const fetchMuseumTags = async () => {
  return await axios.get(`${API_URL}museumTags`);
};

export const updateMuseum = async (museumId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}museums/${museumId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating museum:", error);
    throw error;
  }
};

export const deleteMuseum = async (museumID) => {
  return await axios.delete(`${API_URL}/museums/${museumID}`);
};

export const createMuseumTag = async (tagData) => {
  return await axios.post(`${API_URL}/museumtags`, tagData);
};

export const updateMuseumTag = async (tagId, tagData) => {
  return await axios.put(`${API_URL}/museumtags/${tagId}`, tagData);
};

export const deleteMuseumTag = async (tagId) => {
  return await axios.delete(`${API_URL}/museumtags/${tagId}`);
};
