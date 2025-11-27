'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { pricingPlans } from '@/data/pricing';
import { cn, formatCurrency } from '@/lib/utils';

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const savings = Math.round(
    ((pricingPlans[1].monthlyPrice - pricingPlans[1].yearlyPrice) /
      pricingPlans[1].monthlyPrice) *
      100
  );

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          title="Transparent Pricing, No Surprises"
          titleGradient="No Surprises"
          description="Choose the plan that fits your needs. All plans include our satisfaction guarantee."
        />

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              !isYearly ? 'text-white' : 'text-white/50'
            )}
          >
            One-time
          </span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            className={cn(
              'relative w-16 h-8 rounded-full transition-colors duration-300',
              isYearly ? 'bg-cyan-500' : 'bg-white/20'
            )}
            aria-label="Toggle yearly billing"
          >
            <motion.div
              className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
              animate={{ left: isYearly ? '34px' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <span
            className={cn(
              'text-sm font-medium transition-colors flex items-center gap-2',
              isYearly ? 'text-white' : 'text-white/50'
            )}
          >
            Yearly
            <Badge variant="success" size="xs">
              Save {savings}%
            </Badge>
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={cn(
                'relative',
                plan.popular && 'lg:-mt-4 lg:mb-[-1rem]'
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="gradient" size="md" className="shadow-glow shadow-cyan-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                variant={plan.popular ? 'gradient' : 'glass'}
                padding="none"
                hover="lift"
                className={cn(
                  'h-full flex flex-col',
                  plan.popular && 'border-cyan-500/50 shadow-glow shadow-cyan-500/20'
                )}
              >
                {/* Header */}
                <div
                  className={cn(
                    'p-8 border-b border-white/10',
                    plan.popular && 'bg-gradient-to-r from-cyan-500/10 to-orange-500/10'
                  )}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {formatCurrency(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                    </span>
                    <span className="text-white/50 text-sm">
                      {isYearly ? '/project' : '/project'}
                    </span>
                  </div>

                  {isYearly && (
                    <p className="text-cyan-400 text-sm mt-2">
                      Save {formatCurrency(plan.monthlyPrice - plan.yearlyPrice)}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="p-8 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={cn(
                          'flex items-start gap-3 text-sm',
                          feature.included ? 'text-white/70' : 'text-white/30'
                        )}
                      >
                        {feature.included ? (
                          <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-white/20 shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-8 pt-0">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-white/40 text-sm mt-12"
        >
          Need a custom solution?{' '}
          <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
            Contact us
          </Link>{' '}
          for a personalized quote.
        </motion.p>
      </div>
    </section>
  );
}
