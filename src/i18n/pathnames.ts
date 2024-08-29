export const locales = ['en', 'pl'] as const;

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
} as const;

export type Locale = (typeof locales)[number];

export type Pathname = keyof typeof pathnames;
