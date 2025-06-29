import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
  },
});

export const registerUser = (data) => API.post("/user/register", data);
export const loginUser = (data) => API.post("/user/login", data);

export const createProduct = (data) => API.post("/product/create", data);
export const editProduct = (id, editData) =>
  API.put(`/product/update/${id}`, editData);
export const productDelete = (id) => API.delete(`/product/delete/${id}`);
export const getAllProducts = () => API.get("product/getAll");
