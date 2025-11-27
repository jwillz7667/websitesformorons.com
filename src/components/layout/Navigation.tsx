'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Zap,
  Palette,
  Code,
  Megaphone,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';

const navItems = [
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Website Redesign',
        href: '/services#redesign',
        description: 'Transform your outdated site',
        icon: Sparkles,
      },
      {
        label: 'E-Commerce',
        href: '/services#ecommerce',
        description: 'Sell online with style',
        icon: Zap,
      },
      {
        label: 'UI/UX Design',
        href: '/services#design',
        description: 'Beautiful, intuitive interfaces',
        icon: Palette,
      },
      {
        label: 'Development',
        href: '/services#development',
        description: 'Custom web applications',
        icon: Code,
      },
      {
        label: 'SEO & Marketing',
        href: '/services#seo',
        description: 'Get found online',
        icon: Megaphone,
      },
      {
        label: 'Maintenance',
        href: '/services#maintenance',
        description: 'Keep your site running smoothly',
        icon: Settings,
      },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const { scrollY, scrollDirection, isAtTop } = useScrollPosition();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isHidden = scrollDirection === 'down' && scrollY > 100 && !isMobileMenuOpen;
  const isScrolled = !isAtTop;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'dark:bg-neutral-950/80 bg-white/80 backdrop-blur-xl dark:border-white/5 border-neutral-200 border-b'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center font-bold text-black text-lg shadow-glow shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                  W
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold dark:text-white text-neutral-900 tracking-tight">
                  Websites
                  <span className="text-cyan-500">For</span>
                  <span className="text-orange-500">Morons</span>
                </span>
                <span className="text-2xs dark:text-white/40 text-neutral-500 uppercase tracking-widest hidden sm:block">
                  Web Design Agency
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-cyan-400'
                        : 'dark:text-white/70 text-neutral-600 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-neutral-100'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-300',
                          activeDropdown === item.label && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl dark:bg-neutral-900/95 bg-white/95 backdrop-blur-xl dark:border-white/10 border-neutral-200 dark:shadow-black/50 shadow-neutral-300/50 shadow-2xl"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 dark:hover:bg-white/5 hover:bg-neutral-100 group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center shrink-0 group-hover:from-cyan-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                                <child.icon className="w-5 h-5 text-cyan-400" />
                              </div>
                              <div>
                                <div className="font-medium dark:text-white text-neutral-900 group-hover:text-cyan-400 transition-colors">
                                  {child.label}
                                </div>
                                <div className="text-sm dark:text-white/50 text-neutral-600">
                                  {child.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Toggle + CTA + Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle Button - only show when mounted */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className={cn(
                    'relative p-2 rounded-lg transition-all duration-300',
                    'dark:text-white/70 text-neutral-600',
                    'dark:hover:text-white hover:text-neutral-900',
                    'dark:hover:bg-white/10 hover:bg-neutral-100'
                  )}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <Sun className={cn(
                    'w-5 h-5 absolute inset-0 m-auto transition-all duration-300',
                    isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  )} />
                  <Moon className={cn(
                    'w-5 h-5 transition-all duration-300',
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  )} />
                </button>
              )}

              <Button
                variant="primary"
                size="sm"
                className="hidden sm:flex"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                asChild
              >
                <Link href="/contact">Get Started</Link>
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-10 p-2 rounded-lg dark:text-white text-neutral-900 dark:hover:bg-white/10 hover:bg-neutral-100 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 dark:bg-neutral-950/95 bg-white/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm dark:bg-neutral-900 bg-white dark:border-white/10 border-neutral-200 border-l overflow-y-auto"
            >
              <div className="p-6 pt-24">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300',
                          pathname === item.href
                            ? 'text-cyan-400 bg-cyan-500/10'
                            : 'dark:text-white text-neutral-900 hover:text-cyan-400 dark:hover:bg-white/5 hover:bg-neutral-100'
                        )}
                      >
                        {item.label}
                      </Link>

                      {item.children && (
                        <div className="mt-2 ml-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-3 px-4 py-2 text-sm dark:text-white/60 text-neutral-600 dark:hover:text-white hover:text-neutral-900 rounded-lg dark:hover:bg-white/5 hover:bg-neutral-100 transition-colors"
                            >
                              <child.icon className="w-4 h-4" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    asChild
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
