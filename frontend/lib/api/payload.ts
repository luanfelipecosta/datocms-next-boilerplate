import type { CmsPost, CmsSiteSettings } from '@/types/content';
import { fetchJson } from '../fetcher';

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const postFields = 'id,title,slug,excerpt,content,publishedAt,updatedAt';

export async function getPosts() {
  const data = await fetchJson<PayloadListResponse<CmsPost>>(
    `/api/posts?limit=12&sort=-publishedAt&depth=0&select=${encodeURIComponent(postFields)}`
  );

  return data?.docs ?? [];
}

export async function getPostBySlug(slug: string) {
  const data = await fetchJson<PayloadListResponse<CmsPost>>(
    `/api/posts?limit=1&depth=0&where[slug][equals]=${encodeURIComponent(slug)}&select=${encodeURIComponent(postFields)}`
  );

  return data?.docs[0] ?? null;
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  const data = await fetchJson<CmsSiteSettings | { doc?: CmsSiteSettings }>(`/api/globals/site-settings`);

  if (!data) {
    return null;
  }

  if ('doc' in data) {
    return data.doc ?? null;
  }

  return data as CmsSiteSettings;
}
