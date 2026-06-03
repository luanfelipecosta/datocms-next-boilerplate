import type { Metadata } from 'next';
import { siteConfig } from './site';

type MetaInput = {
  title: string;
  description?: string;
  path?: string;
};

export function buildMetadata({ title, description, path = '/' }: MetaInput): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`
    },
    description: description ?? siteConfig.description,
    alternates: {
      canonical: new URL(path, siteConfig.url).toString()
    }
  };
}
