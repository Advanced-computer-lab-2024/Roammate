import axios from "axios";

const API_URL = "http://localhost:8000/api/";

// ✅ This function is used to change the Password of users
export const changePassword = async (id, type, oldPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}change-password`, {
      id,
      type,
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change password."
    );
  }
};

// ✅ This function is used to fetch all activities
export const fetchActivities = async () => {
  const response = await axios.get(`${API_URL}activity`);
  return response.data;
};

// ✅ This function is used to fetch all activities (for the advertiser)
export const fetchActivitiesByAdvertiserId = async (id) => {
  var activies = await axios.get(`${API_URL}activity-advertiser/${id}`);
  return activies.data;
};

// ✅ This function is used to fetch all itineraries (for the tourGuide)
export const fetchItinerariesByTourGuideId = async (id) => {
  var itineraries = await axios.get(`${API_URL}itinerary/tourGuide/${id}`);
  return itineraries.data;
};

// ✅ This function is used to fetch all products (for the seller)
export const fetchProductsBySellerId = async (id) => {
  var prodcuts = await axios.get(`${API_URL}product-seller/${id}`);
  return prodcuts.data;
};

// ✅ This function is used to fetch all Musuems (for the Governor)
export const fetchMusuemsByTourismGovernorId = async (id) => {
  var activies = await axios.get(`${API_URL}monument/tourismGovernor/${id}`);
  return activies.data;
};

// This function is used to upload identification document for a Seller
export const uploadSellerIdentification = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}seller/identification/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to upload Taxation document for a Seller
export const uploadSellerTaxation = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}seller/taxation/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to upload Logo document for a Seller
export const uploadSellerLogo = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}seller/logo/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// ✅ This function is used to fetch all products
export const fetchProducts = async () => {
  var prodcuts = await axios.get(`${API_URL}products`);
  return prodcuts.data;
};

// ✅ This function is used to fetch an activity by ID
export const fetchActivity = async (id) => {
  const response = await axios.get(`${API_URL}activity/${id}`);
  return response.data;
};

// ✅ This function is used to create a new preference tag
export const createPreferenceTag = async (data) => {
  const response = await axios.post(`${API_URL}preferenceTags`, data);
  return response;
};

// ✅ This function is used to fetch all preference tags
export const fetchPreferenceTags = async () => {
  const response = await axios.get(`${API_URL}preferenceTags`);
  return response.data;
};

// ✅ This function is used to delete a preference tag
export const deletePreferenceTag = async (id) => {
  const response = await axios.delete(`${API_URL}preferenceTags/${id}`);
  return response;
};

// ✅ This function is used to update a preference tag
export const updatePreferenceTag = async (id, data) => {
  const response = await axios.patch(`${API_URL}preferenceTags/${id}`, data);
  return response;
};

export const createItinerary = async (data) => {
  const response = await axios.post(`${API_URL}itinerary`, data);
  return response;
};

export const getAllItineraries = async () => {
  const response = await axios.get(`${API_URL}itinerary`);
  return response.data;
};

// Fetch an itinerary by ID
export const fetchItinerary = async (id) => {
  const response = await axios.get(`${API_URL}itinerary/${id}`);
  return response.data;
};

// Update an itinerary by ID
export const updateItinerary = async (id, data) => {
  const response = await axios.patch(`${API_URL}itinerary/${id}`, data);
  return response;
};

// Delete an itinerary by ID
export const deleteItinerary = async (id) => {
  const response = await axios.delete(`${API_URL}itinerary/${id}`);
  return response;
};

// ✅ This function is used to search and filter itineraries
export const searchAndFilterItineraries = async (query) => {
  const response = await axios.get(`${API_URL}itinerary-search`, {
    params: query,
  });
  return response.data;
};

// ✅ This function is used to search and filter activities
export const searchAndFilterActivities = async (query) => {
  const response = await axios.get(`${API_URL}activity-search`, {
    params: query,
  });
  return response.data;
};

// ✅ This function is used to search and filter complaints
export const searchAndFilterComplaints = async (query, issuerId) => {
  const response = await axios.get(`${API_URL}complaints/${issuerId}`, {
    params: query,
  });
  return response.data;
};

// ✅ This function is used to search and filter complaints for the Admin
export const searchAndFilterComplaintsAdmin = async (query) => {
  const response = await axios.get(`${API_URL}complaints`, {
    params: query,
  });
  return response.data;
};

// ✅ This function is used to create a Complaint
export const createComplaint = async (data) => {
  const response = await axios.post(`${API_URL}complaint`, data);
  return response;
};

// ✅ This function is used to approve complaints
export const approveComplaint = async (data, complaintId) => {
  const response = await axios.put(`${API_URL}complaint/${complaintId}`, data);
  return response.data;
};

// ✅ This function is used to search and filter products
export const searchAndFilterProducts = async (query) => {
  const response = await axios.get(`${API_URL}product-search`, {
    params: query,
  });
  return response.data;
};
// ✅ This function is used to search and filter monuments
export const searchAndFilterMonuments = async (query) => {
  const response = await axios.get(`${API_URL}monument-search`, {
    params: query,
  });
  return response.data;
};

// ✅ This function is used to fetch all preference tags
export const fetchAllPreferenceTags = async () => {
  const response = await axios.get(`${API_URL}preferenceTags`);
  return response.data;
};

// ✅ This function is used to fetch all activity categories
export const fetchAllActivityCategories = async () => {
  const response = await axios.get(`${API_URL}activityCategory`);
  return response.data;
};

// ✅ This function is used to fetch all monument tags
export const fetchAllMonumentTags = async () => {
  const response = await axios.get(`${API_URL}monumentTags`);
  return response.data;
};

// This function is used to fetch all pending users
export const fetchAllPendingUsers = async (status) => {
  const response = await axios.get(`${API_URL}/users/status/pending/`);
  return response.data;
};

// This function is used to update all users status
export const updateUserStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/users/status/${id}`, { status: status });
  return response.data;
};

