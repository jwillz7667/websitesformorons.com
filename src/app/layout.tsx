import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { jsonLd } from '@/lib/structured-data';

// Using system fonts for optimal performance (no network requests)
// SF Pro on Apple devices, Segoe UI on Windows, Roboto on Android
// This approach provides instant font loading and matches OS aesthetics

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
  userScalable: true,
  colorScheme: 'dark light',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://websitesformorons.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WebsitesForMorons.com | Professional Web Design & Development',
    template: '%s | WebsitesForMorons.com',
  },
  description:
    'Transform your outdated website into a stunning, high-converting digital experience. Award-winning web design, SEO optimization, and e-commerce solutions for small businesses since 2004. Get a free quote today.',
  keywords: [
    'web design agency',
    'website redesign services',
    'small business website design',
    'SEO optimization',
    'web development company',
    'responsive web design',
    'e-commerce website development',
    'WordPress development',
    'Shopify experts',
    'UI/UX design',
    'website maintenance',
    'digital marketing',
    'conversion rate optimization',
    'mobile-first design',
    'progressive web apps',
  ],
  authors: [
    { name: 'WebsitesForMorons.com', url: siteUrl },
  ],
  creator: 'WebsitesForMorons.com',
  publisher: 'WebsitesForMorons.com',
  generator: 'Next.js',
  applicationName: 'WebsitesForMorons.com',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'WebsitesForMorons.com',
    title: 'WebsitesForMorons.com | Professional Web Design & Development',
    description:
      'Transform your outdated website into a stunning, high-converting digital experience. Award-winning web design services since 2004.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebsitesForMorons.com - Professional Web Design Agency',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'WebsitesForMorons.com Logo',
        type: 'image/jpeg',
      },
    ],
    countryName: 'United States',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@websitesformorons',
    creator: '@websitesformorons',
    title: 'WebsitesForMorons.com | Professional Web Design',
    description:
      'Transform your outdated website into a stunning, high-converting digital experience. Award-winning web design since 2004.',
    images: {
      url: '/twitter-image.jpg',
      alt: 'WebsitesForMorons.com - Professional Web Design',
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icons/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
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
      { url: '/icons/apple-touch-icon-120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/apple-touch-icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/apple-touch-icon-167.png', sizes: '167x167', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#06b6d4' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'W4M',
    startupImage: [
      {
        url: '/splash/splash-640x1136.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/splash-750x1334.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/splash-1242x2208.png',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/splash-1125x2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/splash-1536x2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/splash-1668x2224.png',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/splash/splash-2048x2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  category: 'technology',
  classification: 'Business',
  archives: [`${siteUrl}/blog`],
  bookmarks: [`${siteUrl}/services`, `${siteUrl}/portfolio`],
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
    'google': 'notranslate',
    'rating': 'General',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className=""
    >
      <head>
        {/* Preconnect to critical origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* Preload critical assets for LCP optimization */}
        <link
          rel="preload"
          href="/icons/icon-192.png"
          as="image"
          type="image/png"
        />

        {/* Resource hints for better performance */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.organization),
          }}
        />

        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.website),
          }}
        />

        {/* Structured Data - Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.localBusiness),
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MMCSZX9');`,
          }}
        />

        {/* Web Vitals attribution for debugging */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.webVitalsAttribution = true;
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MMCSZX9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        <ThemeProvider>
          {/* Skip to main content for accessibility - WCAG 2.1 Level A */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold z-[9999] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all"
            aria-label="Skip to main content"
          >
            Skip to main content
          </a>

          <Navigation />

          <main
            id="main-content"
            className="min-h-screen"
            role="main"
            aria-label="Main content"
          >
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
