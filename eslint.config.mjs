import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  {
    ignores: ['agent/**']
  },
  ...nextCoreWebVitals
];

export default config;
