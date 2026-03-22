import axios from "axios";

const API = axios.create({
  baseURL: "/api/v2",
  // headers: {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  // },
  withCredentials: false,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  // delete req.headers["Origin"];     
  // delete req.headers["origin"];
  // return req;
  if (req.data instanceof FormData) {
    delete req.headers["Content-Type"];  // multipart — let browser set it
  } else {
    req.headers["Content-Type"] = "application/json";  // login, fetch etc
    req.headers["Accept"] = "application/json";
  }

  return req;
});

export default API;