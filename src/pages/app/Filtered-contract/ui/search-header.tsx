import { Button } from '@/components/ui/button';

export function SearchHeader({
  query,
  onBack,
}: {
  query: string;
  onBack: () => void;
}) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Button variant="ghost" onClick={onBack}>
        ← Voltar
      </Button>
      <h1 className="text-2xl font-bold">Resultados: “{query}”</h1>
    </header>
  );
}
