'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Star, Smartphone, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { quickStats } from '@/data/stats';

// Modern website mockup
function ModernWebsite() {
  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
      {/* Browser chrome */}
      <div className="bg-neutral-900 px-3 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-neutral-950 rounded px-2 py-0.5 text-[8px] text-gray-400 ml-2 flex items-center gap-1">
          <div className="w-2 h-2 text-green-500">🔒</div>
          newwebsite.com
        </div>
      </div>

      {/* Webpage content */}
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
        {/* Modern header */}
        <div className="backdrop-blur-xl bg-neutral-950/80 border-b border-white/5 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-[10px] font-bold">A</div>
              </div>
              <span className="text-white text-xs font-semibold">Acme</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[9px]">
              <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Services</span>
              <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Portfolio</span>
              <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-3 py-1 rounded-md font-medium cursor-pointer">Contact</span>
            </div>
          </div>
        </div>

        {/* Hero section */}
        <div className="px-4 pt-6 pb-8 relative">
          {/* Gradient orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>

          <div className="relative text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 mb-3">
              <Star className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400" />
              <span className="text-cyan-400 text-[8px] font-medium">Industry Leading</span>
            </div>
            <h1 className="text-white text-lg sm:text-xl font-bold mb-2 leading-tight">
              Transform Your Business
            </h1>
            <p className="text-white/60 text-[10px] sm:text-xs max-w-md mx-auto leading-relaxed">
              Cutting-edge solutions designed to accelerate growth and maximize ROI
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-[9px] sm:text-[10px] font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-cyan-500/25">
                Get Started
              </button>
              <button className="border border-white/20 hover:bg-white/5 text-white text-[9px] sm:text-[10px] font-medium px-4 py-2 rounded-lg transition-all backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-1.5 border border-cyan-500/20">
                <Zap className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="text-white text-[8px] sm:text-[9px] font-semibold mb-0.5">Fast</div>
              <div className="text-white/40 text-[7px]">Lightning speed</div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center mb-1.5 border border-orange-500/20">
                <CheckCircle className="w-3 h-3 text-orange-400" />
              </div>
              <div className="text-white text-[8px] sm:text-[9px] font-semibold mb-0.5">Secure</div>
              <div className="text-white/40 text-[7px]">Bank-grade SSL</div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-1.5 border border-cyan-500/20">
                <Smartphone className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="text-white text-[8px] sm:text-[9px] font-semibold mb-0.5">Mobile</div>
              <div className="text-white/40 text-[7px]">Fully responsive</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom success bar */}
      <div className="bg-cyan-950/40 border-t border-cyan-500/20 px-3 py-1.5 flex items-center gap-3 text-cyan-400">
        <CheckCircle className="w-3 h-3 flex-shrink-0" />
        <div className="text-[8px] sm:text-[9px] flex-1">2.1s Load • Mobile First • SEO Optimized</div>
      </div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background - Dark gradient with orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
        {/* Gradient orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)',
            left: '20%',
            top: '20%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)',
            right: '20%',
            bottom: '20%',
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center lg:text-left order-2 lg:order-1"
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Website is Losing You Money
              <br />
              <GradientText className="inline">We Can Fix It.</GradientText>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Transform your embarrassing legacy website into a{' '}
              <span className="text-white font-semibold">stunning, high-converting</span> digital
              experience. Professional redesigns starting at{' '}
              <span className="text-cyan-400 font-bold">$2,499</span>.
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/60">
              {[
                'No Contracts',
                '14-Day Delivery',
                '100% Satisfaction',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Website Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-transparent to-orange-500/20 rounded-3xl blur-3xl opacity-60" />

              {/* Modern Website Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={cn(
                  'transform-gpu relative',
                  !prefersReducedMotion && 'hover:scale-[1.02] transition-transform duration-500'
                )}
              >
                <div className="aspect-[4/3] max-w-2xl mx-auto">
                  <ModernWebsite />
                </div>
              </motion.div>

              {/* Floating stat badge */}
              <motion.div
                animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl p-4 shadow-2xl shadow-cyan-500/50 z-10"
              >
                <div className="text-black font-bold text-2xl">+287%</div>
                <div className="text-black/70 text-xs font-semibold">Conversions</div>
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
