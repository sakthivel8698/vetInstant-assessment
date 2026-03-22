import axios from "axios";
import config from "../config/config";

const API = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: false,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  if (req.data instanceof FormData) {
    delete req.headers["Content-Type"];  // multipart — let browser set it
  } else {
    req.headers["Content-Type"] = "application/json";  // login, fetch etc
    req.headers["Accept"] = "application/json";
  }

  return req;
});

export default API;