import * as ProgressPrimitive from '@radix-ui/react-progress';
import type * as React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number;
  progressSuccess?: boolean;
}

function Progress({
  className,
  value,
  progressSuccess = false,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full',
        progressSuccess
          ? 'bg-green-200 dark:bg-green-900'
          : 'bg-primary/20 dark:bg-primary/30',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 transition-all duration-300',
          progressSuccess ? 'bg-green-500 dark:bg-green-400' : 'bg-primary'
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
