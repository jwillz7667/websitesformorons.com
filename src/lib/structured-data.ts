import type { FAQ } from '@/types';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://websitesformorons.com';

export const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'WebsitesForMorons.com',
    alternateName: 'Websites For Morons',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/og-image.jpg`,
    description:
      'Professional web design company specializing in transforming outdated legacy websites into modern, high-converting digital experiences since 2004.',
    foundingDate: '2004',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '900 Nicollet Mall',
      addressLocality: 'Minneapolis',
      addressRegion: 'MN',
      postalCode: '55403',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'customer service',
        availableLanguage: ['English'],
        areaServed: 'US',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'sales',
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
    sameAs: [
      'https://twitter.com/websitesformorons',
      'https://linkedin.com/company/websitesformorons',
      'https://facebook.com/websitesformorons',
      'https://instagram.com/websitesformorons',
      'https://github.com/websitesformorons',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '2500',
      ratingCount: '2500',
    },
    award: [
      'Best Web Design Agency 2023 - Webby Awards',
      'Top 100 Digital Agencies - Clutch',
      'Excellence in UX Design - Awwwards',
    ],
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'WebsitesForMorons.com',
    image: `${siteUrl}/storefront.jpg`,
    priceRange: '$$',
    telephone: '+1-555-123-4567',
    email: 'hello@websitesformorons.com',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '900 Nicollet Mall',
      addressLocality: 'Minneapolis',
      addressRegion: 'MN',
      postalCode: '55403',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.9778,
      longitude: -93.2650,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Redesign',
            description: 'Transform your outdated website into a modern, high-converting experience.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Development',
            description: 'Build or upgrade your online store with cutting-edge e-commerce solutions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimization',
            description: 'Boost your search rankings and drive organic traffic to your website.',
          },
        },
      ],
    },
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'WebsitesForMorons.com',
    description: 'Professional web design services for small businesses',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },

  faq: (faqs: FAQ[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),

  service: (service: { name: string; description: string; price: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Design',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    offers: {
      '@type': 'Offer',
      price: service.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  article: (article: {
    title: string;
    description: string;
    image: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  }),

  review: (review: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.text,
    datePublished: review.date,
    itemReviewed: {
      '@id': `${siteUrl}/#organization`,
    },
  }),
};

export function generateStructuredData(type: keyof typeof jsonLd, data?: unknown): string {
  const schema = typeof jsonLd[type] === 'function'
    ? (jsonLd[type] as (d: unknown) => object)(data)
    : jsonLd[type];
  return JSON.stringify(schema);
}
