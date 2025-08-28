import api from "@/api/axios";

import type { IMessage } from "@/types/message";
import type { IConversation } from "@/types/conversation";

export async function getLatestMessagesForUser(
  id: string,
): Promise<IConversation[]> {
  const res = await api.get(`/messages/last-conversations/${id}`);
  return res.data;
}

export async function getConversation(userId: string, contactId: string): Promise<IMessage[]> {
  const res = await api.get(`/messages/${userId}/${contactId}`);
  return res.data;
}

export async function createMessage(data: Omit<IMessage, "id" | "sending_date" | "updated_at">, contactId: string
): Promise<IMessage> {
  const res = await api.post(`/messages/${contactId}`, data);
  return res.data;
}
