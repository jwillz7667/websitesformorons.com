'use client';

import { cn } from '@/lib/utils';

export interface WebsiteMockupProps {
  industry: string;
  projectName: string;
  increase: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  className?: string;
}

// Industry-specific content configurations
const industryConfigs: Record<string, {
  navItems: string[];
  heroHeadline: string;
  features: string[];
  ctaText: string;
  statsLabel: string;
}> = {
  Healthcare: {
    navItems: ['Services', 'Doctors', 'Book'],
    heroHeadline: 'Expert Care',
    features: ['Appointments', 'Insurance', 'Locations'],
    ctaText: 'Book Now',
    statsLabel: 'Patients Served',
  },
  'Legal Services': {
    navItems: ['Practice', 'Team', 'Contact'],
    heroHeadline: 'Justice Wins',
    features: ['Cases', 'Results', 'Reviews'],
    ctaText: 'Free Consult',
    statsLabel: 'Cases Won',
  },
  'E-Commerce': {
    navItems: ['Shop', 'Sale', 'Cart'],
    heroHeadline: 'New Arrivals',
    features: ['Best Sellers', 'Trending', 'Deals'],
    ctaText: 'Shop Now',
    statsLabel: 'Products Sold',
  },
  'B2B Services': {
    navItems: ['Solutions', 'Cases', 'Demo'],
    heroHeadline: 'Scale Fast',
    features: ['Analytics', 'Insights', 'ROI'],
    ctaText: 'Get Demo',
    statsLabel: 'Clients Served',
  },
  'Home Services': {
    navItems: ['Services', 'Areas', 'Quote'],
    heroHeadline: 'Trusted Pros',
    features: ['24/7 Service', 'Licensed', 'Guaranteed'],
    ctaText: 'Get Quote',
    statsLabel: 'Jobs Done',
  },
  Restaurant: {
    navItems: ['Menu', 'Reserve', 'Events'],
    heroHeadline: 'Fine Dining',
    features: ['Menu', 'Wine List', 'Private'],
    ctaText: 'Reserve',
    statsLabel: 'Guests Served',
  },
  'Real Estate': {
    navItems: ['Listings', 'Agents', 'Sell'],
    heroHeadline: 'Dream Home',
    features: ['Buy', 'Sell', 'Invest'],
    ctaText: 'View Listings',
    statsLabel: 'Homes Sold',
  },
  Fitness: {
    navItems: ['Programs', 'Trainers', 'Join'],
    heroHeadline: 'Get Strong',
    features: ['Classes', 'Personal', 'Nutrition'],
    ctaText: 'Start Free',
    statsLabel: 'Members',
  },
  Education: {
    navItems: ['Programs', 'About', 'Apply'],
    heroHeadline: 'Lead Better',
    features: ['Courses', 'Coaching', 'Certify'],
    ctaText: 'Apply Now',
    statsLabel: 'Graduates',
  },
  Manufacturing: {
    navItems: ['Capabilities', 'Quality', 'RFQ'],
    heroHeadline: 'Precision',
    features: ['ISO 9001', 'AS9100', 'ITAR'],
    ctaText: 'Get Quote',
    statsLabel: 'Parts Made',
  },
  Nonprofit: {
    navItems: ['Mission', 'Impact', 'Donate'],
    heroHeadline: 'Make Impact',
    features: ['Programs', 'Stories', 'Events'],
    ctaText: 'Donate Now',
    statsLabel: 'Lives Changed',
  },
  SaaS: {
    navItems: ['Features', 'Pricing', 'Login'],
    heroHeadline: 'Work Smarter',
    features: ['Dashboard', 'Reports', 'API'],
    ctaText: 'Start Free',
    statsLabel: 'Active Users',
  },
};

