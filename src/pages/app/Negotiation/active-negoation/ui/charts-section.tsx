import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface CD {
  month: string;
  amount: number;
}

export function ChartsSection({ data }: { data: CD[] }) {
  return (
    <section className="grid md:grid-cols-2 gap-6 mb-10">
      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={v => `R$ ${v.toLocaleString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              name="Rendimento"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={v => `R$ ${v.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="amount" name="Rendimento" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
