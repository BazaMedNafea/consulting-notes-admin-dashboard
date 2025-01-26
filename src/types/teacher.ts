// src/types/teacher.ts
export interface Teacher {
  teacherId: string;
  userId: string;
  fullName: string;
  email: string;
  subjects: string[];
  approved: boolean;
  proofFile?: string;
}
