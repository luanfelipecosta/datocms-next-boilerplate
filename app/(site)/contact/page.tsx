import { PageIntro } from '@/components/sections/page-intro';
import { ContactForm } from '@/components/sections/contact-form';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Contact form using React Query for mutation handling.',
  path: '/contact'
});

const ContactPage = () => {
  return (
    <div className="pb-16">
      <PageIntro
        eyebrow="Contact"
        title="Use React Query where it actually helps."
        description="The contact form is a small, clear example of a client-side mutation boundary."
      />
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-3xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
