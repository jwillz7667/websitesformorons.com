import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';
import { CTA } from '@/components/sections/CTA';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/data/blog';
import { ShareButtons } from './ShareButtons';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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

// Simple markdown renderer component
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag key={key++} className={listType === 'ul' ? 'list-disc' : 'list-decimal'}>
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  const processInlineStyles = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      flushList();
      continue;
    }

    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={key++}>{trimmedLine.slice(3)}</h2>);
      continue;
    }

    if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={key++}>{trimmedLine.slice(4)}</h3>);
      continue;
    }

    if (trimmedLine.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(trimmedLine.slice(2));
      continue;
    }

    if (/^\d+\.\s/.test(trimmedLine)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
      continue;
    }

    if (trimmedLine.startsWith('> ')) {
      flushList();
      elements.push(<blockquote key={key++}>{trimmedLine.slice(2)}</blockquote>);
      continue;
    }

    flushList();
    elements.push(<p key={key++}>{processInlineStyles(trimmedLine)}</p>);
  }

  flushList();

  return <>{elements}</>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <div className="dark:bg-neutral-950 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b dark:border-white/10 border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="dark:text-white/50 text-neutral-500 hover:text-cyan-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 dark:text-white/30 text-neutral-400" />
            <Link href="/blog" className="dark:text-white/50 text-neutral-500 hover:text-cyan-500 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 dark:text-white/30 text-neutral-400" />
            <span className="dark:text-white/80 text-neutral-700 truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-12 pb-8 sm:pt-16 sm:pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Badge variant="secondary" size="sm">
              {post.category}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-neutral-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl dark:text-white/60 text-neutral-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b dark:border-white/10 border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-medium dark:text-white text-neutral-900">{post.author.name}</div>
                <div className="text-xs dark:text-white/50 text-neutral-500">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm dark:text-white/50 text-neutral-500">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>

            <div className="flex items-center gap-2 text-sm dark:text-white/50 text-neutral-500">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="
            prose prose-lg max-w-none
            dark:prose-invert
            prose-headings:font-bold
            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 dark:prose-h2:text-white prose-h2:text-neutral-900
            prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-4 dark:prose-h3:text-white prose-h3:text-neutral-900
            prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 dark:prose-p:text-white/70 prose-p:text-neutral-600
            prose-strong:font-semibold dark:prose-strong:text-white prose-strong:text-neutral-900
            prose-ul:my-6 prose-ul:pl-6
            prose-ol:my-6 prose-ol:pl-6
            prose-li:text-base prose-li:mb-2 dark:prose-li:text-white/70 prose-li:text-neutral-600
            prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-8 prose-blockquote:italic dark:prose-blockquote:text-white/60 prose-blockquote:text-neutral-500 prose-blockquote:not-italic prose-blockquote:font-normal
            prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:underline
          ">
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </article>

      {/* Tags & Share */}
      <div className="border-t dark:border-white/10 border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-sm dark:text-white/40 text-neutral-500 mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm dark:bg-white/5 bg-neutral-100 dark:text-white/60 text-neutral-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <ShareButtons slug={params.slug} title={post.title} />
        </div>
      </div>

      {/* Author Box */}
      <div className="border-t dark:border-white/10 border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row gap-6 p-6 dark:bg-gradient-to-br dark:from-cyan-500/5 dark:to-orange-500/5 bg-gradient-to-br from-cyan-500/5 to-orange-500/5 rounded-2xl border dark:border-white/10 border-neutral-200">
            <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="text-sm dark:text-white/50 text-neutral-500 mb-1">Written by</div>
              <div className="text-lg font-bold dark:text-white text-neutral-900 mb-2">{post.author.name}</div>
              <p className="text-sm dark:text-white/60 text-neutral-600">
                {post.author.role} at WebsitesForMorons.com. Helping businesses transform their online presence with modern web design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-neutral-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-neutral-900 mb-8 text-center">
              Related <GradientText>Articles</GradientText>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <Card variant="glass" padding="none" hover="lift" className="h-full overflow-hidden">
                    <div className="h-32 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                      <span className="text-3xl">📄</span>
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" size="xs" className="mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-cyan-500 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm dark:text-white/60 text-neutral-500 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTA />
    </div>
  );
}
