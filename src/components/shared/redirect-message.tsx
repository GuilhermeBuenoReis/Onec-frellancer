import { MoveRight } from 'lucide-react';
import { LoaderSpinner } from './loader';

export function RedirectMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 gap-3">
      <MoveRight className="h-8 w-8 text-violet-500 dark:text-violet-400" />

      <h2 className="text-lg font-semibold text-foreground">
        Você está sendo redirecionado...
      </h2>

      <p className="text-sm text-muted-foreground max-w-sm">
        Aguarde só um instante enquanto te levamos ao destino correto.
      </p>

      <LoaderSpinner />
    </div>
  );
}
