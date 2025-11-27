import { MessageSquare, Lightbulb, Palette, Code, Rocket } from 'lucide-react';
import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: 1,
    title: 'Discovery',
    description: 'We start with a deep dive into your business, goals, and target audience. Understanding your unique needs is the foundation of great design.',
    icon: MessageSquare,
    details: [
      'Initial consultation call',
      'Business goals assessment',
      'Competitor analysis',
      'Target audience definition',
      'Content inventory',
    ],
  },
  {
    id: 'strategy',
    number: 2,
    title: 'Strategy',
    description: 'We create a roadmap for your new website, including sitemap, user flows, and technical requirements. No surprises, just clear direction.',
    icon: Lightbulb,
    details: [
      'Site architecture planning',
      'User journey mapping',
      'Feature prioritization',
      'Technology stack selection',
      'Project timeline creation',
    ],
  },
  {
    id: 'design',
    number: 3,
    title: 'Design',
    description: 'Our designers create stunning mockups that bring your brand to life. You\'ll see exactly what your new site will look like before we build it.',
    icon: Palette,
    details: [
      'Mood board & style direction',
      'Wireframe creation',
      'High-fidelity mockups',
      'Interactive prototypes',
      'Unlimited revisions',
    ],
  },
  {
    id: 'development',
    number: 4,
    title: 'Development',
    description: 'Our developers bring the design to life with clean, performant code. Every site is built to be fast, secure, and easy to maintain.',
    icon: Code,
    details: [
      'Frontend development',
      'CMS integration',
      'Performance optimization',
      'Cross-browser testing',
      'Mobile responsiveness',
    ],
  },
  {
    id: 'launch',
    number: 5,
    title: 'Launch',
    description: 'We handle the technical details of going live and provide training so you can manage your new site with confidence.',
    icon: Rocket,
    details: [
      'Quality assurance testing',
      'DNS & hosting setup',
      'SSL configuration',
      'Analytics integration',
      'Training & handoff',
    ],
  },
];

export default processSteps;
