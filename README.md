# WebsitesForMorons.com

> A modern, high-performance Next.js 14 marketing website for a professional web design agency specializing in transforming outdated websites into modern, user-friendly experiences.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **⚡ Lightning Fast**: Built with Next.js 14 App Router for optimal performance
- **🎨 Modern Design**: Stunning UI with glassmorphism effects, gradient animations, and smooth transitions
- **🌓 Dark/Light Mode**: Fully functional theme toggle with persistent user preferences
- **📱 Fully Responsive**: Pixel-perfect mobile, tablet, and desktop layouts
- **♿ Accessible**: WCAG compliant with proper ARIA labels and semantic HTML
- **🎯 SEO Optimized**: Meta tags, JSON-LD structured data, auto-generated sitemap
- **🚀 Production Ready**: Optimized for Vercel deployment with best practices

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Features
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO**: next-seo + next-sitemap
- **Forms**: Tailwind Forms plugin
- **Typography**: Tailwind Typography plugin
- **Analytics**: Vercel Analytics

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/jwillz7667/websitesformorons.com.git
cd websitesformorons.com
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

4. **Configure environment variables**
Edit `.env.local` and add your configuration:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
CONTACT_EMAIL=your@email.com
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `ANALYZE=true npm run build` | Build with bundle analyzer |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio/case studies
│   ├── about/             # About page
│   ├── blog/              # Blog
│   ├── faq/               # FAQ page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   └── terms/             # Terms of service
├── components/
│   ├── providers/         # ThemeProvider (dark/light mode)
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navigation, Footer
│   ├── sections/          # Page sections (Hero, Stats, etc.)
│   ├── pages/             # Full page components
│   └── features/          # Feature-specific components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── structured-data.ts # JSON-LD schema generators
├── data/                  # Static content (projects, services, FAQ)
├── hooks/                 # Custom React hooks
├── styles/                # Global CSS and Tailwind config
└── types/                 # TypeScript type definitions
```

## 🎨 Key Features Explained

### Dark/Light Mode

The theme system uses React Context with localStorage persistence:

```tsx
import { useTheme } from '@/components/providers/ThemeProvider';

function MyComponent() {
  const { isDark, toggle, theme } = useTheme();

  return (
    <button onClick={toggle}>
      Current theme: {theme}
    </button>
  );
}
```

### Custom Hooks

- **`useScrollPosition`**: Track scroll position and direction for auto-hiding navigation
- **`useIntersectionObserver`**: Trigger animations when elements enter viewport
- **`useMousePosition`**: Track cursor for interactive effects (desktop only)
- **`useMediaQuery`**: Responsive behavior based on screen size

### Responsive Design

All components use mobile-first responsive classes:

```tsx
// Example: Responsive padding and text sizing
<div className="px-4 sm:px-6 lg:px-8 text-base sm:text-lg lg:text-xl">
  Content
</div>
```

### Performance Optimizations

- ✅ Next.js Image optimization with AVIF/WebP
- ✅ SWC minification (faster than Terser)
- ✅ Passive event listeners for smooth scrolling
- ✅ Intersection Observer for efficient scroll animations
- ✅ CSS-based animations (better performance than JS)
- ✅ Bundle size monitoring with built-in analyzer

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Configure environment variables
4. Deploy!

Vercel automatically handles:
- Build optimization
- Edge caching
- Analytics tracking
- Automatic HTTPS

### Self-Hosting

```bash
# Build for production
npm run build

# Start production server (runs on port 3000)
npm run start
```

For custom deployments, see [Next.js Deployment Docs](https://nextjs.org/docs/deployment).

## 🔧 Configuration

### Tailwind Config

Custom colors, animations, and utilities are defined in `tailwind.config.js`:

- **Primary**: Cyan (#06b6d4)
- **Accent**: Orange (#f97316)
- **Neutral**: Rich blacks and grays for dark mode

### Next.js Config

`next.config.js` includes:
- Security headers (CSP, X-Frame-Options)
- Image optimization settings
- SWC minification
- Strict mode enabled

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, services preview, process, pricing, testimonials |
| Services | `/services` | Detailed service offerings |
| Portfolio | `/portfolio` | Case studies with metrics |
| About | `/about` | Team, company history, values |
| Blog | `/blog` | Article listings (CMS-ready) |
| FAQ | `/faq` | Accordion-style FAQ |
| Contact | `/contact` | Contact form + map |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms of service |

## 🎯 SEO Features

- ✅ Semantic HTML with proper heading hierarchy
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ JSON-LD structured data (Organization, ProfessionalService, FAQPage)
- ✅ Auto-generated sitemap with next-sitemap
- ✅ Robots.txt configuration
- ✅ Fast page load times (< 2s FCP)

## 🧪 Testing

Currently no test suite is configured. To add testing:

**Unit/Integration Tests**:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**E2E Tests**:
```bash
npm install --save-dev cypress
# or
npm install --save-dev playwright
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules (`npm run lint`)
- Use Prettier for formatting (configure as needed)
- Write semantic commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

For support, email contact@websitesformorons.com or open an issue on GitHub.

## 🔗 Links

- **Live Demo**: [https://websitesformorons.com](https://websitesformorons.com)
- **Documentation**: [/docs](/docs)
- **Issue Tracker**: [GitHub Issues](https://github.com/jwillz7667/websitesformorons.com/issues)

---

Made with ❤️ by the WebsitesForMorons Team
