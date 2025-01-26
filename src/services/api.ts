import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Accessing the environment variable
  withCredentials: true, // For sending cookies (e.g., for authentication)
});

export default api;
