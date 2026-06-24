import { HomeHero } from '@/components/sections/home-hero';
import { PostGrid } from '@/components/sections/post-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPosts, getSiteSettings } from '@/lib/content';

const HomePage = async () => {
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()]);

  const heroTitle = settings?.siteName ?? 'A focused starter for content-driven sites';
  const heroDescription =
    settings?.description ??
    'A clean Next.js app with a small typed content boundary and room for a later DatoCMS integration.';

  return (
    <div className="pb-16">
      <HomeHero description={heroDescription} title={heroTitle} />

      <section className="px-6 pt-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Latest posts
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Recent posts
              </h2>
            </div>
            <Button href="/blog" variant="outline">
              View all posts
            </Button>
          </div>
          <PostGrid posts={posts} />
        </div>
      </section>

      <section className="px-6 pt-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Server-first pages</CardTitle>
              <CardDescription>Routes stay server-rendered by default and keep the client bundle small.</CardDescription>
            </CardHeader>
            <CardContent>Read-heavy pages stay in React Server Components.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Selective interactivity</CardTitle>
              <CardDescription>Framer Motion and React Query are only used where they clearly help.</CardDescription>
            </CardHeader>
            <CardContent>Animation and mutations stay localized.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Replaceable content layer</CardTitle>
              <CardDescription>Local typed content works today and can be swapped for DatoCMS later.</CardDescription>
            </CardHeader>
            <CardContent>The routes do not need to change when the backing source changes.</CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
