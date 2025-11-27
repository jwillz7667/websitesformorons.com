'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border border-white/20',
        primary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
        secondary: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
        outline: 'bg-transparent text-white border border-white/30',
        gradient: [
          'bg-gradient-to-r from-cyan-500/20 to-orange-500/20',
          'text-white',
          'border border-transparent',
        ],
        glow: [
          'bg-cyan-500/20 text-cyan-400',
          'border border-cyan-500/30',
          'shadow-glow-sm shadow-cyan-500/30',
        ],
      },
      size: {
        xs: 'h-5 px-2 text-2xs rounded',
        sm: 'h-6 px-2.5 text-xs rounded-md',
        md: 'h-7 px-3 text-sm rounded-lg',
        lg: 'h-8 px-4 text-sm rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

function Badge({
  className,
  variant,
  size,
  dot,
  dotColor = 'bg-current',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            dotColor
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
