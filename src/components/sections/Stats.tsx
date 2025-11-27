'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { statsData } from '@/data/stats';

export function Stats() {
  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon */}
              {stat.icon && (
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border border-white/5 mb-4 group-hover:border-cyan-500/30 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
              )}

              {/* Value */}
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.prefix}
                <AnimatedCounter
                  end={stat.value}
                  duration={2000}
                  delay={index * 100}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
                {stat.suffix}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-white/60 mb-1">
                {stat.label}
              </div>

              {/* Description */}
              {stat.description && (
                <div className="text-xs text-white/40 hidden sm:block">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
    </section>
  );
}
