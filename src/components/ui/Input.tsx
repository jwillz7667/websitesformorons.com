'use client';

import { forwardRef, useState, useId, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, Eye, EyeOff, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Input Component - UI Kit Standard
 *
 * A fully accessible form input component with validation states,
 * icons, and password visibility toggle.
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - Proper label association
 * - Error/success announcements for screen readers
 * - Touch-friendly targets (min 44px height)
 * - Password visibility toggle
 * - Clear visual state indicators
 */

const inputVariants = cva(
  [
    'w-full',
    'bg-white/5 backdrop-blur-sm',
    'border border-white/10',
    'text-white placeholder:text-white/40',
    // Apple-style transitions
    'transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    // Focus states - WCAG 2.1 AA compliant
    'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white/3',
    // Text rendering
    'font-sans antialiased',
    // Prevent zoom on iOS
    'text-base sm:text-sm',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-xl',
        pill: 'rounded-full',
        underline: 'rounded-none border-x-0 border-t-0 bg-transparent px-0 focus:ring-0 focus:border-b-2',
      },
      inputSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base sm:text-sm',
        lg: 'h-12 px-5 text-base',
        xl: 'h-14 px-6 text-lg',
      },
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/50 bg-red-500/5',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/50 bg-green-500/5',
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
  /** Label text displayed above input */
  label?: string;
  /** Error message - triggers error state */
  error?: string;
  /** Success message - triggers success state */
  success?: string;
  /** Helper text shown below input */
  helperText?: string;
  /** Icon displayed on the left */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right */
  rightIcon?: React.ReactNode;
  /** Show password visibility toggle (for password inputs) */
  showPasswordToggle?: boolean;
  /** Wrapper element className */
  wrapperClassName?: string;
  /** Make the field required with visual indicator */
  required?: boolean;
  /** Show character count (requires maxLength) */
  showCharacterCount?: boolean;
  /** Description for screen readers */
  'aria-describedby'?: string;
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
      required,
      maxLength,
      showCharacterCount,
      value,
      defaultValue,
      onChange,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const successId = `${id}-success`;
    const helperId = `${id}-helper`;
    const countId = `${id}-count`;

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [charCount, setCharCount] = useState(
      String(value || defaultValue || '').length
    );

    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;
    const state = error ? 'error' : success ? 'success' : 'default';

    // Build aria-describedby string
    const describedByParts: string[] = [];
    if (ariaDescribedBy) describedByParts.push(ariaDescribedBy);
    if (error) describedByParts.push(errorId);
    if (success) describedByParts.push(successId);
    if (helperText && !error && !success) describedByParts.push(helperId);
    if (showCharacterCount && maxLength) describedByParts.push(countId);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="flex items-center gap-1 text-sm font-medium text-white/80"
          >
            {label}
            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
            {required && <span className="sr-only">(required)</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={id}
            type={actualType}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={error ? 'true' : undefined}
            aria-required={required}
            aria-describedby={
              describedByParts.length > 0 ? describedByParts.join(' ') : undefined
            }
            className={cn(
              inputVariants({ variant, inputSize, state, className }),
              leftIcon && 'pl-11',
              (rightIcon || showPasswordToggle || error || success) && 'pr-11'
            )}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Error icon */}
            {error && (
              <AlertCircle
                className="h-5 w-5 text-red-500 shrink-0"
                aria-hidden="true"
              />
            )}

            {/* Success icon */}
            {success && (
              <Check
                className="h-5 w-5 text-green-500 shrink-0"
                aria-hidden="true"
              />
            )}

            {/* Password toggle */}
            {isPassword && showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={cn(
                  'text-white/40 hover:text-white transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                  'rounded p-0.5',
                  'min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2'
                )}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            )}

            {/* Custom right icon */}
            {rightIcon && !error && !success && (
              <span className="text-white/40" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {/* Messages and character count */}
        <div className="flex items-start justify-between gap-4">
          {/* Error message */}
          {error && (
            <p
              id={errorId}
              className="text-sm text-red-500 flex items-center gap-1"
              role="alert"
              aria-live="polite"
            >
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}

          {/* Success message */}
          {success && !error && (
            <p
              id={successId}
              className="text-sm text-green-500 flex items-center gap-1"
              role="status"
              aria-live="polite"
            >
              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {success}
            </p>
          )}

          {/* Helper text */}
          {helperText && !error && !success && (
            <p
              id={helperId}
              className="text-sm text-white/50"
            >
              {helperText}
            </p>
          )}

          {/* Empty space for alignment */}
          {!error && !success && !helperText && showCharacterCount && maxLength && (
            <div />
          )}

          {/* Character count */}
          {showCharacterCount && maxLength && (
            <p
              id={countId}
              className={cn(
                'text-sm tabular-nums ml-auto shrink-0',
                charCount >= maxLength ? 'text-red-500' : 'text-white/40'
              )}
              aria-live="off"
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
