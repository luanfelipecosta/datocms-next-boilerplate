import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/content';
import { siteConfig } from '@/lib/site';

const staticPaths = ['/', '/about', '/features', '/contact', '/blog'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    ...staticPaths.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: new Date()
    })),
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date()
    }))
  ];
}
