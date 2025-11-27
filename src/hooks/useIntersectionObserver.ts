'use client';

import { useState, useEffect, useRef, useCallback, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

interface IntersectionResult {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
  hasIntersected: boolean;
}

type UseIntersectionObserverReturn<T extends Element> = [RefObject<T>, IntersectionResult];

export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    enabled = true,
  } = options;

  const ref = useRef<T>(null);
  const [result, setResult] = useState<IntersectionResult>({
    isIntersecting: false,
    entry: null,
    hasIntersected: false,
  });

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      setResult((prev) => {
        const isIntersecting = entry.isIntersecting;
        const hasIntersected = prev.hasIntersected || isIntersecting;

        // If triggerOnce and already intersected, don't update isIntersecting to false
        if (triggerOnce && prev.hasIntersected) {
          return {
            ...prev,
            entry,
            isIntersecting: prev.isIntersecting,
          };
        }

        return {
          isIntersecting,
          entry,
          hasIntersected,
        };
      });
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      setResult({
        isIntersecting: true,
        entry: null,
        hasIntersected: true,
      });
      return;
    }

    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [callback, threshold, root, rootMargin, enabled]);

  return [ref, result];
}

// Hook for multiple elements
export function useIntersectionObserverMultiple<T extends Element = HTMLDivElement>(
  count: number,
  options: UseIntersectionObserverOptions = {}
): Array<UseIntersectionObserverReturn<T>> {
  const results: Array<UseIntersectionObserverReturn<T>> = [];

  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results.push(useIntersectionObserver<T>(options));
  }

  return results;
}

export default useIntersectionObserver;
