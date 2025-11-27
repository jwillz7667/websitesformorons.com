import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Blog - Web Design Tips & Insights',
  description:
    'Expert tips on web design, SEO, and digital marketing for small businesses.',
};

const blogPosts = [
  {
    slug: '10-signs-website-needs-redesign',
    title: '10 Signs Your Website Desperately Needs a Redesign',
    excerpt: 'Is your website driving customers away? Here are the telltale signs it\'s time for a refresh.',
    category: 'Web Design',
    date: '2024-01-15',
    readTime: '5 min read',
    author: 'Alex Chen',
  },
  {
    slug: 'seo-basics-small-business',
    title: 'SEO Basics Every Small Business Owner Should Know',
    excerpt: 'Stop leaving money on the table. Learn the fundamentals of search engine optimization.',
    category: 'SEO',
    date: '2024-01-10',
    readTime: '8 min read',
    author: 'Sarah Miller',
  },
  {
    slug: 'website-speed-matters',
    title: 'Why Website Speed Matters More Than You Think',
    excerpt: 'Every second counts. Discover how page speed impacts your bottom line.',
    category: 'Performance',
    date: '2024-01-05',
    readTime: '6 min read',
    author: 'Mike Johnson',
  },
  {
    slug: 'mobile-first-design',
    title: 'Mobile-First Design: Why It\'s No Longer Optional',
    excerpt: 'Over 60% of web traffic is mobile. Is your website ready?',
    category: 'Web Design',
    date: '2023-12-28',
    readTime: '7 min read',
    author: 'Emily Davis',
  },
  {
    slug: 'conversion-rate-optimization',
    title: 'Simple Changes That Can Double Your Conversion Rate',
    excerpt: 'Small tweaks, big results. Learn the psychology of high-converting websites.',
    category: 'Marketing',
    date: '2023-12-20',
    readTime: '9 min read',
    author: 'Alex Chen',
  },
  {
    slug: 'wordpress-vs-shopify',
    title: 'WordPress vs Shopify: Which Is Right for Your Business?',
    excerpt: 'The ultimate comparison guide to help you choose the right platform.',
    category: 'Technology',
    date: '2023-12-15',
    readTime: '10 min read',
    author: 'Mike Johnson',
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            Blog
          </Badge>
          <h1 className="text-display-lg sm:text-display-xl font-bold text-white mb-6">
            Web Design Tips &{' '}
            <GradientText>Insights</GradientText>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Practical advice for small business owners who want to succeed online.
            No jargon, just actionable insights.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <div className="mb-16">
            <Card variant="glass" padding="none" hover="glow" className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-auto bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center">
                  <span className="text-8xl">📝</span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="primary" size="sm" className="w-fit mb-4">
                    Featured
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-white/60 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {blogPosts[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-fit"
                    asChild
                  >
                    <Link href={`/blog/${blogPosts[0].slug}`}>Read Article</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.slug} variant="glass" padding="none" hover="lift" className="overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                  <span className="text-5xl">📄</span>
                </div>
                <div className="p-6">
                  <Badge variant="secondary" size="xs" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>{post.readTime}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
