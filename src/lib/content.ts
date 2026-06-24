import type { Post, SiteSettings } from '@/types/content';

const siteSettings: SiteSettings = {
  siteName: 'Website POC',
  description: 'A single Next.js application with local placeholder content and a future DatoCMS integration path.',
  supportEmail: 'hello@example.com'
};

const posts: Post[] = [
  {
    id: 'next-foundations',
    title: 'Why this app is now root-first',
    slug: 'why-this-app-is-now-root-first',
    excerpt: 'The monorepo and CMS layers were removed so the project can focus on one deployable Next.js surface.',
    content:
      'This repository now centers on a single App Router application. Content is local for now, which keeps development simple while leaving room for a later DatoCMS integration.',
    publishedAt: '2026-06-01T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z'
  },
  {
    id: 'content-boundary',
    title: 'Keeping the content layer replaceable',
    slug: 'keeping-the-content-layer-replaceable',
    excerpt: 'The app keeps a small content API so a CMS can be added later without reshaping the routes.',
    content:
      'Instead of wiring DatoCMS immediately, the current content layer returns typed local data. When DatoCMS is introduced, the implementation can change behind the same exported functions.',
    publishedAt: '2026-06-02T10:00:00.000Z',
    updatedAt: '2026-06-02T10:00:00.000Z'
  }
];

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}
