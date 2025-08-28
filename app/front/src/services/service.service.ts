import api from "@/api/axios";
import type { IService } from "@/types/service";

export async function getMyServices(): Promise<IService[]> {
  const res = await api.get("/services/me", {
    withCredentials: true, // 🔐 envoie le cookie JWT
  });

  return res.data.data; // On ne convertit plus les statuts ici
}

export async function getRawServices(userID: number): Promise<IService[]> {
  const res = await api.get(`/users/${userID}/services-raw`);
  return res.data.data;
}

export async function updateServiceStatus(
  serviceId: string,
  newStatus: "pending" | "accepted" | "done"
) {
  const res = await api.post(
    `/services/${serviceId}/status`,
    { newStatus },
    { withCredentials: true }
  );
  return res.data;
}
