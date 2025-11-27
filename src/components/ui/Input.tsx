'use client';

import { forwardRef, useState, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, Eye, EyeOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'w-full',
    'bg-white/5 backdrop-blur-sm',
    'border border-white/10',
    'text-white placeholder:text-white/40',
    'transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-xl',
        pill: 'rounded-full',
        underline: 'rounded-none border-x-0 border-t-0 bg-transparent px-0 focus:ring-0',
      },
      inputSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-sm',
        lg: 'h-12 px-5 text-base',
        xl: 'h-14 px-6 text-lg',
      },
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      variant,
      inputSize,
      type = 'text',
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const state = error ? 'error' : success ? 'success' : 'default';

    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-white/80"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={actualType}
            disabled={disabled}
            className={cn(
              inputVariants({ variant, inputSize, state, className }),
              leftIcon && 'pl-11',
              (rightIcon || showPasswordToggle || error || success) && 'pr-11'
            )}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {error && <AlertCircle className="h-5 w-5 text-red-500" />}
            {success && <Check className="h-5 w-5 text-green-500" />}

            {isPassword && showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/40 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}

            {rightIcon && !error && !success && (
              <span className="text-white/40">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper/Error/Success text */}
        {(error || success || helperText) && (
          <p
            className={cn(
              'text-sm',
              error && 'text-red-500',
              success && 'text-green-500',
              !error && !success && 'text-white/50'
            )}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
