'use client';

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { cn, formatNumber } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  separator?: boolean;
  isActive?: boolean; // External control for when to start animation
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  separator = true,
  isActive = true, // Default true for backward compatibility
}: AnimatedCounterProps) {
  const { displayValue } = useAnimatedCounter({
    start,
    end,
    duration,
    delay,
    decimals,
    enabled: isActive, // Pass external control to hook
  });

  const formattedValue = separator
    ? formatNumber(parseFloat(displayValue))
    : displayValue;

  return (
    <span className={cn('tabular-nums counter-smooth', className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
