// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  skills: string[];
  availability: string;
  bio: string;
}
