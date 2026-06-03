import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5',
        secondary: 'bg-secondary text-secondary-foreground hover:-translate-y-0.5',
        outline: 'border bg-background/80 backdrop-blur-sm hover:bg-muted',
        ghost: 'hover:bg-muted'
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export const Button: FC<ButtonProps> = ({ className, variant, size, href, children, ...props }) => {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
