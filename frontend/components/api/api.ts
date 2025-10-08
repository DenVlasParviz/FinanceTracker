import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/categories",
  timeout: 5000,
});

export const getCategoriesTable = async () => {
  const response = await api.get('/');
  return response.data;
}