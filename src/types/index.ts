import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

// ============================================================================
// Component Props Types
// ============================================================================

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

export interface CardProps extends BaseProps {
  variant?: 'default' | 'glass' | 'solid' | 'gradient';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// ============================================================================
// Data Types
// ============================================================================

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  shortDescription?: string;
  price: string;
  priceNote?: string;
  features: string[];
  popular?: boolean;
  gradient: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  gradient: string;
  icon: string;
  increase: string;
  description: string;
  shortDescription?: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial: {
    text: string;
    author: string;
    role?: string;
    avatar?: string;
  };
  screenshots: string[];
  beforeImage?: string;
  afterImage?: string;
  url?: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  projectId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  popular?: boolean;
  cta: string;
  gradient: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: TeamMember;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  category: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: LucideIcon;
  badge?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

// ============================================================================
// Form Types
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget?: string;
  service?: string;
  message: string;
  currentWebsite?: string;
}

export interface NewsletterFormData {
  email: string;
}

// ============================================================================
// Theme Types
// ============================================================================

export interface ThemeConfig {
  isDark: boolean;
  colors: {
    bg: string;
    bgAlt: string;
    text: string;
    textMuted: string;
    border: string;
    borderHover: string;
  };
}

// ============================================================================
// Animation Types
// ============================================================================

export interface AnimationConfig {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

export interface ScrollAnimationConfig {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface APIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// SEO Types
// ============================================================================

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    type?: string;
  };
  twitter?: {
    cardType?: 'summary' | 'summary_large_image';
    site?: string;
    handle?: string;
  };
}
