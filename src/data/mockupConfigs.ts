// Pre-configured mockups for each portfolio project
// This file contains no 'use client' directive so it can be imported in server components

export const projectMockupConfigs: Record<string, {
  industry: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
}> = {
  'coastal-dermatology-associates': {
    industry: 'Healthcare',
    primaryColor: '#14b8a6', // teal
    secondaryColor: '#06b6d4', // cyan
  },
  'morrison-blackwell-law': {
    industry: 'Legal Services',
    primaryColor: '#64748b', // slate
    secondaryColor: '#475569',
    accentColor: '#d4af37', // gold
  },
  'heritage-craft-coffee': {
    industry: 'E-Commerce',
    primaryColor: '#d97706', // amber
    secondaryColor: '#ea580c', // orange
  },
  'pinnacle-consulting-group': {
    industry: 'B2B Services',
    primaryColor: '#6366f1', // indigo
    secondaryColor: '#8b5cf6', // purple
  },
  'summit-hvac-solutions': {
    industry: 'Home Services',
    primaryColor: '#3b82f6', // blue
    secondaryColor: '#0ea5e9', // sky
  },
  'terroir-wine-bar': {
    industry: 'Restaurant',
    primaryColor: '#e11d48', // rose
    secondaryColor: '#db2777', // pink
  },
  'blackstone-realty-group': {
    industry: 'Real Estate',
    primaryColor: '#10b981', // emerald
    secondaryColor: '#22c55e', // green
    accentColor: '#d4af37',
  },
  'momentum-performance-lab': {
    industry: 'Fitness',
    primaryColor: '#8b5cf6', // violet
    secondaryColor: '#a855f7', // purple
  },
  'catalyst-leadership-institute': {
    industry: 'Education',
    primaryColor: '#eab308', // yellow
    secondaryColor: '#f59e0b', // amber
  },
  'precision-dynamics-manufacturing': {
    industry: 'Manufacturing',
    primaryColor: '#71717a', // zinc
    secondaryColor: '#525252', // neutral
    accentColor: '#3b82f6',
  },
  'harbor-hope-foundation': {
    industry: 'Nonprofit',
    primaryColor: '#0ea5e9', // sky
    secondaryColor: '#3b82f6', // blue
  },
  'clearview-analytics': {
    industry: 'SaaS',
    primaryColor: '#06b6d4', // cyan
    secondaryColor: '#3b82f6', // blue
  },
};