// ✅ This function is used to fetch Tourist's profile
export const fetchTouristProfile = async (id) => {
  const response = await axios.get(`${API_URL}tourist/${id}`);
  return response.data;
};

// ✅ This function is used to update Tourist's profile
export const updateTouristProfile = async (id, data) => {
  const response = await axios.patch(`${API_URL}tourist/${id}`, data);
  return response;
};

// ✅ This function is used to fetch Tourist's profile
export const fetchAdminProfile = async (id) => {
  const response = await axios.get(`${API_URL}admin/${id}`);
  return response.data;
};

// ✅ This function is used to update Tourist's profile
export const updateAdminProfile = async (id, data) => {
  const response = await axios.patch(`${API_URL}admin/${id}`, data);
  return response;
};

// ✅ This function is used to fetch TourismGovernor's profile
export const fetchTourismGovernorProfile = async (id) => {
  const response = await axios.get(`${API_URL}tourismGovernor/${id}`);
  return response.data;
};

// ✅ This function is used to update TourismGovernor's profile
export const updateTourismGovernorProfile = async (id, data) => {
  const response = await axios.patch(`${API_URL}tourismGovernor/${id}`, data);
  return response;
};

// ✅ This function is used to fetch Seller's profile
export const fetchSellerProfile = async (id) => {
  const response = await axios.get(`${API_URL}seller/${id}`);
  return response.data;
};

// ✅ This function is used to update Seller's profile
export const updateSellerProfile = async (id, data) => {
  const response = await axios.patch(`${API_URL}seller/${id}`, data);
  return response;
};

// ✅ This function is used to fetch Advertiser's profile
export const fetchAdvertiserProfile = async (id) => {
  const response = await axios.get(`${API_URL}advertiser/${id}`);
  return response.data;
};

// ✅ This function is used to update Advertiser's profile
export const updateAdvertiserProfile = async (id, data) => {
  const response = await axios.patch(`${API_URL}advertiser/${id}`, data);
  return response;
};

