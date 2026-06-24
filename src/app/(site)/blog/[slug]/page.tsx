import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/sections/page-intro';
import { Card, CardContent } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';
import { getPostBySlug } from '@/lib/content';
import { formatDate } from '@/utils/format';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Post not found',
      path: `/blog/${slug}`
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt ?? 'Blog post',
    path: `/blog/${post.slug}`
  });
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="Blog post"
        title={post.title}
        description={post.excerpt ?? 'This post was loaded from the local content layer.'}
      />
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardContent className="space-y-6 pt-0">
              {post.publishedAt ? (
                <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
              ) : null}
              <div className="space-y-4 whitespace-pre-line text-lg leading-8 text-muted-foreground">
                <p>{post.content ?? 'Add content to the local content layer to render the body here.'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
