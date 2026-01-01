import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

//request Interceptor
axios.interceptors.request.use(
  (config) => {
    //jwt code goes here keeping it blank for now
    return config;
  },
  (error) => Promise.reject(error)
);

//response Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const axiosGet = (url, params = {}) => api.get(url, params);

export const axiosPost = (url, data = {}, config = {}) =>
  api.post(url, data, config);

export const axiosPut = (url, data = {}, config = {}) =>
  api.put(url, data, config);

export const axiosDelete = (url, params = {}) => api.delete(url, params);

export default api;
