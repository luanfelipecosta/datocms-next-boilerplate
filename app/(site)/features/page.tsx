import { PageIntro } from '@/components/sections/page-intro';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Features',
  description: 'A neutral feature page for the boilerplate stack.',
  path: '/features'
});

const features = [
  {
    title: 'Editorial structure',
    description: 'Start with a clean content model and keep the page hierarchy easy to reason about.'
  },
  {
    title: 'Frontend-first routing',
    description: 'Use the App Router, shared sections, and server components before adding complexity.'
  },
  {
    title: 'Replaceable content access',
    description: 'Keep the content integration narrow so DatoCMS can be introduced without route churn.'
  }
];

const FeaturesPage = () => {
  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="Features"
        title="What this starter gives you."
        description="A small set of pieces for content-driven sites, demo pages, and a single Next.js deployment surface."
      />
      <section className="px-6 pt-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>Reusable UI and typed data flow.</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
