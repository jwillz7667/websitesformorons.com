'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { throttle } from '@/lib/utils';

interface MousePosition {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  normalizedX: number;
  normalizedY: number;
  isInViewport: boolean;
}

interface UseMousePositionOptions {
  throttleMs?: number;
  includeTouch?: boolean;
  targetRef?: React.RefObject<HTMLElement>;
}

export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { throttleMs = 16, includeTouch = false, targetRef } = options;
  const isTracking = useRef(true);

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    isInViewport: false,
  });

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!isTracking.current) return;

      let x = clientX;
      let y = clientY;
      let width = window.innerWidth;
      let height = window.innerHeight;

      // If targeting a specific element, use its bounds
      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        x = clientX - rect.left;
        y = clientY - rect.top;
        width = rect.width;
        height = rect.height;
      }

      setPosition({
        x,
        y,
        clientX,
        clientY,
        normalizedX: width > 0 ? x / width : 0.5,
        normalizedY: height > 0 ? y / height : 0.5,
        isInViewport:
          clientX >= 0 &&
          clientX <= window.innerWidth &&
          clientY >= 0 &&
          clientY <= window.innerHeight,
      });
    },
    [targetRef]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    },
    [updatePosition]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    },
    [updatePosition]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition((prev) => ({ ...prev, isInViewport: false }));
  }, []);

  useEffect(() => {
    // Check if we're on the client
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      isTracking.current = false;
      return;
    }

    const throttledMouseMove = throttle(handleMouseMove, throttleMs);
    const throttledTouchMove = throttle(handleTouchMove, throttleMs);

    const target = targetRef?.current || document;

    target.addEventListener('mousemove', throttledMouseMove as EventListener, {
      passive: true,
    });
    target.addEventListener('mouseleave', handleMouseLeave as EventListener);

    if (includeTouch) {
      target.addEventListener('touchmove', throttledTouchMove as EventListener, {
        passive: true,
      });
    }

    return () => {
      target.removeEventListener('mousemove', throttledMouseMove as EventListener);
      target.removeEventListener('mouseleave', handleMouseLeave as EventListener);

      if (includeTouch) {
        target.removeEventListener('touchmove', throttledTouchMove as EventListener);
      }
    };
  }, [
    handleMouseMove,
    handleTouchMove,
    handleMouseLeave,
    throttleMs,
    includeTouch,
    targetRef,
  ]);

  return position;
}

export default useMousePosition;
