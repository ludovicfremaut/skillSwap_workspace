export type IServiceStatus = "en attente" | "accepté" | "terminé";

export interface IService {
  id: number;
  title: string;
  giverName: string;
  receiverName: string;
  giverId: number;
  receiverId: number;
  status: IServiceStatus;
  date: string;
}
