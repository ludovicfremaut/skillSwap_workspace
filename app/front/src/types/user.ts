export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profile_picture: string;
  skills: { name: string; id: number }[];
  availability: string;
  description: string;
  zipcode: string;
  city: string;
  sender_id: number;
  receiver_id: number;
}
