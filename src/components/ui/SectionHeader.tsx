'use client';

import { cn } from '@/lib/utils';
import { GradientText } from './GradientText';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  badge,
  title,
  titleGradient,
  description,
  align = 'center',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  // Split title to apply gradient to part of it
  const renderTitle = () => {
    if (!titleGradient) {
      return title;
    }

    const parts = title.split(titleGradient);
    if (parts.length === 1) {
      return title;
    }

    return (
      <>
        {parts[0]}
        <GradientText>{titleGradient}</GradientText>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn('max-w-3xl mb-16', alignClasses[align], className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-sm font-medium text-cyan-400">{badge}</span>
        </div>
      )}

      <h2
        className={cn(
          'text-display-md md:text-display-lg lg:text-display-xl font-bold text-white mb-6',
          titleClassName
        )}
      >
        {renderTitle()}
      </h2>

      {description && (
        <p
          className={cn(
            'text-lg md:text-xl text-white/60 leading-relaxed',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
