export type CmsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

export type CmsSiteSettings = {
  siteName: string;
  description: string;
  supportEmail?: string | null;
};
