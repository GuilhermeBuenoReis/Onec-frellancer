import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

type Data = { name: string; value: number };
interface Props {
  data: Data[];
  colors: string[];
}

export function ClientPieChart({ data, colors }: Props) {
  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>Valor Pago vs Não Pago</CardTitle>
      </CardHeader>
      <CardContent className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={4}
              label={entry => `R$ ${entry.value.toLocaleString()}`}
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={colors[idx % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `R$ ${value.toLocaleString()}`}
            />
            <Legend verticalAlign="bottom" height={24} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
