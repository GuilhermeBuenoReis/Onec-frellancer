interface CardProps {
  title: string;
  value: string | number;
}

export function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 transition transform hover:-translate-y-2 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
