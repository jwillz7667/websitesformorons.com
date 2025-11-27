'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { quickStats } from '@/data/stats';
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

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
        <div className="flex flex-col items-center justify-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-4xl"
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
            <p className="text-lg sm:text-xl dark:text-white/60 text-neutral-600 mb-8 max-w-2xl mx-auto">
              Transform your embarrassing legacy website into a{' '}
              <span className="dark:text-white text-neutral-900 font-bold">stunning, high-converting</span> digital
              experience. Professional redesigns starting at{' '}
              <span className="text-cyan-500 font-semibold">$2,499</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm dark:text-white/50 text-neutral-500">
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
