import type {NextConfig} from 'next';

const configuredAppUrl = process.env.APP_URL?.trim();

if (
  process.env.NODE_ENV === 'production' &&
  (!configuredAppUrl || /localhost|127\.0\.0\.1/.test(configuredAppUrl))
) {
  console.warn(
    '\n[config] APP_URL is missing or points at localhost in a production build.\n' +
      '         Canonicals, sitemap.xml, robots.txt and JSON-LD will use the fallback domain.\n' +
      '         Set APP_URL to the live domain (e.g. https://example.co.za) before deploying.\n',
  );
}

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  poweredByHeader: false,
  async redirects() {
    return [
      // Domain migration: legacy hosts permanently redirect to the canonical origin.
      // These rules take effect once the legacy domains are attached to this project.
      // www.sassagranthub.co.za is the canonical host and the apex 308-redirects
      // to it at the edge, so neither host belongs in this list. An app-level
      // apex or www rule fights the edge redirect and produces an infinite loop.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sassagranttguide.vercel.app' }],
        destination: 'https://www.sassagranthub.co.za/:path*',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sassagrantguide.co.za' }],
        destination: 'https://www.sassagranthub.co.za/:path*',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sassagrantguide.co.za' }],
        destination: 'https://www.sassagranthub.co.za/:path*',
        statusCode: 301,
      },
      { source: '/guides/sassa-2026-payment-dates-calendar', destination: '/payment-dates', permanent: true },
      { source: '/news/how-to-find-sassa-reference-number', destination: '/guides/sassa-reference-number', permanent: true },
      { source: '/news/srd-r370-grant-extended-to-march-2027', destination: '/news/srd-r370-grant-extended-to-2028', permanent: true },
      { source: '/banking/sassa-black-card-guide', destination: '/banking/black-card-swap', permanent: true },
      { source: '/grants/child-support-grant/payment-dates', destination: '/payment-dates/child-support-grant-payment-dates', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      { source: '/zu', destination: '/', permanent: true },
      { source: '/zu/:path*', destination: '/:path*', permanent: true },
      { source: '/xh', destination: '/', permanent: true },
      { source: '/xh/:path*', destination: '/:path*', permanent: true },
      { source: '/af', destination: '/', permanent: true },
      { source: '/af/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify — file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
