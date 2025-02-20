interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function Card({ icon, title, value }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 transition transform hover:-translate-y-2 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-4 text-orange-500">{icon}</span>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
