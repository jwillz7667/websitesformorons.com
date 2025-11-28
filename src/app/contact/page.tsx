'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@websitesformorons.com',
    href: 'mailto:hello@websitesformorons.com',
    description: 'Drop us a line anytime',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '(555) 123-4567',
    href: 'tel:+15551234567',
    description: 'Mon-Fri, 9am-6pm PST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '900 Nicollet Mall, Minneapolis, MN 55403',
    href: 'https://maps.google.com/?q=900+Nicollet+Mall+Minneapolis+MN+55403',
    description: 'By appointment only',
  },
];

const benefits = [
  { icon: Clock, text: 'Same-day response guaranteed' },
  { icon: MessageSquare, text: 'Free consultation call' },
  { icon: Calendar, text: 'No-obligation quote' },
];

const budgetOptions = [
  { value: 'under-2500', label: 'Under $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: 'over-10000', label: '$10,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const serviceOptions = [
  { value: 'redesign', label: 'Website Redesign' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'development', label: 'Custom Development' },
  { value: 'seo', label: 'SEO & Marketing' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '', // Hidden field for spam detection
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        website: '',
        service: '',
        budget: '',
        message: '',
        honeypot: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Message Sent Successfully!
          </h1>
          <p className="text-white/60 mb-8">
            Thanks for reaching out! We'll get back to you within 24 hours
            (usually much sooner).
          </p>
          <Button variant="primary" onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            Contact Us
          </Badge>
          <h1 className="text-display-lg sm:text-display-xl font-bold text-white mb-6">
            Let's Build Something{' '}
            <GradientText>Amazing</GradientText>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Ready to transform your website? Get in touch and let's discuss
            how we can help your business grow online.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-white/60">
                  Have a project in mind? We'd love to hear about it. Fill out
                  the form or reach out directly.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <method.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {method.title}
                      </div>
                      <div className="text-white/80">{method.value}</div>
                      <div className="text-sm text-white/40">{method.description}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Benefits */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-3 text-white/60">
                      <benefit.icon className="w-5 h-5 text-cyan-500" />
                      {benefit.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card variant="glass" padding="lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users, catches bots */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
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
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      name="name"
                      label="Your Name *"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email Address *"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Company & Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      name="company"
                      label="Company Name"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <Input
                      name="phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Current Website */}
                  <Input
                    name="website"
                    type="url"
                    label="Current Website (if any)"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleChange}
                  />

                  {/* Service & Budget */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/80">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                      >
                        <option value="" className="bg-neutral-900">Select a service</option>
                        {serviceOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-neutral-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/80">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                      >
                        <option value="" className="bg-neutral-900">Select budget</option>
                        {budgetOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-neutral-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <Textarea
                    name="message"
                    label="Tell Us About Your Project *"
                    placeholder="Describe your project, goals, and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    Send Message
                  </Button>

                  <p className="text-sm text-white/40 text-center">
                    We'll respond within 24 hours. Usually much sooner!
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
