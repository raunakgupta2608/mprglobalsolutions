import axios from "axios";

const url = "https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/";
const API = axios.create({
  baseURL: url,
});

axios.defaults.headers.common["Content-Type"] = "application/json";
API.interceptors.request.use((request) => {
  const token = sessionStorage.getItem("token");
  request.headers["Content-Type"] = "application/json";
  request.headers["Authorization"] = `Bearer ${token}`;

  return request;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.reload();
    }
  }
);

export default API;
