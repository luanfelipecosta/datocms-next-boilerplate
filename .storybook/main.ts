import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)', '../components/**/*.mdx'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  }
};

export default config;
