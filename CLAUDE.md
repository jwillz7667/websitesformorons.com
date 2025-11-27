# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WebsitesForMorons.com** is a modern Next.js 14 marketing/portfolio website for a professional web design agency. It features SEO optimization, dark/light theme support, component-driven architecture, and is production-ready for Vercel deployment.

## Core Stack & Architecture

- **Framework**: Next.js 14 (App Router) with React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4 + PostCSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **SEO**: next-seo + JSON-LD structured data + next-sitemap
- **Analytics**: Vercel Analytics
- **State Management**: React Context (theme provider only—minimal state)

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata, theme provider
│   ├── page.tsx           # Homepage
│   ├── services/          # Services listing
│   ├── portfolio/         # Case studies
│   ├── about/             # About company
│   ├── blog/              # Blog
│   ├── faq/               # FAQ
│   ├── contact/           # Contact form
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── components/
│   ├── providers/         # ThemeProvider (context for dark/light mode)
│   ├── ui/                # Primitives: Button, Card, Input (all support theme colors)
│   ├── layout/            # Navigation, Footer (client components)
│   ├── sections/          # Page sections (Hero, Stats, ServicesPreview, etc.)
│   ├── pages/             # Full page components
│   └── features/          # Feature-specific components
├── lib/
│   ├── utils.ts           # cn() (Tailwind merging), formatDate()
│   └── structured-data.ts # JSON-LD schema generators
├── data/                  # Static data files (projects, services, faq, team)
├── hooks/                 # useIntersectionObserver, useScrollPosition
├── styles/                # globals.css (Tailwind directives + animations)
└── types/                 # TypeScript type definitions
```

## Key Architectural Patterns

### Theme Provider Pattern
- **Location**: `src/components/providers/ThemeProvider.tsx`
- Context-based dark/light mode with localStorage persistence
- Exports semantic color variables (bg, text, textMuted, border)
- Client-side only (`'use client'`)
- All theme-aware components import from this context

### Component Design
- **UI Primitives** (Button, Card, Input) accept `className` prop for Tailwind overrides
- Use `cn()` utility to merge classes safely (clsx + twMerge)
- Button & Input use `forwardRef` for ref access
- Button supports `variant` (primary/secondary/ghost) and `size` (sm/md/lg) props
- **Polymorphic components**: Accept `as` prop to render as different HTML elements

### Custom Hooks for Interactions
Located in `src/hooks/`:
- **`useScrollPosition`** - Tracks scroll Y position and direction for auto-hiding nav, parallax effects
- **`useIntersectionObserver`** - Performant scroll-triggered animations (fade-in, counting)
- **`useMousePosition`** - Cursor tracking for interactive gradient orbs (desktop only)
- **`useMediaQuery`** - Responsive behavior (e.g., show/hide desktop-only elements)

**Best Practice**: Use Intersection Observer instead of scroll listeners for performance.

### Micro-interactions & Effects
- Passive event listeners for smooth scrolling
- CSS-based animations where possible (better performance than JS)
- Glassmorphism with `backdrop-blur` effects
- Gradient text clipping with `bg-clip-text text-transparent`
- Custom scrollbar styling in `globals.css`
- Selection highlight theming (cyan highlight on select)

### Data-Driven Content
- Static data files enable easy CMS integration
- `projects.ts`: Portfolio/case studies with testimonials, metrics, testimonial quotes
- `services.ts`: Service offerings with Lucide icons, features, pricing
- `faq.ts`: FAQ content (structured for JSON-LD schema)
- `team.ts`: Team profiles with roles and social links

### SEO Strategy
- **Structured Data**: JSON-LD for Organization, ProfessionalService, FAQPage
- **Metadata**: Next.js Metadata API with OG tags, Twitter cards
- **Sitemap**: Auto-generated with next-sitemap
- **Robots.txt**: Pre-configured to allow all + disallow /api/*
- **Path Aliases**: `@/*` shortcuts in tsconfig for clean imports

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on port 3000

# Production
npm run build            # Build for production (.next/output)
npm run start            # Run production server

# Code Quality
npm run lint             # Run ESLint (Next.js config)

# Analysis (requires @next/bundle-analyzer)
ANALYZE=true npm run build  # Generate bundle analysis
```

## Configuration Files Overview

### `next.config.js`
- `reactStrictMode: true` for development warnings
- `swcMinify: true` for fast minification
- Security headers: X-XSS-Protection, X-Frame-Options, CSP directives
- Image optimization with AVIF/WebP formats

### `tailwind.config.js`
- Custom colors: Cyan (primary #06b6d4) + Orange (accent #f97316)
- Dark mode with `class` strategy
- Custom animations: `float` (3s loop) and `fade-in` (0.5s)
- Font: Inter from Google Fonts
- `prefers-reduced-motion` support for accessibility

### `tsconfig.json`
- Strict mode enabled
- Path aliases: `@/*`, `@/components/*`, `@/lib/*`, `@/styles/*`, `@/data/*`
- Incremental builds enabled
- All `.ts` and `.tsx` files included

### `.env.local`
Create from `.env.example`. Key variables:
- `NEXT_PUBLIC_SITE_URL`: Base URL for metadata
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- `CONTACT_EMAIL`: Contact form recipient
- `SMTP_*`: Email service credentials (if contact form backend added)
- `CMS_API_URL`, `CMS_API_KEY`: Optional CMS integration

## Page Sections & Component Library

### Core UI Components (`src/components/ui/`)
- **Button** - Polymorphic button with variants (primary/secondary/ghost) and sizes (sm/md/lg)
- **Card** - Reusable card wrapper with optional hover lift effect
- **Input** - Form input with optional label and error state display
- **SectionHeader** - Consistent section title styling (gradient support)
- **GradientText** - Reusable gradient text component (cyan→orange)
- **AnimatedCounter** - Number counter that animates on scroll trigger

### Homepage Sections (`src/app/page.tsx`)
1. **Hero** - Immersive landing with browser mockup showcase
2. **Stats** - Animated counters with icons (e.g., years in business, projects completed)
3. **Services** - 6-card grid with hover effects and Lucide icons
4. **Process** - 5-step timeline with visual connection lines
5. **Pricing** - 3-tier pricing table with toggle (monthly/yearly) and popular badge
6. **Testimonials** - Auto-rotating carousel with client quotes
7. **CTA** - Email capture form with gradient background

### Full Page Components (`src/components/pages/`)
- **ServicesPage** - Expanded services listing with detailed features
- **PortfolioPage** - Case study grid with before/after comparisons
- **AboutPage** - Team section, company history, values
- **BlogPage** - Article list (structure ready for Markdown or CMS)
- **FAQPage** - Accordion-style FAQ with JSON-LD schema
- **ContactPage** - Contact form + map + info
- **PrivacyPage** - Privacy policy content
- **TermsPage** - Terms of service content

### Layout Components (`src/components/layout/`)
- **Navigation** - Auto-hiding on scroll down, theme toggle, mobile menu
- **Footer** - Full navigation links, social profiles, contact info

### Performance Features
- Auto-hiding navigation on scroll down (using `useScrollPosition`)
- Animated counters trigger on viewport entry (using `useIntersectionObserver`)
- Cursor-following gradient orbs on desktop (using `useMousePosition`)
- Testimonial carousel with auto-play
- Pricing toggle with computed savings display
- Loading state with branded spinner

## Common Development Tasks

### Adding a New Page
1. Create route file in `src/app/[route]/page.tsx`
2. Export metadata object with SEO tags
3. Create corresponding component in `src/components/pages/`
4. Component should handle dark mode via `useTheme()` hook

### Adding a New Service/Product
1. Add entry to `src/data/services.ts` with icon from Lucide
2. Update `src/components/sections/ServicesPreview.tsx` to render it
3. Update metadata if adding new service page

### Styling Components
- Use Tailwind classes directly (PostCSS processes them)
- For dynamic colors, use `cn()` utility to merge classes safely
- Theme colors auto-apply via `useTheme()` context
- `.gradient-text` class applies cyan→orange gradient

### Adding Custom Animations
- Define keyframes in `tailwind.config.js` under `theme.extend.animation`
- Apply with `animate-*` class
- All animations respect `prefers-reduced-motion` query
- Prefer CSS animations for better performance than JS-based animations

### Implementing Scroll-Triggered Animations
Use `useIntersectionObserver` hook for fade-in, slide-up, or counter animations:
```tsx
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
return (
  <div ref={ref} className={isVisible ? 'animate-fade-in' : 'opacity-0'}>
    Content
  </div>
);
```

### Implementing Interactive Cursor Effects
Use `useMousePosition` for desktop-only interactive effects:
```tsx
const { x, y } = useMousePosition();
// Use x, y to position gradient orbs or parallax elements
// Only render on desktop: check with useMediaQuery('(min-width: 768px)')
```

### Implementing Auto-Hiding Navigation
Use `useScrollPosition` to detect scroll direction:
```tsx
const scrollY = useScrollPosition();
// Show nav when scrollY is low or user is scrolling up
// Hide nav when scrolling down significantly
```

## Deployment

### Vercel (Recommended)
- Push to GitHub and connect repo to Vercel
- Env vars configured in Vercel dashboard
- Analytics automatically tracked
- Sitemap generated on build

### Self-Hosted
```bash
npm run build
npm run start  # Runs on port 3000
```

## Testing

Currently not configured. To add:
- **Jest + React Testing Library** for component tests
- **Cypress/Playwright** for E2E tests
- **Vitest** as faster Jest alternative

## Performance & Optimization

- Image formats: AVIF/WebP with fallbacks (configured in next.config.js)
- SEO metadata pre-rendered (no CSR delay)
- Lazy intersection observer hooks for scroll animations
- SWC minification (faster than Terser)

## Important Notes

- **No database**: Contact form backend not implemented; add API route + email service if needed
- **TypeScript strict mode**: All code must pass type checking
- **ESLint**: Run `npm run lint` before committing
- **Mobile-first**: Design decisions should prioritize mobile experience
- **Dark mode default**: Theme defaults to dark; users can toggle via ThemeProvider

## Extending the Project

### Adding a Backend API
1. Create `src/app/api/route.ts` files
2. Use Next.js built-in API routes (not external backend needed)
3. For database: consider Supabase + Prisma ORM

### Adding Blog Content
1. Add blog posts to `src/data/blog.ts` or integrate with Markdown files
2. Create dynamic route `src/app/blog/[slug]/page.tsx`
3. Generate sitemap entries for new blog posts

### Adding Contact Form Backend
1. Create `src/app/api/contact/route.ts`
2. Use Resend, SendGrid, or SMTP (env vars ready)
3. Add form validation + rate limiting
