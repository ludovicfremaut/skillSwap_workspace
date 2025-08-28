import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10_000, // 10 s
  withCredentials: true, // keep cookies if backend uses them
});

export default api;
