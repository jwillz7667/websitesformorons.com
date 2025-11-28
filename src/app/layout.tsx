import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#06b6d4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://websitesformorons.com'),
  title: {
    default: 'WebsitesForMorons.com | Transform Your Outdated Website',
    template: '%s | WebsitesForMorons.com',
  },
  description:
    'Transform your embarrassing legacy website into a stunning, high-converting digital experience. Professional web design services for small businesses since 2004.',
  keywords: [
    'web design',
    'website redesign',
    'small business website',
    'SEO',
    'web development',
    'website makeover',
    'responsive design',
    'e-commerce',
    'WordPress',
    'Shopify',
  ],
  authors: [{ name: 'WebsitesForMorons.com' }],
  creator: 'WebsitesForMorons.com',
  publisher: 'WebsitesForMorons.com',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://websitesformorons.com',
    siteName: 'WebsitesForMorons.com',
    title: 'WebsitesForMorons.com | Transform Your Outdated Website',
    description:
      'Transform your embarrassing legacy website into a stunning, high-converting digital experience. Professional web design services since 2004.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebsitesForMorons.com - Professional Web Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@websitesformorons',
    creator: '@websitesformorons',
    title: 'WebsitesForMorons.com | Transform Your Outdated Website',
    description:
      'Transform your embarrassing legacy website into a stunning, high-converting digital experience.',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://websitesformorons.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icons/icon-72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'W4M',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold z-[100]"
          >
            Skip to main content
          </a>

          <Navigation />

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <Footer />
        </ThemeProvider>

        <ServiceWorkerRegistration />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
