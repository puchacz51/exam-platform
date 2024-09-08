import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['react-dom/server'],
  },
  webpack: (config, { webpack }) => {
    config
    return config;
  },
};

export default withNextIntl(nextConfig);
