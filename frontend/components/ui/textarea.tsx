import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@/utils/cn';

export const Textarea: FC<ComponentPropsWithoutRef<'textarea'>> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'min-h-[160px] w-full rounded-[1.25rem] border border-input bg-background/70 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  );
};
