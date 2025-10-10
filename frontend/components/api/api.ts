import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/categories",
  timeout: 5000,
});

export const getCategoriesTable = async () => {
  const response = await api.get("/");
  return response.data;
};
export const updateCategory = async (
  id: string,
  data: { name?: string; assigned?: number },
) => {
  const response = await api.patch(`/${id}`, data);
  return response.data;
};

export const getTargetsTable = async () => {

  const response = await api.get("/targets");

}
export const addTargetsTable = async () => {

}

