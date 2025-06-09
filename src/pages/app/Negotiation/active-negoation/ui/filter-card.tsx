import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  filterClient: string;
  onChangeClient: (v: string) => void;
  filterDate: string;
  onChangeDate: (v: string) => void;
  onExport: () => void;
}

export function FilterCard({
  filterClient,
  onChangeClient,
  filterDate,
  onChangeDate,
  onExport,
}: Props) {
  return (
    <Card className="shadow-lg mb-6">
      <CardHeader>
        <CardTitle>Filtrar Contratos</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div>
          <label>Cliente</label>
          <Input
            type="text"
            value={filterClient}
            onChange={e => onChangeClient(e.target.value)}
          />
        </div>
        <div>
          <label>Data Início</label>
          <Input
            type="date"
            value={filterDate}
            onChange={e => onChangeDate(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={onExport}>Transformar para Excel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
