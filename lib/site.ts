import type { SiteConfig } from '@/types/site';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

export const siteConfig: SiteConfig = {
  name: 'Website POC',
  description: 'A root-level Next.js application prepared for a future DatoCMS integration.',
  url: siteUrl,
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ]
};
