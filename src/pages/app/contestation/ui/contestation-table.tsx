import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import type { IClientContestation } from '@/domain/entities/contestation/IContestation';

export function ContestationTable({
  data,
}: {
  data: IClientContestation[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contestações</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Cliente</TableHead>
              <TableHead>Competência</TableHead>
              <TableHead>Contestações</TableHead>
              <TableHead>Retornos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.competenceMonth ?? '—'}</TableCell>
                  <TableCell>{c.contestation ?? '—'}</TableCell>
                  <TableCell>{c.returned ?? '—'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Nenhuma contestação registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
