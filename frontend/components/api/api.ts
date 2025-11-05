import axios from "axios";
import { Category, CategoryTarget } from "@/types/category";

const api = axios.create({
  baseURL: "http://localhost:3000/categories",
  timeout: 5000,
});


export interface CreateTargetDto {
  categoryId: string;
  targetAmount: number;
  targetType: string;
  targetDate?: string | null;
  weeklyDays?: string[];
  monthlyDays?: number[];
}


//TODO: Move dtos to other folder

export const getCategoriesTable = async () => {
  const response = await api.get("/");
  return response.data;
};
export const updateCategory = async (
  id: string,
  data: { name?: string; assigned?: number },
): Promise<{ updatedChild: Category; updatedParent?: Category | null }> => {
  const response = await api.patch(`/${id}`, data);
  return response.data;
};

export const getTargetsTable = async (): Promise<CategoryTarget[]> => {
  const response = await api.get("/targets");
  return response.data;
};

export const addCategoryTarget = async (
  data: CreateTargetDto,
): Promise<CategoryTarget> => {
  try {
    const response = await api.post<CategoryTarget>(`/target`, data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to create target";
    throw new Error(message);
  }
};
export const updateTarget = async (
  id: string,
  data: CreateTargetDto,
): Promise<CategoryTarget> => {
  try {
    const response = await api.patch<CategoryTarget>(`/target/${id}`, data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to create target";
    throw new Error(message);
  }
};

export const getBudget = async() => {
  const response = await api.get("http://localhost:3000/budget") // TODO: rewrite api call for a different tables
  return response.data;
}

export const updateBudget = async ()=>{
  const response = await api.patch('http://localhost:3000/budget')
}

// Add new category

export const createCategory = async(name: string, parentId?:string) :Promise<Category> =>{
  const response = await api.post("/", { name,parentId });
  return response.data as Category;
}

// get existing accounts
export const getAccounts = async () => {
  const res = await api.get("http://localhost:3000/accounts");
  return res.data;
};
export const createAccount = async (data: { name: string; balance?: number }) => {
  const res = await api.post("http://localhost:3000/accounts", data);
  return res.data;
};
export const updateAccount = async (id: string, data: { name?: string; balance?: number }) => {
  const res = await api.patch(`http://localhost:3000/accounts/${id}`, data);
  return res.data;
};

