'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CompareSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  className?: string;
  initialPosition?: number;
}

export function CompareSlider({
  before,
  after,
  className,
  initialPosition = 50,
}: CompareSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;

      const newPosition = Math.max(0, Math.min(100, (x / width) * 100));
      setPosition(newPosition);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsResizing(true);
    // Don't prevent default here to allow scrolling if they miss the handle slightly or if we want vertical scroll
  }, []);

  useEffect(() => {
    const handleMouseUp = () => setIsResizing(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isResizing && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isResizing, handleMove]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none h-full w-full", className)}
      style={{ touchAction: 'pan-y' }}
    >
      {/* After Content (Background - Full Modern Design) */}
      <div className="absolute inset-0 w-full h-full">
         {after}
      </div>

      {/* Before Content (Foreground - Ugly Design, Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden bg-white dark:bg-neutral-900"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {before}
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-cyan-400 to-orange-500 cursor-ew-resize z-20 hover:scale-x-110 transition-transform"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-glow shadow-cyan-500/50">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-cyan-400 rounded" />
            <div className="w-0.5 h-4 bg-cyan-400 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
