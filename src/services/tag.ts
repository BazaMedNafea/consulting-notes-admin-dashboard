// src/services/tag.ts
import api from "./api";

interface CreateTagData {
  name: string;
}

interface UpdateTagData {
  name?: string;
}

export const getTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};

export const getTagById = async (tagId: number) => {
  const response = await api.get(`/tags/${tagId}`);
  return response.data;
};

export const createTag = async (data: CreateTagData) => {
  const response = await api.post("/tags/my/create", data);
  return response.data;
};

export const updateTag = async (tagId: number, data: UpdateTagData) => {
  const response = await api.put(`/tags/my/${tagId}`, data);
  return response.data;
};

export const deleteTag = async (tagId: number) => {
  const response = await api.delete(`/tags/my/${tagId}`);
  return response.data;
};
