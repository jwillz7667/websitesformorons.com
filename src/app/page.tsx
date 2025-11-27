import { Hero, Stats, Services, Process, Pricing, Testimonials, CTA } from '@/components/sections';
import { jsonLd } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.website) }}
      />

      {/* Page Sections */}
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
