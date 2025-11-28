import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTA } from '@/components/sections/CTA';
import { getAllPosts, getAllCategories } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog - Web Design Tips & Digital Marketing Insights',
  description:
    'Expert tips on web design, SEO, conversion optimization, and digital marketing for small businesses. Actionable insights from 20+ years of experience.',
  openGraph: {
    title: 'Blog | WebsitesForMorons.com',
    description: 'Expert web design tips and digital marketing insights for small businesses.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient opacity-50" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            <Tag className="w-3.5 h-3.5" />
            <span>Insights & Resources</span>
          </Badge>
          <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl font-bold text-white mb-6">
            Web Design Tips &{' '}
            <GradientText>Insights</GradientText>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Practical, no-nonsense advice for small business owners who want to succeed online.
            20+ years of experience distilled into actionable insights.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 text-black"
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="glass" padding="none" hover="glow" className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image placeholder */}
              <div className="h-64 lg:h-auto min-h-[300px] bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-orange-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                <span className="text-9xl relative z-10">📝</span>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="primary" size="sm">
                    Featured
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {featuredPost.category}
                  </Badge>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-white/60 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {featuredPost.author.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-fit"
                  asChild
                >
                  <Link href={`/blog/${featuredPost.slug}`}>Read Article</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Latest Articles"
            title="More Insights"
            titleGradient="Insights"
            description="Deep dives into web design, SEO, and digital marketing strategies that drive results."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Card
                key={post.slug}
                variant="glass"
                padding="none"
                hover="lift"
                className="overflow-hidden group flex flex-col"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-orange-500/5" />
                  <span className="text-5xl relative z-10">📄</span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" size="xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-white/40">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author.name}
                    </span>
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-neutral-900 to-orange-500/10" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            Stay Updated
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-4">
            Get the Latest Insights Delivered
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Join 5,000+ business owners who get our weekly digest of web design tips,
            SEO strategies, and conversion insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            />
            <Button variant="primary" size="lg">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-white/40 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
