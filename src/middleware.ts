import createMiddleware from 'next-intl/middleware';

import { locales, pathnames } from '@/config/i18n/pathnames';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'pl',
  localePrefix: 'never',
  localeDetection: true,
  pathnames: pathnames,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
