// src/services/post.ts
import api from "./api";

interface CreatePostData {
  title: string;
  content: string;
  published?: boolean;
  categoryIds?: number[]; // Array of category IDs
  tagIds?: number[]; // Array of tag IDs
}

interface UpdatePostData {
  title?: string;
  content?: string;
  published?: boolean;
  categoryIds?: number[]; // Array of category IDs
  tagIds?: number[]; // Array of tag IDs
}

// Create a new post
export const createPost = async (data: CreatePostData) => {
  const response = await api.post("/post/my/create", data);
  return response.data;
};

// Update an existing post
export const updatePost = async (postId: number, data: UpdatePostData) => {
  const response = await api.put(`/post/my/${postId}`, data);
  return response.data;
};

// Delete a post
export const deletePost = async (postId: number) => {
  const response = await api.delete(`/post/my/${postId}`);
  return response.data;
};

// Get all posts for the authenticated user
export const getUserPosts = async () => {
  const response = await api.get("/post/my/get");
  return response.data;
};

// Get a post by ID
export const getPostById = async (postId: number) => {
  const response = await api.get(`/post/my/${postId}`);
  return response.data;
};
