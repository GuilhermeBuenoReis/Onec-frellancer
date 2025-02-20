import { create } from 'zustand';

export interface NotificationData {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  date: Date;
}

interface NotificationStore {
  notifications: NotificationData[];
  addNotification: (notification: NotificationData) => void;
  removeNotification: (id: number) => void;
}

export const useNotificationStore = create<NotificationStore>(set => ({
  // Inicialmente, pode estar vazio ou conter notificações carregadas do backend
  notifications: [],
  addNotification: notification =>
    set(state => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: id =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),
}));
