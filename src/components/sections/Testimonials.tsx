'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { testimonialsData } from '@/data/testimonials';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const goToSlide = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  }, []);

  // Auto-play
  useEffect(() => {
    if (prefersReducedMotion || !isIntersecting) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, prefersReducedMotion, isIntersecting]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background - matches rest of page */}
      <div className="absolute inset-0 dark:bg-neutral-950 bg-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Don't Just Take Our Word for It"
          titleGradient="Our Word"
          description="Hear from the small business owners who've transformed their online presence with us."
        />

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center">
              <Quote className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] from-neutral-50 to-neutral-100/50 backdrop-blur-xl rounded-3xl dark:border-white/10 border-neutral-200 p-8 lg:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonialsData[activeIndex].rating
                            ? 'text-orange-400 fill-orange-400'
                            : 'text-white/20'
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl dark:text-white/90 text-neutral-800 leading-relaxed mb-8">
                    &ldquo;{testimonialsData[activeIndex].text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                      {testimonialsData[activeIndex].author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold dark:text-white text-neutral-900">
                        {testimonialsData[activeIndex].author}
                      </div>
                      <div className="dark:text-white/50 text-neutral-600 text-sm">
                        {testimonialsData[activeIndex].role},{' '}
                        {testimonialsData[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full dark:bg-white/5 bg-neutral-100 dark:hover:bg-white/10 hover:bg-neutral-200 dark:border-white/10 border-neutral-200 flex items-center justify-center dark:text-white/60 text-neutral-600 dark:hover:text-white hover:text-neutral-900 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    activeIndex === index
                      ? 'w-8 bg-cyan-500'
                      : 'w-2 dark:bg-white/20 bg-neutral-300 dark:hover:bg-white/40 hover:bg-neutral-400'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full dark:bg-white/5 bg-neutral-100 dark:hover:bg-white/10 hover:bg-neutral-200 dark:border-white/10 border-neutral-200 flex items-center justify-center dark:text-white/60 text-neutral-600 dark:hover:text-white hover:text-neutral-900 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial thumbnails */}
          <div className="hidden lg:flex justify-center gap-4 mt-8">
            {testimonialsData.slice(0, 5).map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold',
                  activeIndex === index
                    ? 'border-cyan-500 bg-gradient-to-br from-cyan-500 to-orange-500 text-white scale-110'
                    : 'dark:border-white/10 border-neutral-200 dark:bg-white/5 bg-neutral-100 dark:text-white/40 text-neutral-500 dark:hover:border-white/30 hover:border-neutral-300'
                )}
              >
                {testimonial.author.charAt(0)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
