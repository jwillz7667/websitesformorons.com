'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { processSteps } from '@/data/process';
import { cn } from '@/lib/utils';

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background - matches rest of page */}
      <div className="absolute inset-0 dark:bg-neutral-950 bg-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Process"
          title="From Embarrassing to Extraordinary"
          titleGradient="Extraordinary"
          description="Our proven 5-step process ensures your website transformation is smooth, efficient, and exceeds expectations."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Steps list */}
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    'w-full text-left p-6 rounded-2xl transition-all duration-300',
                    'border border-transparent',
                    activeStep === index
                      ? 'bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border-cyan-500/30'
                      : 'hover:bg-white/5 dark:hover:bg-white/5 hover:bg-neutral-100'
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number */}
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                        'font-bold text-lg transition-all duration-300',
                        activeStep === index
                          ? 'bg-gradient-to-br from-cyan-500 to-cyan-400 text-black'
                          : 'dark:bg-white/5 bg-neutral-100 dark:text-white/40 text-neutral-400'
                      )}
                    >
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3
                          className={cn(
                            'text-lg font-bold transition-colors duration-300',
                            activeStep === index
                              ? 'dark:text-white text-neutral-900'
                              : 'dark:text-white/60 text-neutral-600'
                          )}
                        >
                          {step.title}
                        </h3>
                        <ChevronRight
                          className={cn(
                            'w-5 h-5 transition-all duration-300',
                            activeStep === index
                              ? 'text-cyan-400 rotate-90'
                              : 'dark:text-white/20 text-neutral-300'
                          )}
                        />
                      </div>
                      <p
                        className={cn(
                          'text-sm mt-1 transition-colors duration-300',
                          activeStep === index
                            ? 'dark:text-white/60 text-neutral-600'
                            : 'dark:text-white/40 text-neutral-500'
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="ml-10 h-4 border-l-2 border-dashed dark:border-white/10 border-neutral-200" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Active step details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:sticky lg:top-32"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] from-neutral-50 to-neutral-100/50 backdrop-blur-xl rounded-3xl dark:border-white/10 border-neutral-200 p-8 lg:p-10"
              >
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                  {(() => {
                    const Icon = processSteps[activeStep].icon;
                    return <Icon className="w-10 h-10 text-cyan-400" />;
                  })()}
                </div>

                {/* Title */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-cyan-500 font-mono text-sm">
                    Step {processSteps[activeStep].number}
                  </span>
                  <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white text-neutral-900 mb-4">
                  {processSteps[activeStep].title}
                </h3>

                {/* Description */}
                <p className="dark:text-white/60 text-neutral-600 mb-8 leading-relaxed">
                  {processSteps[activeStep].description}
                </p>

                {/* Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold dark:text-white/80 text-neutral-700 uppercase tracking-wider">
                    What's Included
                  </h4>
                  {processSteps[activeStep].details?.map((detail, index) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 dark:text-white/50 text-neutral-600"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" />
                      {detail}
                    </motion.div>
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-8 pt-6 dark:border-white/10 border-neutral-200 border-t">
                  <div className="flex items-center justify-between text-sm dark:text-white/40 text-neutral-500 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((activeStep + 1) / processSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 dark:bg-white/5 bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
