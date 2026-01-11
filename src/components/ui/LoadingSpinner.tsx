'use client';

import { cn } from '@/lib/utils';

/**
 * Loading Components - UI Kit Standard
 *
 * A collection of loading state components with accessibility support.
 *
 * Features:
 * - WCAG 2.1 AA compliant with ARIA live regions
 * - Multiple size variants
 * - Brand-colored animations
 * - Reduced motion support
 */

interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional className */
  className?: string;
  /** Visible loading label */
  label?: string;
  /** Screen reader text (defaults to label or 'Loading') */
  srText?: string;
  /** Color variant */
  color?: 'cyan' | 'white' | 'orange';
}

const sizeClasses = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
  xl: 'w-16 h-16 border-4',
};

const colorClasses = {
  cyan: 'border-white/20 border-t-cyan-400',
  white: 'border-white/10 border-t-white',
  orange: 'border-white/20 border-t-orange-500',
};

export function LoadingSpinner({
  size = 'md',
  className,
  label,
  srText,
  color = 'cyan',
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-3', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          'rounded-full animate-spin',
          'motion-reduce:animate-[spin_2s_linear_infinite]',
          sizeClasses[size],
          colorClasses[color]
        )}
        aria-hidden="true"
      />
      {label && (
        <span className="text-white/60 text-sm font-medium">{label}</span>
      )}
      <span className="sr-only">{srText || label || 'Loading...'}</span>
    </div>
  );
}

/**
 * LoadingDots - Three bouncing dots animation
 */
interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'white' | 'orange';
}

export function LoadingDots({
  className,
  size = 'md',
  color = 'cyan',
}: LoadingDotsProps) {
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const dotColors = {
    cyan: 'bg-cyan-400',
    white: 'bg-white',
    orange: 'bg-orange-500',
  };

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            'motion-reduce:animate-none',
            dotSizes[size],
            dotColors[color]
          )}
          style={{
            animationDelay: `${i * 150}ms`,
            animationDuration: '600ms',
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * LoadingOverlay - Full page loading overlay
 */
interface LoadingOverlayProps {
  /** Loading message */
  message?: string;
  /** Show overlay with blur */
  blur?: boolean;
  /** Allow closing overlay */
  closable?: boolean;
  /** Close callback */
  onClose?: () => void;
}

export function LoadingOverlay({
  message = 'Loading...',
  blur = true,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-neutral-950/90',
        blur && 'backdrop-blur-sm'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center gap-4 p-8">
        {/* Branded spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-white/10" />
          <div
            className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"
            aria-hidden="true"
          />
        </div>
        <p className="text-white/80 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

/**
 * LoadingBar - Linear progress indicator
 */
interface LoadingBarProps {
  /** Progress percentage (0-100), undefined for indeterminate */
  progress?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show percentage text */
  showProgress?: boolean;
  className?: string;
}

export function LoadingBar({
  progress,
  size = 'md',
  showProgress = false,
  className,
}: LoadingBarProps) {
  const isIndeterminate = progress === undefined;

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full bg-white/10 rounded-full overflow-hidden',
          heights[size]
        )}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading progress"
      >
        <div
          className={cn(
            'h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full',
            isIndeterminate && 'animate-[indeterminate_1.5s_ease-in-out_infinite]'
          )}
          style={
            isIndeterminate
              ? { width: '50%' }
              : { width: `${Math.min(100, Math.max(0, progress))}%` }
          }
        />
      </div>
      {showProgress && !isIndeterminate && (
        <p className="text-white/60 text-sm mt-1 text-right tabular-nums">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
}

/**
 * Skeleton - Placeholder loading component
 */
interface SkeletonProps {
  className?: string;
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Width (number in px or string like '100%') */
  width?: string | number;
  /** Height (number in px or string like '100%') */
  height?: string | number;
  /** Animation style */
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-[shimmer_2s_infinite]',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-white/10',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonText - Multiple lines of text skeleton
 */
interface SkeletonTextProps {
  /** Number of lines */
  lines?: number;
  /** Width of last line (percentage) */
  lastLineWidth?: number;
  className?: string;
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = 60,
  className,
}: SkeletonTextProps) {
  return (
    <div className={cn('space-y-3', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className="h-4"
          width={i === lines - 1 ? `${lastLineWidth}%` : '100%'}
        />
      ))}
    </div>
  );
}

/**
 * CardSkeleton - Card loading placeholder
 */
interface CardSkeletonProps {
  /** Show avatar/icon */
  showAvatar?: boolean;
  /** Show image */
  showImage?: boolean;
  /** Number of text lines */
  lines?: number;
  className?: string;
}

export function CardSkeleton({
  showAvatar = true,
  showImage = false,
  lines = 3,
  className,
}: CardSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {showImage && (
        <Skeleton variant="rectangular" className="w-full h-48" />
      )}
      <div className="p-6 space-y-4">
        {showAvatar && (
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" className="h-5 w-1/2" />
              <Skeleton variant="text" className="h-3 w-1/3" />
            </div>
          </div>
        )}
        <SkeletonText lines={lines} lastLineWidth={75} />
      </div>
    </div>
  );
}

/**
 * PageSkeleton - Full page loading skeleton
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 p-4 sm:p-8" aria-hidden="true">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Skeleton variant="rounded" width={150} height={40} />
          <div className="flex gap-4">
            <Skeleton variant="rounded" width={80} height={40} />
            <Skeleton variant="rounded" width={80} height={40} />
            <Skeleton variant="rounded" width={80} height={40} />
          </div>
        </div>

        {/* Hero skeleton */}
        <div className="text-center mb-16">
          <Skeleton variant="text" className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton variant="text" className="h-6 w-2/3 mx-auto mb-6" />
          <div className="flex justify-center gap-4">
            <Skeleton variant="rounded" width={140} height={48} />
            <Skeleton variant="rounded" width={140} height={48} />
          </div>
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} showImage />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * InlineLoader - Inline loading indicator for buttons/text
 */
interface InlineLoaderProps {
  className?: string;
}

export function InlineLoader({ className }: InlineLoaderProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1', className)}
      role="status"
      aria-label="Loading"
    >
      <LoadingDots size="sm" />
    </span>
  );
}

// Add CSS for indeterminate loading bar animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(200%);
      }
    }
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;
  if (!document.querySelector('style[data-loading-animations]')) {
    style.setAttribute('data-loading-animations', 'true');
    document.head.appendChild(style);
  }
}
