import { PageIntro } from '@/components/sections/page-intro';
import { PostGrid } from '@/components/sections/post-grid';
import { buildMetadata } from '@/lib/seo';
import { getPosts } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Posts rendered from the local typed content layer.',
  path: '/blog'
});

const BlogIndexPage = async () => {
  const posts = await getPosts();

  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="Blog"
        title="Content rendered through a small typed boundary."
        description="This index uses placeholder content today and can keep the same shape when a CMS is added later."
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
