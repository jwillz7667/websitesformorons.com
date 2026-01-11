'use client';

import { forwardRef, useId } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Button Component - UI Kit Standard
 *
 * A fully accessible button component with multiple variants,
 * sizes, and states following 2026 UI kit standards.
 *
 * Features:
 * - WCAG 2.1 AA compliant focus states
 * - Loading state with accessible announcements
 * - Icon support (left/right)
 * - Polymorphic via asChild prop
 * - Touch-friendly tap targets (min 44px)
 */

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'font-semibold whitespace-nowrap select-none',
    'rounded-full',
    // Transitions - Apple-style easing
    'transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    // Focus states - WCAG 2.1 AA compliant
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-cyan-500',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
    // Disabled states
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    // Active state
    'active:scale-[0.98]',
    // Touch target minimum (accessibility)
    'min-h-[44px] min-w-[44px]',
    // Text rendering
    'text-rendering-optimizeLegibility',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-cyan-400 to-cyan-500',
          'text-black font-bold',
          'shadow-lg shadow-cyan-500/25',
          'hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02]',
          'hover:from-cyan-300 hover:to-cyan-400',
          'active:shadow-md',
        ],
        secondary: [
          'bg-white/10 backdrop-blur-sm',
          'border border-white/20',
          'text-white',
          'hover:bg-white/20 hover:border-white/30',
          'active:bg-white/15',
        ],
        ghost: [
          'text-white/80',
          'hover:bg-white/10 hover:text-white',
          'active:bg-white/15',
        ],
        outline: [
          'border-2 border-cyan-500',
          'text-cyan-500',
          'bg-transparent',
          'hover:bg-cyan-500 hover:text-black',
          'active:bg-cyan-600',
        ],
        danger: [
          'bg-gradient-to-r from-red-500 to-red-600',
          'text-white font-bold',
          'shadow-lg shadow-red-500/25',
          'hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02]',
          'hover:from-red-400 hover:to-red-500',
          'active:shadow-md',
        ],
        success: [
          'bg-gradient-to-r from-green-500 to-green-600',
          'text-white font-bold',
          'shadow-lg shadow-green-500/25',
          'hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02]',
          'active:shadow-md',
        ],
        gradient: [
          'bg-gradient-to-r from-cyan-500 via-cyan-400 to-orange-500',
          'text-black font-bold',
          'shadow-lg shadow-cyan-500/25',
          'hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02]',
          'bg-[length:200%_auto]',
          'hover:bg-right-bottom',
          'active:shadow-md',
        ],
        link: [
          'text-cyan-500 underline-offset-4',
          'hover:underline hover:text-cyan-400',
          'p-0 h-auto min-h-0 min-w-0',
          'active:text-cyan-600',
        ],
        white: [
          'bg-white',
          'text-neutral-900 font-bold',
          'shadow-lg shadow-white/25',
          'hover:bg-neutral-100 hover:shadow-xl hover:shadow-white/40 hover:scale-[1.02]',
          'active:bg-neutral-200',
        ],
      },
      size: {
        xs: 'h-8 px-3 text-xs min-h-[32px]',
        sm: 'h-9 px-4 text-sm min-h-[36px]',
        md: 'h-11 px-6 text-sm min-h-[44px]',
        lg: 'h-12 px-8 text-base min-h-[48px]',
        xl: 'h-14 px-10 text-lg min-h-[56px]',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0 min-h-[32px] min-w-[32px]',
        'icon-lg': 'h-12 w-12 p-0 min-h-[48px] min-w-[48px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows loading spinner and disables button */
  isLoading?: boolean;
  /** Text to show while loading (for screen readers) */
  loadingText?: string;
  /** Icon to show on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to show on the right side */
  rightIcon?: React.ReactNode;
  /** Render as child component (for Links, etc.) */
  asChild?: boolean;
  /** Accessible label for icon-only buttons */
  'aria-label'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      loadingText = 'Loading...',
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      disabled,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const loadingId = useId();

    // Determine if this is an icon-only button
    const isIconOnly = size === 'icon' || size === 'icon-sm' || size === 'icon-lg';

    // Accessibility: Warn if icon-only button lacks aria-label
    if (process.env.NODE_ENV === 'development' && isIconOnly && !ariaLabel && !props['aria-labelledby']) {
      console.warn('Button: Icon-only buttons should have an aria-label for accessibility');
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        type={type}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        aria-describedby={isLoading ? loadingId : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            {!isIconOnly && (
              <span>{loadingText}</span>
            )}
            {/* Screen reader announcement */}
            <span
              id={loadingId}
              className="sr-only"
              role="status"
              aria-live="polite"
            >
              {loadingText}
            </span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                className="shrink-0 -ml-1"
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span
                className="shrink-0 -mr-1"
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
