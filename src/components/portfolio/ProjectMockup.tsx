'use client';

import { WebsiteMockup } from '@/components/ui/WebsiteMockup';
import { projectMockupConfigs } from '@/data/mockupConfigs';
import { cn } from '@/lib/utils';

interface ProjectMockupProps {
  projectId: string;
  projectName: string;
  increase: string;
  gradient: string;
  icon: string;
}

export function ProjectMockup({
  projectId,
  projectName,
  increase,
  gradient,
  icon,
}: ProjectMockupProps) {
  const config = projectMockupConfigs[projectId];

  if (config) {
    return (
      <WebsiteMockup
        industry={config.industry}
        projectName={projectName}
        increase={increase}
        primaryColor={config.primaryColor}
        secondaryColor={config.secondaryColor}
        accentColor={config.accentColor}
      />
    );
  }

  // Fallback for projects without mockup config
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
