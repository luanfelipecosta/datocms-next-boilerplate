import type { SiteConfig } from '@/types/site';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

export const siteConfig: SiteConfig = {
  name: 'Next.js + Payload Boilerplate',
  description: 'A neutral starter for editorial pages, content collections, and simple app routes.',
  url: siteUrl,
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ]
};
