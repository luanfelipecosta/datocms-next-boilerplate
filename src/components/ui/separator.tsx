import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@/utils/cn';

export const Separator: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...props }) => (
  <div className={cn('h-px w-full bg-border/70', className)} {...props} />
);
