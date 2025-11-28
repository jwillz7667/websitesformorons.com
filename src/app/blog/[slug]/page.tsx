import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, Tag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { CTA } from '@/components/sections/CTA';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/data/blog';

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient opacity-30" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category and reading time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="primary" size="md">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-white/60 mb-8">
            {post.excerpt}
          </p>

          {/* Author and date */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center text-white font-bold">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-white">{post.author.name}</div>
                <div className="text-sm text-white/50">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-neutral-950" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-invert prose-cyan max-w-none">
            {/* Render markdown content */}
            <div
              className="
                [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
                [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-4
                [&>p]:text-white/70 [&>p]:leading-relaxed [&>p]:mb-6
                [&>ul]:text-white/70 [&>ul]:mb-6 [&>ul]:space-y-2
                [&>ol]:text-white/70 [&>ol]:mb-6 [&>ol]:space-y-2
                [&>li]:text-white/70
                [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-white/60 [&>blockquote]:my-8
                [&>strong]:text-white [&>strong]:font-semibold
                [&>a]:text-cyan-400 [&>a]:underline [&>a]:hover:text-cyan-300
                [&>hr]:border-white/10 [&>hr]:my-12
                [&>code]:bg-white/10 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-cyan-400 [&>code]:text-sm
                [&>pre]:bg-neutral-900 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6
              "
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^## /gm, '<h2>')
                  .replace(/^### /gm, '<h3>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^\*\*([^*]+)\*\*/gm, '<strong>$1</strong>')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                  .replace(/^\- /gm, '<li>')
                  .replace(/^\d+\. /gm, '<li>')
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('<h2>') || line.startsWith('<h3>') || line.startsWith('<li>')) {
                      return line;
                    }
                    if (line.trim() === '') return '';
                    return `<p>${line}</p>`;
                  })
                  .join('\n')
              }}
            />
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-white/40" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-white/5 text-white/60 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Found this helpful? Share it!</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Twitter
                </Button>
                <Button variant="secondary" size="sm">
                  LinkedIn
                </Button>
                <Button variant="secondary" size="sm">
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-neutral-900/50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Related <GradientText>Articles</GradientText>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.slug}
                  variant="glass"
                  padding="none"
                  hover="lift"
                  className="overflow-hidden group"
                >
                  <div className="h-40 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                    <span className="text-4xl">📄</span>
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" size="xs" className="mb-3">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                asChild
              >
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTA />
    </>
  );
}
