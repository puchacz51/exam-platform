import { Pathnames } from 'next-intl/routing';

export const locales = ['en', 'pl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const pathnames = {
  '/': '/',
  '/login': {
    en: '/login',
    pl: '/logowanie',
  },
  '/register': {
    en: '/register',
    pl: '/rejestracja',
  },
  '/verify-email': {
    en: '/verify-email',
    pl: '/zweryfikuj-email',
  },
} satisfies Pathnames<typeof locales>;
