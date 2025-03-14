interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export function Notification({
  type = 'info',
  title,
  message,
}: NotificationProps) {
  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
        ? 'bg-red-500'
        : type === 'warning'
          ? 'bg-yellow-500'
          : 'bg-blue-500';

  return (
    <div
      className={`w-full max-w-md mx-auto ${bgColor} text-white shadow-lg rounded-lg p-4 transition-all duration-300`}
    >
      <div className="mb-2">
        <h4 className="text-lg font-bold">{title}</h4>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
