'use client';

import { forwardRef, useId } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      error,
      success,
      helperText,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;

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
          <textarea
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              'w-full min-h-[120px] px-4 py-3',
              'bg-white/5 backdrop-blur-sm',
              'border border-white/10 rounded-xl',
              'text-white placeholder:text-white/40',
              'transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'resize-y',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
              success && 'border-green-500 focus:border-green-500 focus:ring-green-500/50',
              className
            )}
            {...props}
          />

          {/* Status icon */}
          {(error || success) && (
            <div className="absolute right-4 top-4">
              {error && <AlertCircle className="h-5 w-5 text-red-500" />}
              {success && <Check className="h-5 w-5 text-green-500" />}
            </div>
          )}
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

Textarea.displayName = 'Textarea';

export { Textarea };