// This function is used to upload identification document for an Advertiser
export const uploadAdvertiserIdentification = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}advertiser/identification/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to upload Taxation document for an Advertiser
export const uploadAdvertiserTaxation = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}advertiser/taxation/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to upload Logo document for an Advertiser
export const uploadAdvertiserLogo = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}advertiser/logo/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// ✅ This function is used to fetch TourGuide's profile
export const fetchTourGuideProfile = async (id) => {
  const response = await axios.get(`${API_URL}tourGuide/${id}`);
  return response.data;
};

// ✅ This function is used to update TourGuide's profile
export const updateTourGuideProfile = async (id, data) => {
  const response = await axios.patch(`${API_URL}tourGuide/${id}`, data);
  return response;
};

// This function is used to upload identification document for a TourGuide
export const uploadTourGuideIdentification = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}tourGuide/identification/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to upload certificate document for a TourGuide
export const uploadTourGuideCertificate = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}tourGuide/certificate/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to upload photo document for a TourGuide
export const uploadTourGuidePhoto = async (userId, formData) => {
  const response = await axios.post(
    `${API_URL}tourGuide/photo/upload?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// ✅ This function is used to add a new admin
export const adminPost = async (data) => {
  const response = await axios.post(`${API_URL}admin`, data);
  return response;
};

// ✅ This function is used to add a new tourism governor
export const tourismGovernorPost = async (data) => {
  const response = await axios.post(`${API_URL}tourismGovernor`, data);
  return response;
};

export const fetchMonuments = async () => {
  var response = await axios.get(`${API_URL}monuments`);
  return response.data;
};

// ✅ This function is used to fetch all activity categopries
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}categories`);
  return response.data;
};

//TODO: session id

// ✅ This function is used to create an activity
export const createActivity = async (data) => {
  const response = await axios.post(`${API_URL}activity`, data);
  return response;
};

// ✅ This function is used to delete an activity by Id
export const deleteActivity = async (activityId) => {
  try {
    const response = await axios.delete(`${API_URL}activity/${activityId}`);
    return response;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};

// ✅ This function is used to update an activity by Id
export const updateActivity = async (activityId, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}activity/${activityId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

// ✅ This function is used to update a product by Id
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}product/${productId}`,
      updatedData
    );
    return response;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const fetchActivityCategories = async () => {
  return await axios.get(`${API_URL}/categories`);
};

// ✅ This function is used to create a new activity category
export const createActivityCategory = async (categoryData) => {
  return await axios.post(`${API_URL}/activityCategory`, categoryData);
};

// ✅ This function is used to update an activity category
export const updateActivityCategory = async (categoryId, categoryData) => {
  return await axios.patch(
    `${API_URL}/activityCategory/${categoryId}`,
    categoryData
  );
};

// ✅ This function is used to delete an activity category
export const deleteActivityCategory = async (categoryId) => {
  return await axios.delete(`${API_URL}/activityCategory/${categoryId}`);
};

export const createMonument = async (data) => {
  return await axios.post(`${API_URL}monuments`, data);
};

export const fetchMonumentTags = async () => {
  return await axios.get(`${API_URL}monumentTags`);
};

export const updateMonument = async (monumentId, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}monument/${monumentId}`,
      updatedData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating monument:", error);
    throw error;
  }
};

export const deleteMonument = async (monumentID) => {
  return await axios.delete(`${API_URL}/monuments/${monumentID}`);
};

export const createMonumentTag = async (tagData) => {
  return await axios.post(`${API_URL}/monumenttags`, tagData);
};

export const updateMonumentTag = async (tagId, tagData) => {
  return await axios.put(`${API_URL}/monumenttags/${tagId}`, tagData);
};

export const deleteMonumentTag = async (tagId) => {
  return await axios.delete(`${API_URL}/monumenttags/${tagId}`);
};

export const downloadImage = async (id) => {
  return await axios.get(`${API_URL}image/${id}`, { responseType: "blob" });
};

export const downloadPdf = async (id) => {
  return await axios.get(`${API_URL}pdf/${id}`, { responseType: "blob" });
};
