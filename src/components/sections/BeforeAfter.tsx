'use client';

import { motion } from 'framer-motion';
import { Star, AlertTriangle, Zap, Smartphone, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CompareSlider } from '@/components/ui/CompareSlider';
import { cn } from '@/lib/utils';

// Before website mockup - ugly outdated design
function BeforeWebsite() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Header label */}
      <div className="text-xs text-red-400 font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
        <AlertTriangle className="w-3 h-3" />
        Before
      </div>

      {/* Outdated navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-gray-600 h-6 w-24 rounded" />
        <div className="hidden sm:flex gap-3">
          <div className="bg-gray-600 h-5 w-14 rounded" />
          <div className="bg-gray-600 h-5 w-14 rounded" />
          <div className="bg-gray-600 h-5 w-14 rounded" />
        </div>
      </div>

      {/* Ugly hero section */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded p-4 sm:p-6 mb-4 flex-1 flex flex-col justify-center">
        <div className="space-y-3">
          <div className="bg-gray-700 h-6 sm:h-8 w-4/5 rounded" />
          <div className="bg-gray-700 h-4 w-full rounded" />
          <div className="bg-gray-700 h-4 w-3/4 rounded" />
          <div className="bg-gray-500 h-8 sm:h-10 w-28 sm:w-32 rounded mt-4" />
        </div>
      </div>

      {/* Boxy content blocks */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-600 h-16 sm:h-20 rounded" />
        <div className="bg-gray-600 h-16 sm:h-20 rounded" />
        <div className="bg-gray-600 h-16 sm:h-20 rounded" />
      </div>

      {/* Warning indicators */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-red-400 text-[10px] sm:text-xs mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Slow Load</span>
        </div>
        <div className="flex items-center gap-1">
          <Smartphone className="w-3 h-3" />
          <span>Not Mobile</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          <span>Poor UX</span>
        </div>
      </div>
    </div>
  );
}

// After website mockup - modern professional design
function AfterWebsite() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Header label */}
      <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
        <CheckCircle className="w-3 h-3" />
        After
      </div>

      {/* Modern navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-6 w-24 rounded-lg" />
        <div className="hidden sm:flex items-center gap-3">
          <div className="bg-white/10 h-5 w-14 rounded-lg" />
          <div className="bg-white/10 h-5 w-14 rounded-lg" />
          <div className="bg-cyan-500 h-5 w-20 rounded-lg" />
        </div>
      </div>

      {/* Modern hero section */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-orange-500/10 rounded-xl p-4 sm:p-6 mb-4 border border-cyan-500/20 flex-1 flex flex-col justify-center">
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-white to-white/80 h-6 sm:h-8 w-4/5 rounded-lg" />
          <div className="bg-white/20 h-4 w-full rounded-lg" />
          <div className="bg-white/20 h-4 w-3/4 rounded-lg" />
          <div className="flex gap-2 mt-4">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-8 sm:h-10 w-28 sm:w-32 rounded-lg" />
            <div className="bg-white/10 h-8 sm:h-10 w-24 sm:w-28 rounded-lg border border-white/20" />
          </div>
        </div>
      </div>

      {/* Modern feature cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gradient-to-br from-cyan-500/20 to-transparent h-16 sm:h-20 rounded-xl border border-cyan-500/20" />
        <div className="bg-gradient-to-br from-orange-500/20 to-transparent h-16 sm:h-20 rounded-xl border border-orange-500/20" />
        <div className="bg-gradient-to-br from-cyan-500/20 to-transparent h-16 sm:h-20 rounded-xl border border-cyan-500/20" />
      </div>

      {/* Success indicators */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-cyan-400 text-[10px] sm:text-xs mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>Fast Load</span>
        </div>
        <div className="flex items-center gap-1">
          <Smartphone className="w-3 h-3" />
          <span>Mobile First</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>High Converting</span>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const mousePosition = useMousePosition();

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Transformation"
          title="See the Difference We Make"
          titleGradient="Difference"
          description="Drag the slider to see how we transform outdated websites into modern, high-converting experiences."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative max-w-4xl mx-auto perspective-2000"
        >
          <div
            className={cn(
              'relative transform-gpu',
              !prefersReducedMotion && 'hover:scale-[1.02] transition-transform duration-500'
            )}
            style={{
              transform: isDesktop && !prefersReducedMotion
                ? `rotateY(${(mousePosition.normalizedX - 0.5) * 5}deg) rotateX(${(mousePosition.normalizedY - 0.5) * -5}deg)`
                : undefined,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Glow effect behind mockup */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-transparent to-orange-500/20 rounded-3xl blur-2xl opacity-60" />

            {/* Browser Mockup with Interactive Slider */}
            <div className="relative bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800/80 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-neutral-700/50 rounded-lg px-4 py-1.5 text-xs text-white/40 text-center">
                    yourwebsite.com
                  </div>
                </div>
              </div>

              {/* Interactive Compare Slider */}
              <div className="aspect-[16/10]">
                <CompareSlider
                  before={<BeforeWebsite />}
                  after={<AfterWebsite />}
                  initialPosition={50}
                />
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? {
                opacity: 1,
                scale: 1,
                y: !prefersReducedMotion ? [0, -10, 0] : 0
              } : {}}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.4, 0, 0.2, 1],
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl p-3 sm:p-4 shadow-glow shadow-cyan-500/50"
            >
              <div className="text-black font-bold text-xl sm:text-2xl">+340%</div>
              <div className="text-black/60 text-xs">Traffic Increase</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? {
                opacity: 1,
                scale: 1,
                y: !prefersReducedMotion ? [0, 10, 0] : 0
              } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.4, 0, 0.2, 1],
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-neutral-900/90 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-base">4.9/5 Rating</div>
                  <div className="text-white/50 text-xs">2,500+ Reviews</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Instruction text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-white/40 text-sm mt-6"
        >
          Drag the slider left and right to compare
        </motion.p>
      </div>
    </section>
  );
}
