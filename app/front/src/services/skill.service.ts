import api from "@/api/axios";

import type { ISkill } from "@/types/skill";

export async function getAllSkills(): Promise<ISkill[]> {
  const res = await api.get("/skills");
  return res.data;
}
