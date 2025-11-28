'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { quickStats } from '@/data/stats';
import { CompareSlider } from '@/components/ui/CompareSlider';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // More gradual parallax - only starts fading at 70% scroll, completes at 100%
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 dark:bg-neutral-950 bg-white">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern dark:opacity-30 opacity-10" />

        {/* Gradient orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] dark:opacity-20 opacity-10 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            left: '30%',
            top: '30%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 transition-all duration-1000 ease-out delay-100"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
            right: '30%',
            bottom: '30%',
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex mb-6"
            >
              <Badge variant="glow" size="md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Rated 4.9/5 by 2,500+ clients</span>
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl font-bold dark:text-white text-neutral-900 mb-6">
              Your Website{' '}
              <span className="relative">
                <span className="relative z-10">Sucks</span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-cyan-500/30 to-orange-500/30 -rotate-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </span>
              <br />
              <GradientText className="inline">We Can Fix It.</GradientText>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl dark:text-white/60 text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Transform your embarrassing legacy website into a{' '}
              <span className="dark:text-white text-neutral-900 font-bold">stunning, high-converting</span> digital
              experience. Professional redesigns starting at{' '}
              <span className="text-cyan-500 font-semibold">$2,499</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link href="/contact">Get Free Quote</Link>
              </Button>
              <Button
                variant="secondary"
                size="xl"
                leftIcon={<Play className="w-5 h-5 fill-current" />}
                asChild
              >
                <Link href="/portfolio">See Our Work</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm dark:text-white/50 text-neutral-500">
              {[
                'No Contracts',
                '14-Day Delivery',
                '100% Satisfaction',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div
              className={cn(
                'relative transform-gpu',
                !prefersReducedMotion && 'hover:scale-[1.02] transition-transform duration-500'
              )}
            >
              {/* Glow effect behind mockup */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-transparent to-orange-500/20 rounded-3xl blur-2xl opacity-60" />

              {/* Before/After Browser Mockup */}
              <div className="relative dark:bg-neutral-900/80 bg-neutral-100/80 backdrop-blur-xl rounded-2xl border dark:border-white/10 border-neutral-200 overflow-hidden shadow-2xl dark:shadow-black/50 shadow-neutral-500/20">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 dark:bg-neutral-800/80 bg-neutral-200/80 border-b dark:border-white/5 border-neutral-300">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="dark:bg-neutral-700/50 bg-neutral-300/50 rounded-lg px-4 py-1.5 text-xs dark:text-white/40 text-neutral-500 text-center">
                      yourwebsite.com
                    </div>
                  </div>
                </div>

                {/* Content area - Before/After split */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CompareSlider
                    before={
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                        <div className="space-y-4">
                          <div className="text-xs text-red-400 font-mono uppercase tracking-wider">Before</div>
                          {/* Ugly website mockup */}
                          <div className="bg-gray-700 h-8 w-3/4 rounded" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-600 h-16 rounded" />
                            <div className="bg-gray-600 h-16 rounded" />
                            <div className="bg-gray-600 h-16 rounded" />
                          </div>
                          <div className="bg-gray-700 h-4 w-full rounded" />
                          <div className="bg-gray-700 h-4 w-5/6 rounded" />
                          <div className="bg-gray-700 h-4 w-4/6 rounded" />
                          {/* Warning icon */}
                          <div className="flex items-center gap-2 text-red-400 text-xs mt-4">
                            <span>⚠️ Outdated Design</span>
                          </div>
                        </div>
                      </div>
                    }
                    after={
                      <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 border-l border-cyan-500/30">
                        <div className="space-y-4">
                          <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider">After</div>
                          {/* Modern website mockup */}
                          <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-8 w-2/3 rounded-lg" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gradient-to-br from-cyan-500/20 to-transparent h-16 rounded-lg border border-cyan-500/20" />
                            <div className="bg-gradient-to-br from-orange-500/20 to-transparent h-16 rounded-lg border border-orange-500/20" />
                            <div className="bg-gradient-to-br from-cyan-500/20 to-transparent h-16 rounded-lg border border-cyan-500/20" />
                          </div>
                          <div className="bg-white/10 h-4 w-full rounded-lg" />
                          <div className="bg-white/10 h-4 w-5/6 rounded-lg" />
                          <div className="bg-white/10 h-4 w-4/6 rounded-lg" />
                          {/* Success indicator */}
                          <div className="flex items-center gap-2 text-cyan-400 text-xs mt-4">
                            <span>✨ Modern & Converting</span>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl p-4 shadow-glow shadow-cyan-500/50"
              >
                <div className="text-black font-bold text-2xl">+340%</div>
                <div className="text-black/60 text-xs">Traffic Increase</div>
              </motion.div>

              <motion.div
                animate={!prefersReducedMotion ? { y: [0, 10, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 dark:bg-neutral-900/90 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border dark:border-white/10 border-neutral-200 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="dark:text-white text-neutral-900 font-bold">4.9/5 Rating</div>
                    <div className="dark:text-white/50 text-neutral-500 text-xs">2,500+ Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 pt-10 border-t dark:border-white/5 border-neutral-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm dark:text-white/50 text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 dark:border-white/20 border-neutral-300 flex justify-center p-2"
        >
          <motion.div
            animate={{ height: ['20%', '60%', '20%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 bg-cyan-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
