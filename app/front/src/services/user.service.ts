import api from "@/api/axios";

import type { IUser } from "@/types/user";

export async function getUserById(id: string): Promise<IUser> {
  const res = await api.get(`/users/${id}`);
  return res.data.data;
}

export async function getLastUsers(): Promise<IUser[]> {
  const res = await api.get("/users/latest");
  return res.data.data;
}

export async function getAllUsers(): Promise<IUser[]> {
  const res = await api.get("/users");
  return res.data.data;
}

export async function getRandomUsers(): Promise<IUser[]> {
  const res = await api.get("/users/random");
  return res.data.data;
}

export async function getCurrentUser(): Promise<IUser> {
  const res = await api.get("/users/me", {
    withCredentials: true,
  });
  return res.data;
}

export async function updateUser(id: number, data: Partial<IUser>): Promise<IUser> {
  const res = await api.put(`/users/${id}`, data, {
    withCredentials: true,
  });
  return res.data.data;
}
