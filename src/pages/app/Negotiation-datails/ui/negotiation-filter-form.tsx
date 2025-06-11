import { Input } from '@/components/ui/input';

export function NegotiationFilterForm({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (q: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Pesquisar cliente ou status..."
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
    </div>
  );
}
