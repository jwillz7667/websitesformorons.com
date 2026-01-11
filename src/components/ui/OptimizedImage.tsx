'use client';

import { useState, useCallback } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * OptimizedImage Component - UI Kit Standard
 *
 * A performance-optimized image component built on Next.js Image
 * with blur placeholder, lazy loading, and error handling.
 *
 * Features:
 * - Automatic AVIF/WebP format selection
 * - Blur placeholder during load (shimmer effect)
 * - Lazy loading with intersection observer
 * - Error state with fallback
 * - WCAG 2.1 AA compliant (requires alt text)
 * - Prevents CLS (Cumulative Layout Shift)
 */

// Shimmer SVG for blur placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a1a" offset="20%" />
      <stop stop-color="#262626" offset="50%" />
      <stop stop-color="#1a1a1a" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1a1a1a" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Default fallback image (brand colored placeholder)
const DEFAULT_FALLBACK = '/images/placeholder.svg';

export interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  /** Fallback image source on error */
  fallbackSrc?: string;
  /** Show shimmer loading effect */
  showShimmer?: boolean;
  /** Aspect ratio for container (e.g., "16/9", "1/1", "4/3") */
  aspectRatio?: string;
  /** Container className */
  containerClassName?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback on error */
  onError?: () => void;
  /** Rounded corners variant */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Object fit */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Object position */
  objectPosition?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = DEFAULT_FALLBACK,
  showShimmer = true,
  aspectRatio,
  containerClassName,
  className,
  onLoad,
  onError,
  rounded = 'none',
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  sizes,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // Round class mapping
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  // Generate blur data URL
  const blurDataURL =
    showShimmer && typeof width === 'number' && typeof height === 'number'
      ? `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
      : undefined;

  // Default sizes for responsive images
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        roundedClasses[rounded],
        containerClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading shimmer overlay */}
      {isLoading && showShimmer && (
        <div
          className={cn(
            'absolute inset-0 bg-neutral-800',
            'animate-pulse',
            roundedClasses[rounded]
          )}
          aria-hidden="true"
        />
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={defaultSizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          roundedClasses[rounded],
          className
        )}
        style={{
          objectFit,
          objectPosition,
        }}
        {...props}
      />

      {/* Error state overlay */}
      {hasError && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-neutral-800/80 text-white/60 text-sm',
            roundedClasses[rounded]
          )}
          aria-hidden="true"
        >
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
}

/**
 * ResponsiveImage - Full-width responsive image
 * Automatically calculates height from aspect ratio
 */
export interface ResponsiveImageProps
  extends Omit<OptimizedImageProps, 'width' | 'height' | 'fill'> {
  /** Aspect ratio (required for responsive sizing) */
  aspectRatio: string;
}

export function ResponsiveImage({
  aspectRatio,
  ...props
}: ResponsiveImageProps) {
  return (
    <div
      className={cn('relative w-full', props.containerClassName)}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        {...props}
        fill
        containerClassName=""
        aspectRatio={undefined}
      />
    </div>
  );
}

/**
 * Avatar - Circular profile image
 */
export interface AvatarProps
  extends Omit<OptimizedImageProps, 'rounded' | 'aspectRatio'> {
  /** Size in pixels */
  size?: number;
  /** Show online status indicator */
  showStatus?: boolean;
  /** Status type */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export function Avatar({
  size = 40,
  showStatus = false,
  status = 'offline',
  ...props
}: AvatarProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-neutral-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  return (
    <div className="relative inline-block">
      <OptimizedImage
        {...props}
        width={size}
        height={size}
        rounded="full"
        className={cn(
          'border-2 border-white/10',
          props.className
        )}
      />
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-neutral-950',
            statusColors[status],
            size < 40 ? 'h-2 w-2' : 'h-3 w-3'
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default OptimizedImage;
