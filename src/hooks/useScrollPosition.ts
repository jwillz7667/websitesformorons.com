'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { throttle } from '@/lib/utils';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollProgress: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  offset?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}): ScrollPosition {
  const { throttleMs = 50, offset = 0 } = options;
  const previousScrollY = useRef(0);

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    isAtTop: true,
    isAtBottom: false,
    scrollProgress: 0,
  });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;

    const direction: 'up' | 'down' | null =
      currentScrollY > previousScrollY.current
        ? 'down'
        : currentScrollY < previousScrollY.current
          ? 'up'
          : null;

    previousScrollY.current = currentScrollY;

    setScrollPosition({
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      scrollDirection: direction,
      isAtTop: currentScrollY <= offset,
      isAtBottom: currentScrollY >= documentHeight - offset,
      scrollProgress,
    });
  }, [offset]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, throttleMs);

    // Set initial position
    handleScroll();

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll, throttleMs]);

  return scrollPosition;
}

export default useScrollPosition;
