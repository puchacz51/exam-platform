export const locales = ['en', 'pl'] as const;
export const defaultLocale = 'en' as const;

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
    pl: '/weryfikacja-email',
  },
} as const;

export type Locale = (typeof locales)[number];

export type Pathname = keyof typeof pathnames;
