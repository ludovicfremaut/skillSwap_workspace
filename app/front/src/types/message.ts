export interface IMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  sending_date: Date;
  updated_at: Date;
  body: string;
}
