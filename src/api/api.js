import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
  },
});

export const registerUser = (data) => API.post("/user/register", data);
