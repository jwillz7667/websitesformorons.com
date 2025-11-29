'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectMockupProps {
  projectId: string;
  projectName: string;
  increase: string;
  gradient: string;
  icon: string;
}

// Map project IDs to actual hero images
const projectImageMap: Record<string, string> = {
  'coastal-dermatology-associates': '/portfolio/hero-images/Coastal.webp',
  'morrison-blackwell-law': '/portfolio/hero-images/morris.webp',
  'heritage-craft-coffee': '/portfolio/hero-images/heritage.webp',
  'summit-hvac-solutions': '/portfolio/hero-images/summit.webp',
  'terroir-wine-bar': '/portfolio/hero-images/terrier.webp',
  'blackstone-realty-group': '/portfolio/hero-images/blackstone.webp',
  'momentum-performance-lab': '/portfolio/hero-images/momentum.webp',
  'catalyst-leadership-institute': '/portfolio/hero-images/catalyst.webp',
  'precision-dynamics-manufacturing': '/portfolio/hero-images/precisiondynamics.webp',
  'harbor-hope-foundation': '/portfolio/hero-images/harborhope.webp',
  'clearview-analytics': '/portfolio/hero-images/clearviewanalytics.webp',
};

export function ProjectMockup({
  projectId,
  projectName,
  increase,
  gradient,
  icon,
}: ProjectMockupProps) {
  const imagePath = projectImageMap[projectId];

  // Use actual hero image if available
  if (imagePath) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-neutral-950">
        <Image
          src={imagePath}
          alt={`${projectName} website hero section`}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </div>
    );
  }

  // Fallback for projects without images
  return (
    <div className={cn(
      'w-full h-full flex items-center justify-center relative',
      `bg-gradient-to-br ${gradient}`
    )}>
      <span className="text-8xl opacity-20 absolute">{icon}</span>
      <div className="relative z-10 text-center">
        <div className="text-6xl font-bold text-white drop-shadow-lg mb-2">
          {increase}
        </div>
        <div className="text-lg text-white/80 font-medium">
          Performance Increase
        </div>
      </div>
    </div>
  );
}
