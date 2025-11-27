/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://websitesformorons.com',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*', '/404', '/500'],

  // Custom transform function for sitemap entries
  transform: async (config, path) => {
    // Higher priority for main pages
    const highPriorityPaths = ['/', '/services', '/portfolio', '/contact'];
    const mediumPriorityPaths = ['/about', '/pricing', '/faq', '/blog'];

    let priority = config.priority;
    let changefreq = config.changefreq;

    if (highPriorityPaths.includes(path)) {
      priority = 1.0;
      changefreq = 'daily';
    } else if (mediumPriorityPaths.includes(path)) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];

    // Add any dynamic routes here
    // Example: blog posts, portfolio items

    return result;
  },
};
