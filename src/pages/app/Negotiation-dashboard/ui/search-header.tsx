import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchHeader({
  search,
  setSearch,
  onSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex border rounded overflow-hidden">
        <Input
          placeholder="Buscar empresa ou status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="ghost" onClick={onSearch}>
          <Search />
        </Button>
      </div>
    </div>
  );
}
