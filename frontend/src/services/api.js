import axios from "./axios";
const API_URL = "http://localhost:8000/api/";

export const flagActivity = async (id) => {
  try {
    const response = await axios.patch(
      `${API_URL}activity/${id}/toggle-appropriate`
    );
    return response.data.Appropriate;
  } catch (error) {
    console.error("Error toggling itinerary appropriate status:", error);
    throw error;
  }
};

export const flagItinerary = async (id) => {
  try {
    const response = await axios.patch(
      `${API_URL}itinerary/${id}/toggle-appropriate`
    );
    return response.data.Appropriate;
  } catch (error) {
    console.error("Error toggling itinerary appropriate status:", error);
    throw error;
  }
};

export const updateActivityStatus = async (id) => {};

export const toggleArchivedStatus = async (productId) => {
  try {
    const response = await axios.put(
      `${API_URL}product/${productId}/toggle-archived`
    );
    return response.data.archived; // Return the updated archived status
  } catch (error) {
    console.error("Error toggling archived status:", error);
    throw error;
  }
};

// ✅ This function is used to change the Password of users
export const changePassword = async (id, type, oldPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}change-password`, {
      id,
      type,
      oldPassword,
      newPassword,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change password."
    );
  }
};

// Function to request account deletion
export const requestProfileDeletion = async (id, type) => {
  try {
    let response;
    if (type == "Advertiser") {
      response = await axios.delete(
        `${API_URL}request-delete-advertiser/${id}`
      );
    } else if (type == "Tourguide") {
      response = await axios.delete(`${API_URL}request-delete-tourguide/${id}`);
    } else if (type == "Tourist") {
      response = await axios.delete(`${API_URL}request-delete-tourist/${id}`);
    } else if (type == "Seller") {
      response = await axios.delete(`${API_URL}request-delete-seller/${id}`);
    }
    return response.data; // Return the created deletion request
  } catch (error) {
    console.error("Error requesting profile deletion:", error);
    throw error;
  }
};

// ✅ This function checks the deletion request status for a user
export const checkDeletionRequestStatus = async (id, type) => {
  const response = await axios.get(`${API_URL}deletion-request-status`, {
    params: { accountId: id, accountType: type },
  });
  return response.data;
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
export const fetchProductsBySellerId = async (id, query) => {
  var products = await axios.get(`${API_URL}product-seller/${id}`, {
    params: query,
  });
  return products.data;
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
  var prodcuts = await axios.get(`${API_URL}product`);
  return prodcuts.data;
};

// ✅ This function is used to fetch an activity by ID
export const fetchActivity = async (id) => {
  const response = await axios.get(`${API_URL}activity/${id}`);
  return response.data;
};

// ✅ This function is used to fetch all Activites
export const getAllActivities = async () => {
  const response = await axios.get(`${API_URL}activity`);
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

// ✅ This function is used to create a new itinerary
export const createItinerary = async (data) => {
  const response = await axios.post(`${API_URL}itinerary`, data);
  return response;
};

// ✅ This function is used to fetch all itineraries
export const getAllItineraries = async () => {
  const response = await axios.get(`${API_URL}itinerary`);
  return response.data;
};

//✅ Get an itinerary by ID
export const getItineraryById = async (id) => {
  const response = await axios.get(`${API_URL}itinerary/${id}`);
  return response;
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

// ✅ This function is used to search and filter deletion Requests for the Admin TODO
export const searchAndFilterDeletionRequestsAdmin = async (query) => {
  const response = await axios.get(`${API_URL}deletion-requests`, {
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
  const response = await axios.post(`${API_URL}complaint`, data, {
    withCredentials: true,
  });
  return response;
};

// ✅ This function is used to approve complaints
export const approveComplaint = async (data, complaintId) => {
  const response = await axios.put(`${API_URL}complaint/${complaintId}`, data);
  return response.data;
};

// ✅ This function is used to approve deletion requests
export const approveDeletionRequest = async (deletionRequestId) => {
  try {
    const response = await axios.put(
      `${API_URL}deletion-requests/${deletionRequestId}/approve`
    );
    return response.data; // Returns the approved deletion request data
  } catch (error) {
    console.error("Error approving deletion request:", error);
    throw error;
  }
};

// ✅ This function is used to deny deletion requests
export const denyDeletionRequest = async (deletionRequestId) => {
  try {
    const response = await axios.put(
      `${API_URL}deletion-requests/${deletionRequestId}/deny`
    );
    return response.data; // Returns the denied deletion request data if necessary
  } catch (error) {
    console.error("Error denying deletion request:", error);
    throw error;
  }
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

// This function is used to fetch all users
export const fetchAllUsers = async () => {
  const response = await axios.get(`${API_URL}users`);
  return response.data;
};

// This function is used to delete a user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}users/${id}`);
  return response.data;
};

// This function is used to fetch all pending users
export const fetchAllPendingUsers = async (status) => {
  const response = await axios.get(`${API_URL}/users/status/pending/`);
  return response.data;
};

