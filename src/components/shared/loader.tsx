import { Loader2 } from 'lucide-react';

export function LoaderSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2
        className="h-4 w-4 animate-spin text-violet-900 dark:text-violet-800"
        strokeWidth={2.5}
      />
    </div>
  );
}
