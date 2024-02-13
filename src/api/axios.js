import axios from "axios";

const baseURL = "http://localhost:4000/api";
// import.meta.env.VITE_BACKEND ||

const client = axios.create({
  baseURL,
  withCredentials: true,
});

export default client;
