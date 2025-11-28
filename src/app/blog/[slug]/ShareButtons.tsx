'use client';

import { Twitter, Linkedin, LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  slug: string;
  title: string;
}

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const shareUrl = `https://websitesformorons.com/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 dark:bg-white/5 bg-neutral-50 rounded-xl">
      <span className="text-sm font-medium dark:text-white text-neutral-900">
        Share this article
      </span>
      <div className="flex items-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 dark:bg-white/10 bg-white dark:hover:bg-white/20 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4 dark:text-white/70 text-neutral-600" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 dark:bg-white/10 bg-white dark:hover:bg-white/20 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4 dark:text-white/70 text-neutral-600" />
        </a>
        <button
          onClick={handleCopyLink}
          className="p-2.5 dark:bg-white/10 bg-white dark:hover:bg-white/20 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Copy link"
        >
          <LinkIcon className="w-4 h-4 dark:text-white/70 text-neutral-600" />
        </button>
      </div>
    </div>
  );
}
