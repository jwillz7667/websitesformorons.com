import type { FAQ } from '@/types';

export const faqData: FAQ[] = [
  {
    question: 'How long does a website redesign take?',
    answer:
      'Most website redesign projects are completed within 2-4 weeks, depending on complexity. Simple brochure sites can be done in as little as 10 days, while complex e-commerce sites may take 4-6 weeks. We\'ll provide a detailed timeline during our initial consultation.',
    category: 'timeline',
  },
  {
    question: 'How much does a website redesign cost?',
    answer:
      'Our website redesign projects start at $2,499 for small business sites. The final cost depends on the number of pages, features required, and complexity. We provide transparent, fixed-price quotes so you know exactly what you\'re paying before we start. No surprises!',
    category: 'pricing',
  },
  {
    question: 'Do you work with WordPress?',
    answer:
      'Yes! We work with WordPress, Shopify, Webflow, Squarespace, and custom solutions like Next.js and React. We\'ll recommend the best platform based on your specific needs, budget, and technical requirements.',
    category: 'technical',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer:
      'Absolutely. Every website we build is mobile-first and fully responsive. With over 60% of web traffic coming from mobile devices, we ensure your site looks and works perfectly on smartphones, tablets, and desktops.',
    category: 'technical',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Yes, we offer monthly maintenance plans starting at $99/month. This includes regular updates, security monitoring, daily backups, and up to 2 hours of content updates per month. We also offer custom maintenance packages for larger sites.',
    category: 'services',
  },
  {
    question: 'Can you help with SEO?',
    answer:
      'SEO is included in every project. We set up proper meta tags, schema markup, site speed optimization, and technical SEO fundamentals. We also offer dedicated SEO services starting at $999/month for ongoing optimization and content strategy.',
    category: 'services',
  },
  {
    question: 'What if I\'m not satisfied with the design?',
    answer:
      'We offer unlimited revisions during the design phase until you\'re 100% satisfied. We believe in collaborative design and will work closely with you to ensure the final product exceeds your expectations.',
    category: 'process',
  },
  {
    question: 'Do you provide hosting?',
    answer:
      'We can set up and manage hosting for you, or work with your existing hosting provider. We typically recommend Vercel for Next.js sites, WP Engine for WordPress, or Shopify\'s built-in hosting for e-commerce.',
    category: 'technical',
  },
  {
    question: 'Will I be able to update the website myself?',
    answer:
      'Yes! We build all our sites with user-friendly content management systems. We\'ll provide training on how to update text, images, and basic content. More complex changes can be handled through our maintenance plans.',
    category: 'technical',
  },
  {
    question: 'What\'s your process like?',
    answer:
      'Our process is simple: 1) Discovery call to understand your needs, 2) Strategy and sitemap planning, 3) Design mockups for your approval, 4) Development and testing, 5) Launch and training. We keep you involved every step of the way.',
    category: 'process',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes! We offer flexible payment options. Typically, we require 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments. We accept all major credit cards, bank transfers, and PayPal.',
    category: 'pricing',
  },
  {
    question: 'What makes you different from other web design agencies?',
    answer:
      'We specialize specifically in helping small businesses escape their outdated websites. We understand the unique challenges of limited budgets and tight timelines. Plus, our name ensures we never take ourselves too seriously while delivering seriously good results.',
    category: 'general',
  },
];

export const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'process', label: 'Process' },
  { id: 'technical', label: 'Technical' },
  { id: 'services', label: 'Services' },
  { id: 'timeline', label: 'Timeline' },
];

export default faqData;
