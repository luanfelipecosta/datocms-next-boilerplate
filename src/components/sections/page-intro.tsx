import { Badge } from '@/components/ui/badge';

export const PageIntro = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => {
  return (
    <section className="px-6 pt-12 md:pt-16">
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <Badge>{eyebrow}</Badge>
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </section>
  );
};
