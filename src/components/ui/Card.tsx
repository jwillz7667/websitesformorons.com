'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  [
    'rounded-2xl overflow-hidden',
    'transition-all duration-500 ease-out',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white/5 backdrop-blur-xl',
          'border border-white/10',
        ],
        glass: [
          'bg-white/5 backdrop-blur-2xl',
          'border border-white/10',
          'shadow-xl shadow-black/20',
        ],
        solid: [
          'bg-neutral-900',
          'border border-neutral-800',
        ],
        gradient: [
          'bg-gradient-to-br from-white/10 to-white/5',
          'border border-white/10',
        ],
        outline: [
          'bg-transparent',
          'border-2 border-white/20',
        ],
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        true: [
          'hover:border-cyan-500/50',
          'hover:shadow-glow hover:shadow-cyan-500/20',
          'hover:-translate-y-1',
        ],
        lift: [
          'hover:-translate-y-2',
          'hover:shadow-2xl hover:shadow-black/30',
        ],
        glow: [
          'hover:border-cyan-500/50',
          'hover:shadow-glow-lg hover:shadow-cyan-500/30',
        ],
        scale: [
          'hover:scale-[1.02]',
          'hover:shadow-xl',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hover, className }))}
      {...props}
    />
  )
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, gradient, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5',
        gradient && 'bg-gradient-to-r from-cyan-500/10 to-orange-500/10 -mx-6 -mt-6 px-6 pt-6 pb-4 mb-4',
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title
const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-bold text-white', className)}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description
const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-white/60', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// Card Footer
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4 mt-auto', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
