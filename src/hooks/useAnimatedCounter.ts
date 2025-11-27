'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';
import { prefersReducedMotion } from '@/lib/utils';

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
  decimals?: number;
  triggerOnce?: boolean;
  threshold?: number;
}

interface AnimatedCounterResult {
  value: number;
  displayValue: string;
  isAnimating: boolean;
  isComplete: boolean;
  ref: React.RefObject<HTMLElement>;
  reset: () => void;
}

const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => Math.pow(t, 3),
  easeInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
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
    triggerOnce = true,
    threshold = 0.5,
  } = options;

  const [value, setValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const [ref, { isIntersecting, hasIntersected }] = useIntersectionObserver<HTMLElement>({
    threshold,
    triggerOnce,
  });

  const shouldAnimate = triggerOnce ? hasIntersected : isIntersecting;

  const animate = useCallback(() => {
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion()) {
      setValue(end);
      setIsComplete(true);
      return;
    }

    const easingFn = easingFunctions[easing];

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

      setValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
        setIsAnimating(false);
        setIsComplete(true);
      }
    };

    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(step);
  }, [start, end, duration, delay, easing]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = null;
    setValue(start);
    setIsAnimating(false);
    setIsComplete(false);
  }, [start]);

  useEffect(() => {
    if (shouldAnimate && !isAnimating && !isComplete) {
      animate();
    }
  }, [shouldAnimate, isAnimating, isComplete, animate]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return {
    value,
    displayValue,
    isAnimating,
    isComplete,
    ref,
    reset,
  };
}

export default useAnimatedCounter;
