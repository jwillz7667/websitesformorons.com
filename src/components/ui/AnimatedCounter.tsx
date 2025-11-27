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
}: AnimatedCounterProps) {
  const { displayValue, ref } = useAnimatedCounter({
    start,
    end,
    duration,
    delay,
    decimals,
    triggerOnce: true,
    threshold: 0.5,
  });

  const formattedValue = separator
    ? formatNumber(parseFloat(displayValue))
    : displayValue;

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
