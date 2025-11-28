'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

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
          description="We don't just redesign websites—we transform your entire digital presence. See how we turn outdated sites into modern, high-converting experiences."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
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

            {/* Before/After Browser Mockup */}
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

              {/* Content area - Before/After split */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Before side */}
                <div className="absolute inset-0 w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="text-xs text-red-400 font-mono uppercase tracking-wider">Before</div>
                    {/* Ugly website mockup */}
                    <div className="bg-gray-700 h-8 w-3/4 rounded" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-600 h-16 sm:h-20 rounded" />
                      <div className="bg-gray-600 h-16 sm:h-20 rounded" />
                      <div className="bg-gray-600 h-16 sm:h-20 rounded" />
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

                {/* After side */}
                <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 border-l border-cyan-500/30">
                  <div className="space-y-4">
                    <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider">After</div>
                    {/* Modern website mockup */}
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-8 w-2/3 rounded-lg" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-transparent h-16 sm:h-20 rounded-lg border border-cyan-500/20" />
                      <div className="bg-gradient-to-br from-orange-500/20 to-transparent h-16 sm:h-20 rounded-lg border border-orange-500/20" />
                      <div className="bg-gradient-to-br from-cyan-500/20 to-transparent h-16 sm:h-20 rounded-lg border border-cyan-500/20" />
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

                {/* Center divider with drag handle */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-cyan-400 to-orange-500 -translate-x-1/2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-glow shadow-cyan-500/50">
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-4 bg-cyan-400 rounded" />
                      <div className="w-0.5 h-4 bg-cyan-400 rounded" />
                    </div>
                  </div>
                </div>
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
      </div>
    </section>
  );
}
