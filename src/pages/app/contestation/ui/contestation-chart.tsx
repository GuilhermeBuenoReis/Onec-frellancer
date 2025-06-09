import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ContestationChart({
  data,
}: {
  data: { month: string; returned: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retornos por Mês</CardTitle>
      </CardHeader>
      <CardContent style={{ height: 300 }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="returned" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm">
            Sem dados para o intervalo selecionado.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
