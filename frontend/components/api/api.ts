import axios from "axios";
import { CategoryTarget } from "@/types/category";

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

export const addCategoryTarget = async (data: CreateTargetDto): Promise<CategoryTarget> => {
  try {
    const response = await api.post<CategoryTarget>(
      `/target`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Failed to create target';
    throw new Error(message);
  }
};
export const updateTarget = async ( id: string, data: CreateTargetDto,  ): Promise<CategoryTarget> => {
  try {
    const response = await api.patch<CategoryTarget>(
      `/target/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Failed to create target';
    throw new Error(message);
  }
}

