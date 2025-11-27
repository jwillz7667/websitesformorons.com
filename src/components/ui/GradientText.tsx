'use client';

import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  variant?: 'default' | 'reverse' | 'orange' | 'cyan' | 'purple';
  animate?: boolean;
}

const gradientVariants = {
  default: 'from-cyan-400 via-cyan-500 to-orange-500',
  reverse: 'from-orange-500 via-cyan-500 to-cyan-400',
  orange: 'from-orange-400 via-orange-500 to-red-500',
  cyan: 'from-cyan-300 via-cyan-400 to-cyan-500',
  purple: 'from-purple-400 via-pink-500 to-red-500',
};

export function GradientText({
  children,
  className,
  as: Component = 'span',
  variant = 'default',
  animate = false,
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradientVariants[variant],
        animate && 'bg-[length:200%_auto] animate-gradient-x',
        className
      )}
    >
      {children}
    </Component>
  );
}
