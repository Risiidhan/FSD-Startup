import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Add auth headers / error normalisation here, e.g.
// apiClient.interceptors.request.use((config) => config);
// apiClient.interceptors.response.use((res) => res, (error) => Promise.reject(error));
