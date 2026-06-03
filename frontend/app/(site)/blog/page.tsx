import { PageIntro } from '@/components/sections/page-intro';
import { PostGrid } from '@/components/sections/post-grid';
import { buildMetadata } from '@/lib/seo';
import { getPosts } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Posts fetched from Payload CMS through the frontend API layer.',
  path: '/blog'
});

const BlogIndexPage = async () => {
  const posts = await getPosts();

  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="Blog"
        title="Content from Payload, rendered in Next.js."
        description="This index fetches the posts collection directly through the typed frontend API layer."
      />
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-6xl">
          <PostGrid posts={posts} />
        </div>
      </section>
    </div>
  );
};

export default BlogIndexPage;
