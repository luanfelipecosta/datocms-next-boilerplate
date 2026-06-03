import { PageIntro } from '@/components/sections/page-intro';
import { Card, CardContent } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'A concise about page that stays aligned with the CMS-driven architecture.',
  path: '/about'
});

const AboutPage = () => {
  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="About"
        title="Simple architecture, fewer moving parts."
        description="The frontend owns presentation. The CMS owns content. The API boundary stays thin and explicit."
      />
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="space-y-4 pt-0">
              <p>
                This scaffold is intentionally small. It gives you the minimum pieces needed to add content, reuse
                UI primitives, and keep the frontend independent from Payload internals.
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
