// Service Worker for WebsitesForMorons.com PWA
// Version 2.0.0 - 2026 PWA Standards Compliant

const CACHE_VERSION = 'v2';
const STATIC_CACHE_NAME = `w4m-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `w4m-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `w4m-images-${CACHE_VERSION}`;
const FONT_CACHE_NAME = `w4m-fonts-${CACHE_VERSION}`;
const API_CACHE_NAME = `w4m-api-${CACHE_VERSION}`;

const OFFLINE_URL = '/offline.html';
const OFFLINE_IMAGE = '/images/offline-placeholder.svg';

// Assets to cache immediately on install (critical path)
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/favicon.ico',
];

// Pages to cache for offline access
const PAGES_TO_CACHE = [
  '/',
  '/services',
  '/portfolio',
  '/about',
  '/contact',
  '/faq',
  '/blog',
];

// Cache limits to prevent storage bloat
const CACHE_LIMITS = {
  images: 100,
  dynamic: 50,
  api: 30,
};

// Cache expiration times (in milliseconds)
const CACHE_EXPIRY = {
  static: 7 * 24 * 60 * 60 * 1000, // 7 days
  dynamic: 24 * 60 * 60 * 1000, // 1 day
  api: 5 * 60 * 1000, // 5 minutes
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
  fonts: 365 * 24 * 60 * 60 * 1000, // 1 year
};

// ============================================================================
// Install Event - Precache critical assets
// ============================================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE_NAME);

      // Add all precache assets
      console.log('[SW] Precaching critical assets');
      await cache.addAll(PRECACHE_ASSETS);

      // Pre-cache main pages for offline access
      console.log('[SW] Precaching main pages');
      try {
        await cache.addAll(PAGES_TO_CACHE);
      } catch (error) {
        console.warn('[SW] Some pages failed to precache:', error);
      }

      // Force waiting service worker to become active
      await self.skipWaiting();
      console.log('[SW] Installation complete');
    })()
  );
});

// ============================================================================
// Activate Event - Clean up old caches
// ============================================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    (async () => {
      // Delete old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName.startsWith('w4m-') &&
              !cacheName.includes(CACHE_VERSION)
            );
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );

      // Take control of all clients immediately
      await self.clients.claim();
      console.log('[SW] Activation complete');
    })()
  );
});

// ============================================================================
// Fetch Event - Implement caching strategies
// ============================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http protocols
  if (!url.protocol.startsWith('http')) return;

  // Skip cross-origin requests except for fonts and images from CDNs
  const isSameOrigin = url.origin === self.location.origin;
  const isAllowedCrossOrigin =
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('images.unsplash.com');

  if (!isSameOrigin && !isAllowedCrossOrigin) return;

  // Skip API routes (except for specific cacheable endpoints)
  if (url.pathname.startsWith('/api/') && !url.pathname.includes('/api/blog')) {
    return;
  }

  // Determine the caching strategy based on request type
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isFontRequest(request)) {
    event.respondWith(handleFontRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// ============================================================================
// Request Type Helpers
// ============================================================================
function isImageRequest(request) {
  return (
    request.destination === 'image' ||
    /\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/i.test(new URL(request.url).pathname)
  );
}

function isFontRequest(request) {
  return (
    request.destination === 'font' ||
    /\.(woff|woff2|ttf|otf|eot)$/i.test(new URL(request.url).pathname) ||
    request.url.includes('fonts.gstatic.com')
  );
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.startsWith('/_next/static/') ||
    /\.(js|css)$/i.test(url.pathname)
  );
}

// ============================================================================
// Caching Strategies
// ============================================================================

// Network First with Cache Fallback (for navigation)
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache the successful response
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Try to return cached response
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page as last resort
    return caches.match(OFFLINE_URL);
  }
}

