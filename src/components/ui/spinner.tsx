import { Loader2, LucideProps } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface SpinnerProps extends LucideProps {}

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <Loader2
      className={cn('h-4 w-4 animate-spin', className)}
      {...props}
    />
  );
};
