import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user)
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Next.js + Payload Boilerplate'
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'A neutral starter for editorial pages, content collections, and simple app routes.'
    },
    {
      name: 'supportEmail',
      type: 'email'
    }
  ]
};
