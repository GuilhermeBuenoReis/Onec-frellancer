import { useNotificationStore } from '@/store/notification-store';
import { Notification } from '@/components/notification';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';

export function NotificationsPage() {
  const notifications = useNotificationStore(state => state.notifications);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Notificação" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="p-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Notificações
          </h2>
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <Notification
                  key={notif.id}
                  type={notif.type}
                  title={notif.title}
                  message={notif.message}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center">
                Nenhuma notificação para exibir.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
