import { PageIntro } from '@/components/sections/page-intro';
import { Card, CardContent } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'A concise about page for the single-app architecture.',
  path: '/about'
});

const AboutPage = () => {
  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="About"
        title="Simple architecture, fewer moving parts."
        description="One Next.js app owns presentation, routes, and the current placeholder content layer."
      />
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="space-y-4 pt-0">
              <p>
                This scaffold is intentionally small. It gives you the minimum pieces needed to ship routes, reuse
                UI primitives, and keep the content boundary narrow.
              </p>
              <p>
                Add shared packages only when duplication becomes real. Until then, the direct file structure stays
                easier to reason about.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