export function WebsiteMockup({
  industry,
  projectName,
  increase,
  primaryColor,
  secondaryColor,
  accentColor,
  className,
}: WebsiteMockupProps) {
  const config = industryConfigs[industry] || industryConfigs['B2B Services'];
  const accent = accentColor || primaryColor;

  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      aria-label={`${projectName} website mockup - ${industry} - ${increase} improvement`}
    >
      <defs>
        {/* Main gradient */}
        <linearGradient id={`grad-${industry.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
        {/* Button gradient */}
        <linearGradient id={`btn-${industry.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        {/* Subtle background gradient */}
        <linearGradient id={`bg-${industry.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="50%" stopColor="#171717" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        {/* Glow filter */}
        <filter id={`glow-${industry.replace(/\s/g, '')}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="800" height="500" fill={`url(#bg-${industry.replace(/\s/g, '')})`} />

      {/* Subtle gradient orb */}
      <ellipse cx="600" cy="150" rx="200" ry="150" fill={primaryColor} opacity="0.08" />
      <ellipse cx="200" cy="400" rx="180" ry="120" fill={secondaryColor} opacity="0.05" />

      {/* Navigation bar */}
      <rect x="0" y="0" width="800" height="60" fill="#171717" />
      <rect x="0" y="59" width="800" height="1" fill="#262626" />

      {/* Logo placeholder */}
      <rect x="32" y="18" width="100" height="24" rx="6" fill={`url(#grad-${industry.replace(/\s/g, '')})`} />

      {/* Nav items */}
      {config.navItems.map((_, i) => (
        <rect
          key={i}
          x={500 + i * 80}
          y="22"
          width="60"
          height="16"
          rx="4"
          fill={i === config.navItems.length - 1 ? primaryColor : '#3f3f46'}
        />
      ))}

      {/* Hero Section */}
      <g transform="translate(32, 90)">
        {/* Hero content area */}
        <rect x="0" y="0" width="440" height="280" rx="16" fill="#1f1f1f" opacity="0.5" />

        {/* Badge */}
        <rect x="20" y="20" width="120" height="24" rx="12" fill={primaryColor} opacity="0.2" />
        <rect x="28" y="26" width="104" height="12" rx="4" fill={primaryColor} opacity="0.6" />

        {/* Main headline */}
        <text x="20" y="80" fill="white" fontSize="36" fontWeight="bold" fontFamily="system-ui">
          {config.heroHeadline}
        </text>

        {/* Subheadline placeholder */}
        <rect x="20" y="100" width="380" height="12" rx="4" fill="#525252" />
        <rect x="20" y="120" width="320" height="12" rx="4" fill="#525252" />
        <rect x="20" y="140" width="280" height="12" rx="4" fill="#404040" />

        {/* CTA Buttons */}
        <rect x="20" y="180" width="140" height="44" rx="8" fill={`url(#btn-${industry.replace(/\s/g, '')})`} />
        <text x="90" y="208" fill="white" fontSize="14" fontWeight="600" textAnchor="middle" fontFamily="system-ui">
          {config.ctaText}
        </text>

        <rect x="180" y="180" width="120" height="44" rx="8" fill="transparent" stroke="#525252" strokeWidth="2" />
        <text x="240" y="208" fill="#a1a1aa" fontSize="14" fontWeight="500" textAnchor="middle" fontFamily="system-ui">
          Learn More
        </text>

        {/* Trust indicators */}
        <g transform="translate(20, 250)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <rect x="22" y="4" width="80" height="8" rx="2" fill="#525252" />
          <circle cx="120" cy="8" r="6" fill="#22c55e" />
          <rect x="134" y="4" width="80" height="8" rx="2" fill="#525252" />
        </g>
      </g>

      {/* Stats card - floating right */}
      <g transform="translate(500, 100)">
        <rect x="0" y="0" width="260" height="180" rx="16" fill="#262626" stroke="#3f3f46" strokeWidth="1" />

        {/* Big stat */}
        <text x="130" y="70" fill={primaryColor} fontSize="48" fontWeight="bold" textAnchor="middle" fontFamily="system-ui"
          filter={`url(#glow-${industry.replace(/\s/g, '')})`}>
          {increase}
        </text>
        <text x="130" y="95" fill="#a1a1aa" fontSize="14" textAnchor="middle" fontFamily="system-ui">
          Performance Increase
        </text>

        {/* Mini stats */}
        <line x1="20" y1="120" x2="240" y2="120" stroke="#3f3f46" strokeWidth="1" />
        <g transform="translate(40, 140)">
          <text x="0" y="12" fill="white" fontSize="18" fontWeight="600" fontFamily="system-ui">2.1s</text>
          <text x="0" y="30" fill="#71717a" fontSize="11" fontFamily="system-ui">Load Time</text>
        </g>
        <g transform="translate(140, 140)">
          <text x="0" y="12" fill="white" fontSize="18" fontWeight="600" fontFamily="system-ui">98</text>
          <text x="0" y="30" fill="#71717a" fontSize="11" fontFamily="system-ui">PageSpeed</text>
        </g>
      </g>

      {/* Feature cards row */}
      <g transform="translate(32, 400)">
        {config.features.map((feature, i) => (
          <g key={i} transform={`translate(${i * 250}, 0)`}>
            <rect x="0" y="0" width="230" height="80" rx="12" fill="#1f1f1f" stroke="#3f3f46" strokeWidth="1" />
            {/* Icon placeholder */}
            <rect x="16" y="16" width="36" height="36" rx="8" fill={primaryColor} opacity="0.2" />
            <rect x="24" y="24" width="20" height="20" rx="4" fill={primaryColor} opacity="0.5" />
            {/* Feature label */}
            <text x="68" y="32" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui">{feature}</text>
            <rect x="68" y="44" width="120" height="8" rx="2" fill="#404040" />
          </g>
        ))}
      </g>

      {/* Project name badge - bottom right */}
      <g transform="translate(580, 460)">
        <rect x="0" y="0" width="200" height="28" rx="6" fill="#262626" stroke="#3f3f46" strokeWidth="1" />
        <text x="100" y="18" fill="#71717a" fontSize="11" textAnchor="middle" fontFamily="system-ui">
          {projectName.substring(0, 28)}
        </text>
      </g>

      {/* Industry badge - top right */}
      <g transform="translate(660, 75)">
        <rect x="0" y="0" width="120" height="24" rx="12" fill={primaryColor} opacity="0.15" />
        <text x="60" y="16" fill={primaryColor} fontSize="11" fontWeight="500" textAnchor="middle" fontFamily="system-ui">
          {industry}
        </text>
      </g>
    </svg>
  );
}

// Re-export config from data file for convenience
export { projectMockupConfigs } from '@/data/mockupConfigs';
