export interface INotification {
  id: null;
  title: string;
  body: string;
  isRead: boolean;
  image: string | null;
  notificationType: string;
  userId: string;
  payload: JSON;
  createdAt: Date | null;
}
