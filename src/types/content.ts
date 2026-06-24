export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

export type SiteSettings = {
  siteName: string;
  description: string;
  supportEmail?: string | null;
};
