import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Props {
  searchName: string;
  onChangeName: (v: string) => void;
  searchCnpj: string;
  onChangeCnpj: (v: string) => void;
  filterStatus: 'Todos' | 'PAGO' | 'NÃO PAGO';
  onChangeStatus: React.Dispatch<
    React.SetStateAction<'Todos' | 'PAGO' | 'NÃO PAGO'>
  >;
  dateFrom: string;
  onChangeFrom: (v: string) => void;
  dateTo: string;
  onChangeTo: (v: string) => void;
  onExport: () => void;
  onSearch: () => void;
}

export function ClientFilterCard({
  searchName,
  onChangeName,
  searchCnpj,
  onChangeCnpj,
  filterStatus,
  onChangeStatus,
  dateFrom,
  onChangeFrom,
  dateTo,
  onChangeTo,
  onExport,
  onSearch,
}: Props) {
  return (
    <Card className="mb-6 shadow-md">
      <CardHeader>
        <CardTitle>Filtros de Recebimentos</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2">
        <Input
          placeholder="Cliente"
          value={searchName}
          onChange={e => onChangeName(e.target.value)}
        />

        <Input
          placeholder="CNPJ"
          value={searchCnpj}
          onChange={e => onChangeCnpj(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={e =>
            onChangeStatus(e.target.value as 'Todos' | 'PAGO' | 'NÃO PAGO')
          }
          className="border rounded px-2"
        >
          <option value="Todos">Todos</option>
          <option value="PAGO">Pago</option>
          <option value="NÃO PAGO">Não Pago</option>
        </select>

        <Input
          type="date"
          value={dateFrom}
          onChange={e => onChangeFrom(e.target.value)}
        />

        <Input
          type="date"
          value={dateTo}
          onChange={e => onChangeTo(e.target.value)}
        />

        <Button
          variant="outline"
          onClick={onSearch}
          className="flex items-center"
        >
          <Search className="mr-1 w-4 h-4" />
          Buscar
        </Button>

        <Button variant="outline" onClick={onExport}>
          Exportar Excel
        </Button>
      </CardContent>
    </Card>
  );
}
