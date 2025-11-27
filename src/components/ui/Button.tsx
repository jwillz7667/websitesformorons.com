'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold whitespace-nowrap',
    'rounded-full',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-cyan-400 to-cyan-500',
          'text-black font-bold',
          'shadow-lg shadow-cyan-500/25',
          'hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105',
          'hover:from-cyan-300 hover:to-cyan-400',
        ],
        secondary: [
          'bg-white/10 backdrop-blur-sm',
          'border border-white/20',
          'text-white',
          'hover:bg-white/20 hover:border-white/30',
        ],
        ghost: [
          'text-white/80',
          'hover:bg-white/10 hover:text-white',
        ],
        outline: [
          'border-2 border-cyan-500',
          'text-cyan-500',
          'hover:bg-cyan-500 hover:text-black',
        ],
        danger: [
          'bg-gradient-to-r from-red-500 to-red-600',
          'text-white font-bold',
          'shadow-lg shadow-red-500/25',
          'hover:shadow-xl hover:shadow-red-500/40 hover:scale-105',
        ],
        gradient: [
          'bg-gradient-to-r from-cyan-500 via-cyan-400 to-orange-500',
          'text-black font-bold',
          'shadow-lg shadow-cyan-500/25',
          'hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105',
          'bg-[length:200%_auto]',
          'hover:bg-right-bottom',
        ],
        link: [
          'text-cyan-500 underline-offset-4',
          'hover:underline hover:text-cyan-400',
          'p-0 h-auto',
        ],
      },
      size: {
        xs: 'h-8 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
