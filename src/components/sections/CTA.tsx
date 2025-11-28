'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GradientText } from '@/components/ui/GradientText';

const benefits = [
  'Free website audit',
  'Custom strategy session',
  'No-obligation quote',
  'Same-day response',
];

export function CTA() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'cta',
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 dark:via-neutral-950 via-white to-orange-500/10" />
        <div className="absolute inset-0 mesh-gradient opacity-50" />

        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border dark:border-white/10 border-neutral-200"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium dark:text-white/80 text-neutral-700">
              Limited Time: Free Website Audit
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md sm:text-display-lg lg:text-display-xl font-bold dark:text-white text-neutral-900 mb-6"
          >
            Ready to <GradientText>Transform</GradientText> Your Website?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl dark:text-white/60 text-neutral-600 mb-10 max-w-2xl mx-auto"
          >
            Get a free website audit and discover exactly what&apos;s holding your site back.
            No commitment, no sales pitch - just actionable insights.
          </motion.p>

          {/* Email form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mb-10"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mb-4 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="pill"
                inputSize="lg"
                className="flex-1"
                required
                disabled={isSubmitting || isSubmitted}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={
                  isSubmitted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )
                }
                className="whitespace-nowrap"
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Check Your Inbox!' : 'Get Free Audit'}
              </Button>
            </div>
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm dark:text-white/50 text-neutral-500"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {benefit}
              </div>
            ))}
          </motion.div>

          {/* Alternative CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t dark:border-white/5 border-neutral-200"
          >
            <p className="dark:text-white/40 text-neutral-500 mb-4">
              Prefer to talk to a human?
            </p>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/contact">
                Schedule a Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
