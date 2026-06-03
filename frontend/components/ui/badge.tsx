import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@/utils/cn';

export const Badge: FC<ComponentPropsWithoutRef<'span'>> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
};
