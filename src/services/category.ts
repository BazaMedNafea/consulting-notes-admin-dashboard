// src/services/category.ts
import api from "./api";

interface CreateCategoryData {
  name: string;
}

interface UpdateCategoryData {
  name?: string;
}

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getCategoryById = async (categoryId: number) => {
  const response = await api.get(`/categories/${categoryId}`);
  return response.data;
};

export const createCategory = async (data: CreateCategoryData) => {
  const response = await api.post("/categories/my/create", data);
  return response.data;
};

export const updateCategory = async (
  categoryId: number,
  data: UpdateCategoryData
) => {
  const response = await api.put(`/categories/my/${categoryId}`, data);
  return response.data;
};

export const deleteCategory = async (categoryId: number) => {
  const response = await api.delete(`/categories/my/${categoryId}`);
  return response.data;
};