// Cache First with Network Fallback (for images)
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // Return cached immediately, update in background
    updateCache(request, IMAGE_CACHE_NAME);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE_NAME);
      cache.put(request, networkResponse.clone());

      // Limit cache size
      limitCacheSize(IMAGE_CACHE_NAME, CACHE_LIMITS.images);
    }

    return networkResponse;
  } catch (error) {
    // Return placeholder image for offline
    const offlineImage = await caches.match(OFFLINE_IMAGE);
    if (offlineImage) return offlineImage;

    return new Response('', { status: 408, statusText: 'Image unavailable offline' });
  }
}

// Cache First (for fonts - they rarely change)
async function handleFontRequest(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(FONT_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    return new Response('', { status: 408, statusText: 'Font unavailable offline' });
  }
}

// Stale While Revalidate (for static assets)
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(STATIC_CACHE_NAME);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Network First with Short Cache (for dynamic content)
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());

      // Limit cache size
      limitCacheSize(DYNAMIC_CACHE_NAME, CACHE_LIMITS.dynamic);
    }

    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('', { status: 408, statusText: 'Content unavailable offline' });
  }
}

// ============================================================================
// Cache Management Utilities
// ============================================================================

// Update cache in background
async function updateCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse);
    }
  } catch (error) {
    // Silent fail for background updates
  }
}

// Limit cache size by removing oldest entries
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    // Remove oldest entries (first in array)
    const keysToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(keysToDelete.map((key) => cache.delete(key)));
  }
}

// ============================================================================
// Push Notifications
// ============================================================================
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();

    const options = {
      body: data.body || 'New update from WebsitesForMorons.com',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      image: data.image,
      vibrate: [100, 50, 100],
      tag: data.tag || 'w4m-notification',
      renotify: data.renotify || false,
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [
        { action: 'view', title: 'View', icon: '/icons/action-view.png' },
        { action: 'dismiss', title: 'Dismiss', icon: '/icons/action-dismiss.png' },
      ],
      data: {
        url: data.url || '/',
        timestamp: Date.now(),
      },
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'WebsitesForMorons.com', options)
    );
  } catch (error) {
    console.error('[SW] Push notification error:', error);
  }
});

// ============================================================================
// Notification Click Handler
// ============================================================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const url = event.notification.data?.url || '/';

  if (action === 'dismiss') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // Open new window if none found
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// ============================================================================
// Background Sync
// ============================================================================
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }

  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncContactForms() {
  try {
    // Get pending form submissions from IndexedDB
    // This is a placeholder - implement with actual IndexedDB logic
    console.log('[SW] Syncing contact forms...');
  } catch (error) {
    console.error('[SW] Form sync failed:', error);
  }
}

async function syncAnalytics() {
  try {
    console.log('[SW] Syncing analytics...');
  } catch (error) {
    console.error('[SW] Analytics sync failed:', error);
  }
}

// ============================================================================
// Periodic Background Sync (for content updates)
// ============================================================================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

async function syncContent() {
  try {
    console.log('[SW] Periodic content sync...');

    // Re-cache main pages for fresh content
    const cache = await caches.open(DYNAMIC_CACHE_NAME);

    for (const page of PAGES_TO_CACHE) {
      try {
        const response = await fetch(page);
        if (response.ok) {
          await cache.put(page, response);
        }
      } catch (error) {
        // Silent fail for individual pages
      }
    }
  } catch (error) {
    console.error('[SW] Content sync failed:', error);
  }
}

// ============================================================================
// Message Handler (for communication with main thread)
// ============================================================================
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'CLEAR_CACHE':
      event.waitUntil(clearAllCaches());
      break;

    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(payload?.urls || []));
      break;

    case 'GET_CACHE_SIZE':
      event.waitUntil(
        getCacheSize().then((size) => {
          event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
        })
      );
      break;

    default:
      console.log('[SW] Unknown message type:', type);
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
  console.log('[SW] All caches cleared');
}

async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  await cache.addAll(urls);
  console.log('[SW] URLs cached:', urls.length);
}

async function getCacheSize() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage,
      quota: estimate.quota,
      percentage: ((estimate.usage / estimate.quota) * 100).toFixed(2),
    };
  }
  return null;
}

console.log('[SW] Service Worker loaded - Version', CACHE_VERSION);
