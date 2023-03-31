export interface INotification {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  image: string | null;
  notificationType: string;
  userId: string;
  payload: JSON;
  createdAt: Date | null;
}
