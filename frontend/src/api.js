import axios from "axios";

// Cấu hình axios (API client)
const api = axios.create({
  baseURL: "http://localhost:5000", // URL backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
