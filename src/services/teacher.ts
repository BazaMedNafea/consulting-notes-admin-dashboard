// src/services/teacher.ts
import api from "./api";

// Get all teachers
export const getTeachers = async () => {
  const response = await api.get("/teacher"); // Updated to /teacher
  return response.data;
};

// Get a teacher by ID
export const getTeacherById = async (teacherId: string) => {
  const response = await api.get(`/teacher/${teacherId}`); // Updated to /teacher
  return response.data;
};

// Update teacher subjects
export const updateTeacherSubjects = async (
  teacherId: string,
  subjects: string[]
) => {
  const response = await api.put(`/teacher/${teacherId}/subjects`, {
    subjects,
  }); // Updated to /teacher
  return response.data;
};

// Add a teacher (admin only)
export const addTeacher = async (data: {
  email: string;
  password: string;
  fullName: string;
  subjects: string[];
  proofFile?: string;
}) => {
  const response = await api.post("/teacher/add", data); // Updated to /teacher
  return response.data;
};

// Update a teacher's information
export const updateTeacher = async (
  teacherId: string,
  data: {
    subjects?: string[];
    proofFile?: string;
    fullName?: string;
    email?: string;
  }
) => {
  const response = await api.put(`/teacher/${teacherId}/update`, data); // Updated to /teacher
  return response.data;
};

// Approve a teacher (admin only)

export const approveTeacher = async (teacherId: string) => {
  const response = await api.put(`/teacher/${teacherId}/approve`);
  return response.data;
};

// Delete a teacher (admin only)
export const deleteTeacher = async (teacherId: string) => {
  const response = await api.delete(`/teacher/${teacherId}`); // Updated to /teacher
  return response.data;
};
