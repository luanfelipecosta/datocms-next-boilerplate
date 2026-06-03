import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@/utils/cn';

type CardProps = ComponentPropsWithoutRef<'div'>;

export const Card: FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-[1.5rem] border border-border/70 bg-card/90 p-6 shadow-glow backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader: FC<CardProps> = ({ className, ...props }) => <div className={cn('space-y-2', className)} {...props} />;

export const CardTitle: FC<ComponentPropsWithoutRef<'h3'>> = ({ className, ...props }) => (
  <h3 className={cn('text-xl font-semibold tracking-tight', className)} {...props} />
);

export const CardDescription: FC<ComponentPropsWithoutRef<'p'>> = ({ className, ...props }) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
);

export const CardContent: FC<CardProps> = ({ className, ...props }) => <div className={cn('pt-4', className)} {...props} />;
