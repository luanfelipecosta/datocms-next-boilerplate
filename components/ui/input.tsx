import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@/utils/cn';

export const Input: FC<ComponentPropsWithoutRef<'input'>> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  );
};
