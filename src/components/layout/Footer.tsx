'use client';

import Link from 'next/link';
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const footerLinks = {
  services: [
    { label: 'Website Redesign', href: '/services#redesign' },
    { label: 'E-Commerce', href: '/services#ecommerce' },
    { label: 'UI/UX Design', href: '/services#design' },
    { label: 'Development', href: '/services#development' },
    { label: 'SEO', href: '/services#seo' },
    { label: 'Maintenance', href: '/services#maintenance' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Case Studies', href: '/portfolio' },
    { label: 'Web Design Tips', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/websitesformorons', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/websitesformorons', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/websitesformorons', label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com/websitesformorons', label: 'Instagram' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/5">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Stay ahead of the <GradientText>curve</GradientText>
              </h3>
              <p className="text-white/60">
                Get the latest web design trends, tips, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                variant="pill"
                inputSize="lg"
                className="flex-1"
              />
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center font-bold text-black text-lg">
                W
              </div>
              <span className="text-lg font-bold text-white">
                Websites<span className="text-cyan-500">For</span>
                <span className="text-orange-500">Morons</span>
              </span>
            </Link>
            <p className="text-white/60 mb-6 max-w-xs">
              Transforming outdated websites into modern, high-converting digital experiences since 2004.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@websitesformorons.com"
                  className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  hello@wfm.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (555) 123-4567
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    900 Nicollet Mall<br />
                    Minneapolis, MN 55403
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-white/40">
            <span>&copy; {currentYear} WebsitesForMorons.com. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>in Minneapolis</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'fixed bottom-8 right-8 z-50',
          'w-12 h-12 rounded-full',
          'bg-cyan-500 text-black',
          'flex items-center justify-center',
          'shadow-glow shadow-cyan-500/50',
          'hover:scale-110 hover:shadow-glow-lg',
          'transition-all duration-300',
          'opacity-0 pointer-events-none',
          'group'
        )}
        style={{
          opacity: typeof window !== 'undefined' && window.scrollY > 500 ? 1 : 0,
          pointerEvents: typeof window !== 'undefined' && window.scrollY > 500 ? 'auto' : 'none',
        }}
        aria-label="Back to top"
      >
        <ArrowUpRight className="w-5 h-5 rotate-[-45deg] group-hover:translate-y-[-2px] transition-transform" />
      </button>
    </footer>
  );
}
