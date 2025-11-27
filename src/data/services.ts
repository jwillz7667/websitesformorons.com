import {
  RefreshCw,
  ShoppingCart,
  Palette,
  Code,
  Search,
  Settings,
  Zap,
  Shield,
  Globe,
  Smartphone,
  BarChart,
  Clock,
} from 'lucide-react';
import type { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: 'redesign',
    icon: RefreshCw,
    title: 'Website Redesign',
    description:
      'Transform your outdated website into a modern, high-converting digital experience that captures attention and drives results. We breathe new life into legacy sites.',
    shortDescription: 'Transform your outdated site into a modern experience',
    price: 'From $2,499',
    priceNote: 'One-time project',
    features: [
      'Complete UX audit & strategy',
      'Custom responsive design',
      'Mobile-first development',
      'SEO foundation setup',
      'Performance optimization',
      '30-day post-launch support',
    ],
    popular: true,
    gradient: 'from-cyan-500 to-cyan-400',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description:
      'Launch or upgrade your online store with cutting-edge e-commerce that sells. From product pages to checkout, we optimize every step of the customer journey.',
    shortDescription: 'Build or upgrade your online store',
    price: 'From $3,999',
    priceNote: 'One-time project',
    features: [
      'Shopify/WooCommerce setup',
      'Custom product pages',
      'Cart & checkout optimization',
      'Payment gateway integration',
      'Inventory management',
      'Email marketing setup',
    ],
    gradient: 'from-orange-500 to-orange-400',
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Create stunning, intuitive interfaces that users love. Our design process combines aesthetics with psychology to deliver experiences that convert visitors into customers.',
    shortDescription: 'Create interfaces users love',
    price: 'From $1,999',
    priceNote: 'Per project',
    features: [
      'User research & personas',
      'Wireframes & prototypes',
      'Visual design system',
      'Interaction design',
      'Usability testing',
      'Design handoff',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'development',
    icon: Code,
    title: 'Custom Development',
    description:
      'Need something unique? Our developers build custom web applications, integrations, and features that perfectly match your business requirements.',
    shortDescription: 'Build custom web applications',
    price: 'From $4,999',
    priceNote: 'Custom quote',
    features: [
      'React/Next.js applications',
      'Custom CMS development',
      'API development',
      'Third-party integrations',
      'Database architecture',
      'Ongoing maintenance',
    ],
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO & Marketing',
    description:
      'Get found online with our comprehensive SEO and digital marketing services. We help you rank higher, drive organic traffic, and outperform your competition.',
    shortDescription: 'Boost your search rankings',
    price: 'From $999/mo',
    priceNote: 'Monthly retainer',
    features: [
      'Technical SEO audit',
      'Keyword research & strategy',
      'On-page optimization',
      'Content strategy',
      'Local SEO',
      'Monthly reporting',
    ],
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'maintenance',
    icon: Settings,
    title: 'Website Maintenance',
    description:
      'Keep your website running smoothly with our maintenance plans. Regular updates, security patches, backups, and 24/7 monitoring so you can focus on your business.',
    shortDescription: 'Keep your site running smoothly',
    price: 'From $99/mo',
    priceNote: 'Monthly retainer',
    features: [
      'Software updates',
      'Security monitoring',
      'Daily backups',
      'Performance monitoring',
      'Content updates (2hr/mo)',
      'Priority support',
    ],
    gradient: 'from-gray-500 to-gray-400',
  },
];

export const serviceFeatures = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sites that load in under 2 seconds',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'SSL, firewalls, and regular audits',
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description: 'Built to rank on Google',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Perfect on every device',
  },
  {
    icon: BarChart,
    title: 'Analytics Ready',
    description: 'Track every interaction',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Help when you need it',
  },
];

export default servicesData;
