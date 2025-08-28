import type { IUser } from "./user";
import type { IMessage } from "./message";

export interface IConversation {
  id: number;
  lastMessage: IMessage;
  sender_id: number;
  receiver_id: number;
  body: string;
  user: IUser;
}
