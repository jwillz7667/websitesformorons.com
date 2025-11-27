import { Users, Globe, Award, TrendingUp, Clock, Star } from 'lucide-react';
import type { Stat } from '@/types';

export const statsData: Stat[] = [
  {
    id: 'years',
    value: 20,
    suffix: '+',
    label: 'Years Experience',
    description: 'Making the web less ugly since 2004',
    icon: Clock,
  },
  {
    id: 'projects',
    value: 2500,
    suffix: '+',
    label: 'Websites Transformed',
    description: 'From embarrassing to extraordinary',
    icon: Globe,
  },
  {
    id: 'clients',
    value: 500,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Small businesses we\'ve helped grow',
    icon: Users,
  },
  {
    id: 'rating',
    value: 4.9,
    suffix: '/5',
    label: 'Client Rating',
    description: 'Based on 2,500+ reviews',
    icon: Star,
  },
  {
    id: 'increase',
    value: 340,
    suffix: '%',
    label: 'Avg. Traffic Increase',
    description: 'After our redesign magic',
    icon: TrendingUp,
  },
  {
    id: 'awards',
    value: 47,
    label: 'Design Awards',
    description: 'Industry recognition',
    icon: Award,
  },
];

export const quickStats = [
  { value: '2,500+', label: 'Websites Redesigned' },
  { value: '20+', label: 'Years Experience' },
  { value: '4.9/5', label: 'Client Rating' },
  { value: '14 Days', label: 'Average Turnaround' },
];

export default statsData;
