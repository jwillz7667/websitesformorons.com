import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { CTA } from '@/components/sections/CTA';
import { servicesData, serviceFeatures } from '@/data/services';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Web Design Services',
  description:
    'Professional website redesign, e-commerce, SEO, and maintenance services. Transform your online presence with our comprehensive web solutions.',
  openGraph: {
    title: 'Web Design Services | WebsitesForMorons.com',
    description:
      'Professional website redesign, e-commerce, SEO, and maintenance services.',
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            Our Services
          </Badge>
          <h1 className="text-display-lg sm:text-display-xl font-bold text-white mb-6">
            Web Design Services That{' '}
            <GradientText>Actually Work</GradientText>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            From complete redesigns to ongoing maintenance, we offer everything
            you need to succeed online. No fluff, just results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={cn(
                  'scroll-mt-32 grid lg:grid-cols-2 gap-12 items-center',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center',
                        'bg-gradient-to-br',
                        service.gradient
                      )}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    {service.popular && (
                      <Badge variant="primary">Most Popular</Badge>
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-white/60 mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-white/70">
                        <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">{service.price}</div>
                      {service.priceNote && (
                        <div className="text-sm text-white/40">{service.priceNote}</div>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      asChild
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card variant="glass" padding="lg" className="relative overflow-hidden">
                    {/* Decorative gradient */}
                    <div
                      className={cn(
                        'absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20',
                        `bg-gradient-to-br ${service.gradient}`
                      )}
                    />

                    {/* Placeholder for service illustration */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent rounded-xl flex items-center justify-center">
                      <service.icon className="w-24 h-24 text-white/20" />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="What's Included"
            title="Every Project Includes"
            titleGradient="Includes"
            description="Regardless of which service you choose, you'll get these essential features built into every project."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceFeatures.map((feature) => (
              <Card key={feature.title} variant="glass" padding="lg" hover="glow">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
}