// This function is used to update all users status
export const updateUserStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/users/status/${id}`, {
    status: status,
  });
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
      `${API_URL}/activity/${activityId}`, // Ensure proper URL format
      updatedData,
      {
        headers: {
          "Content-Type": "application/json", // Add headers if necessary
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating activity:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// ✅ This function is used to get an activity by Id
export const getActivityById = async (activityId) => {
  try {
    const response = await axios.get(`${API_URL}activity/${activityId}`);
    return response;
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
};

// ✅ This function is used to create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}product`, productData);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

//✅ This function is used to fetch product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}product/${productId}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

//✅ This function is used to fetch a product sales
export const getProductSales = async (productId) => {
  try {
    const response = await axios.get(
      `${API_URL}product/${productId}/product-sales`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product sales:", error);
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
//----------------------------------------------

//activity bookings
// ✅ This function is used to get all activity bookings by tourist id
export const fetchActivityBookingsByTouristId = async (touristId) => {
  const response = await axios.get(`${API_URL}activityBookings/${touristId}`);
  return response.data;
};

//✅ This function is used to book an activity
export const bookActivity = async (
  activityId,
  touristId,
  bookingDate,
  amount
) => {
  const bookingData = {
    activityId,
    userId: touristId,
    bookingDate,
    amount,
  };
  try {
    const response = await axios.post(`${API_URL}bookActivity`, bookingData);
    return response;
  } catch (error) {
    console.error("Error booking activity:", error);
    throw error;
  }
};

// ✅ This function is used to delete an activity booking by Id
export const cancelActivityBooking = async (
  bookingId,
  userId,
  refundAmount
) => {
  try {
    const response = await axios.delete(
      `${API_URL}activityBookings/${bookingId}`,
      { data: { userId, refundAmount } }
    );
    return response;
  } catch (error) {
    console.error("Error cancelling activity booking:", error);
    throw error;
  }
};

//----------------------------------------------

//activity reviews
// ✅ This function is used to add a review to an activity
export const addReviewToActivity = async (activityId, review) => {
  const response = await axios.post(
    `${API_URL}activityReviews/${activityId}`,
    review
  );
  return response;
};
//----------------------------------------------

//itinerary bookings
// ✅ This function is used to get all itinerary bookings by tourist id
export const fetchItineraryBookingsByTouristId = async (touristId) => {
  const response = await axios.get(`${API_URL}itineraryBookings/${touristId}`);
  return response.data;
};

// ✅ This function is used to book an itinerary
export const bookItinerary = async (
  itineraryId,
  touristId,
  bookingDate,
  amount
) => {
  const bookingData = {
    itineraryId,
    userId: touristId,
    bookingDate,
    amount,
  };
  try {
    const response = await axios.post(`${API_URL}bookItinerary`, bookingData);
    return response;
  } catch (error) {
    console.error("Error booking itinerary:", error);
    throw error;
  }
};

// ✅ This function is used to cancel an itinerary booking by Id
export const cancelItineraryBooking = async (
  bookingId,
  userId,
  refundAmount
) => {
  try {
    const response = await axios.delete(
      `${API_URL}itineraryBookings/${bookingId}`,
      { data: { userId, refundAmount } }
    );
    return response;
  } catch (error) {
    console.error("Error cancelling itinerary booking:", error);
    throw error;
  }
};

//----------------------------------------------

//itinerary reviews
// ✅ This function is used to add a review to an itinerary
export const addReviewToItinerary = async (itineraryId, review) => {
  const response = await axios.post(
    `${API_URL}itineraryReviews/${itineraryId}`,
    review
  );
  return response;
};
//----------------------------------------------

// tourguide reviews
// ✅ This function is used to add a review to a tourguide
export const addReviewToTourguide = async (tourguideId, review) => {
  const response = await axios.post(
    `${API_URL}tourGuide/review/${tourguideId}`,
    review
  );
  return response;
};
//----------------------------------------------

// product reviews
// ✅ This function is used to add a review to a product
export const addReviewToProduct = async (productId, review) => {
  const response = await axios.post(
    `${API_URL}productReviews/${productId}`,
    review
  );
  return response;
};
//----------------------------------------------

// product purchasing
// ✅ This function is used to get all purchased products by tourist id
export const fetchPurchasedProductsByTouristId = async (touristId) => {
  const response = await axios.get(`${API_URL}productPurchasings/${touristId}`);
  return response.data;
};
// ✅ This function is used to add a new product purchasing
export const addProductPurchasing = async (purchasingData) => {
  const response = await axios.post(
    `${API_URL}productPurchasings`,
    purchasingData
  );
  return response;
};
// ✅ This function is used to delete a product purchasing by Id
export const deleteProductPurchasing = async (purchasingId) => {
  try {
    const response = await axios.delete(
      `${API_URL}productPurchasings/${purchasingId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting product purchasing:", error);
    throw error;
  }
};

// ✅ This function is used to update a product purchasing status by Id
export const updateProductPurchasedStatus = async (purchasingId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}productPurchasings/${purchasingId}`,
      { status }
    );
    return response;
  } catch (error) {
    console.error("Error updating product purchasing status:", error);
    throw error;
  }
};
//----------------------------------------------

// This function is used to upload a product image
export const uploadProductImage = async (productId, formData) => {
  const response = await axios.post(
    `${API_URL}product/image/upload?productId=${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

// This function is used to search for flights
export const searchFlights = async (
  origin,
  destination,
  departureDate,
  returnDate,
  passengers
) => {
  try {
    const currency = localStorage.getItem("currency") || "EGP";
    const response = await axios.post(
      `${API_URL}search-flights`,
      {
        origin,
        destination,
        departureDate,
        returnDate,
        passengers,
        currency,
      },
      {
        headers: {
          "Content-Type": "application/json", // Set content type for JSON data
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in frontend request:", error);
    throw error; // Handle or throw error to show in the UI
  }
};
//----------------------------------------------
// Function to fetch and save conversion rates in local storage
export const fetchConversionRates = async () => {
  try {
    //check if rates are already saved and not expired
    const ratesTimestamp = localStorage.getItem("ratesTimestamp");
    if (ratesTimestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - ratesTimestamp;
      const minutesDifference = timeDifference / 1000 / 60;
      if (minutesDifference < 60) {
        // console.log("Conversion rates are still valid");
        return;
      }
    }
    // console.log("Fetching conversion rates...");
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/b884e2be49d4a279fb51feab/latest/EGP`,
      {
        withCredentials: false, // Set to false to prevent CORS issues
      }
    );
    localStorage.setItem("rates", JSON.stringify(response.data));
    localStorage.setItem("ratesTimestamp", Date.now()); // Save timestamp
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
  }
};

//✅ This function is used to convert price
export const convertPrice = async (amount) => {
  const currency = localStorage.getItem("currency") || "EGP";
  const conversion_rates = JSON.parse(localStorage.getItem("rates"))[
    "conversion_rates"
  ];
  const saved_rate = conversion_rates[currency];
  if (saved_rate) {
    return `${(amount * saved_rate).toFixed(2)} ${currency}`;
  }
};

//✅ This function is used to pay cash and update loyalty points and level
export const payCashAndUpdateLoyalty = async (touristId, amount) => {
  try {
    const response = await axios.post(`${API_URL}pay-cash/${touristId}`, {
      amountPaid: amount,
    });
    return response;
  } catch (error) {
    console.error("Error paying cash and updating loyalty:", error);
    throw error;
  }
};

//✅ This function is used to redeem points to cash
export const redeemPointsToCash = async (touristId, pointsToRedeem) => {
  try {
    const response = await axios.post(`${API_URL}redeem-points/${touristId}`, {
      pointsToRedeem,
    });
    return response;
  } catch (error) {
    console.error("Error redeeming points to cash:", error);
    throw error;
  }
};

//✅ This function is used to count activity bookings
export const getActivityBookingsCount = async (activityId) => {
  try {
    // console.log("activityId", activityId);
    const response = await axios.get(
      `${API_URL}activityBookings-count/${activityId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching activity bookings count:", error);
    throw error;
  }
};

//✅ This function is used to count itinerary bookings
export const getItineraryBookingsCount = async (itineraryId) => {
  try {
    const response = await axios.get(
      `${API_URL}itineraryBookings-count/${itineraryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching itinerary bookings count:", error);
    throw error;
  }
};

//✅ This function is used to register a new tourist
export const registerTourist = async (touristData) => {
  try {
    const response = await axios.post(`${API_URL}tourist`, touristData);
    return response;
  } catch (error) {
    console.error("Error registering tourist:", error);
    throw error;
  }
};

//✅ This function is used to register a new seller
export const registerSeller = async (sellerData) => {
  try {
    const response = await axios.post(`${API_URL}seller`, sellerData);
    return response;
  } catch (error) {
    console.error("Error registering seller:", error);
    throw error;
  }
};

//✅ This function is used to register a new advertiser
export const registerAdvertiser = async (advertiserData) => {
  try {
    const response = await axios.post(`${API_URL}advertiser`, advertiserData);
    return response;
  } catch (error) {
    console.error("Error registering advertiser:", error);
    throw error;
  }
};

//✅ This function is used to register a new tour guide
export const registerTourGuide = async (tourGuideData) => {
  try {
    const response = await axios.post(`${API_URL}tourGuide`, tourGuideData);
    return response;
  } catch (error) {
    console.error("Error registering tour guide:", error);
    throw error;
  }
};

//✅ This function is used to login a user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

//✅ This function is used to get user's role
export const getUserRole = async () => {
  try {
    const response = await axios.get(`${API_URL}userRole`);
    //console.log(response.data.role);
    return response.data.role;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};

//✅ This function is log out a user
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}logout`);
    window.location.href = `/login`;
  } catch (error) {
    console.log(error);
  }
};
