import axios from "axios";

const API_URL = "http://localhost:8000/api/";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL, // Your API base URL
  withCredentials: true, // To send cookies with requests (if using cookies for auth)
});

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    // Handle 401 Unauthorized errors globally
    if (error.response && error.response.status === 401) {
      // save the current location
      const redirect = window.location.pathname;
      window.location.href = `/login?redirect=${redirect}`;
    }
    return Promise.reject(error); // Reject other errors as normal
  }
);

export default apiClient;
