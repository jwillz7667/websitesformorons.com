'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
  decimals?: number;
  enabled?: boolean; // External control - when true, animation starts
}

interface AnimatedCounterResult {
  value: number;
  displayValue: string;
  isAnimating: boolean;
  isComplete: boolean;
  reset: () => void;
}

// Smoother easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 4), // Quartic ease-out for smoother deceleration
  easeIn: (t: number) => Math.pow(t, 4),
  easeInOut: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
};

export function useAnimatedCounter(
  options: UseAnimatedCounterOptions
): AnimatedCounterResult {
  const {
    start = 0,
    end,
    duration = 2000,
    delay = 0,
    easing = 'easeOut',
    decimals = 0,
    enabled = false, // Default to false - requires explicit activation
  } = options;

  const [value, setValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(start);
  const hasStartedRef = useRef(false);

  const animate = useCallback(() => {
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion()) {
      setValue(end);
      setIsComplete(true);
      return;
    }

    const easingFn = easingFunctions[easing];

    // Minimum change threshold to reduce state updates (improves smoothness)
    const minChange = decimals > 0 ? 0.1 : 1;

    const step = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current - delay;

      if (elapsed < 0) {
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const currentValue = start + (end - start) * easedProgress;

      // Only update state if value has changed enough (reduces jitter)
      const diff = Math.abs(currentValue - lastUpdateRef.current);
      if (diff >= minChange || progress >= 1) {
        lastUpdateRef.current = currentValue;
        setValue(currentValue);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
        lastUpdateRef.current = end;
        setIsAnimating(false);
        setIsComplete(true);
      }
    };

    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(step);
  }, [start, end, duration, delay, easing, decimals]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = null;
    lastUpdateRef.current = start;
    hasStartedRef.current = false;
    setValue(start);
    setIsAnimating(false);
    setIsComplete(false);
  }, [start]);

  // Start animation when enabled becomes true
  useEffect(() => {
    if (enabled && !hasStartedRef.current && !isAnimating && !isComplete) {
      hasStartedRef.current = true;
      animate();
    }
  }, [enabled, isAnimating, isComplete, animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Format display value with proper decimals
  const displayValue = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toString();

  return {
    value,
    displayValue,
    isAnimating,
    isComplete,
    reset,
  };
}

export default useAnimatedCounter;
