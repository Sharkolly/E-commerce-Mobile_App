import axios from "axios";
import { storage } from "./asyncstorage";

const API = axios.create({
  baseURL: "http://10.219.167.70:5001/api/user",
  withCredentials: true,
});

API.interceptors.request.use(
  async (config) => {
    const token = await storage.get("token");
    if (token && config.headers) config.headers.Authorization = token;
    return config;
  },
  (err) => Promise.reject(err)
);

export default API;
