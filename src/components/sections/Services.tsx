'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/services';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Services() {
  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dark:bg-neutral-950 bg-white">
        <div className="absolute inset-0 dot-pattern dark:opacity-30 opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Services"
          title="Everything You Need to Succeed Online"
          titleGradient="Succeed Online"
          description="From redesigns to maintenance, we've got you covered with comprehensive web solutions tailored for small businesses."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesData.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card
                variant="glass"
                padding="lg"
                hover="glow"
                className="h-full flex flex-col group"
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center',
                      'bg-gradient-to-br',
                      service.gradient,
                      'shadow-lg'
                    )}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  {service.popular && (
                    <Badge variant="primary" size="sm">
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="dark:text-white/60 text-neutral-600 mb-6 flex-grow">
                  {service.shortDescription || service.description}
                </p>

                {/* Features preview */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm dark:text-white/50 text-neutral-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-cyan-400">
                      +{service.features.length - 3} more features
                    </li>
                  )}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t dark:border-white/10 border-neutral-200 mt-auto">
                  <div>
                    <div className="text-lg font-bold dark:text-white text-neutral-900">{service.price}</div>
                    {service.priceNote && (
                      <div className="text-xs dark:text-white/40 text-neutral-500">{service.priceNote}</div>
                    )}
                  </div>
                  <Link
                    href={`/services#${service.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="dark:text-white/60 text-neutral-600 mb-6">
            Not sure which service is right for you?
          </p>
          <Button
            variant="secondary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            asChild
          >
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
