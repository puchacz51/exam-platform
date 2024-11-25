import { Pathnames } from 'next-intl/routing';

export const locales = ['en', 'pl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const authPathnames = {
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
  '/complete-registration': {
    en: '/complete-registration',
    pl: '/zakoncz-rejestracje',
  },
} as const;

const dashboardPathnames = {
  '/dashboard': {
    en: '/dashboard',
    pl: '/panel',
  },
  '/test-creator': {
    en: '/test-creator',
    pl: '/tworzenie-testu',
  },
  '/test-creator/:testId': {
    en: '/test-creator/:testId',
    pl: '/tworzenie-testu/:testId',
  },
  '/groups': {
    en: '/groups',
    pl: '/grupy',
  },
  '/test-assignment': {
    en: '/test-assignment',
    pl: '/przypisanie-testu',
  },
  '/test': '/test',
  '/test/[id]': '/test/[id]',
  '/test/[id]/assign': {
    en: '/test/[id]/assign',
    pl: '/test/[id]/przypisanie',
  },
  '/test-assignment/list': {
    en: '/test-assignment/list',
    pl: '/przypisanie-testu/lista',
  },
} as const;

const publicPathnames = {
  '/': '/',
} as const;

export const pathnames = {
  ...authPathnames,
  ...dashboardPathnames,
  ...publicPathnames,
} satisfies Pathnames<typeof locales>;

export type Pathname = keyof typeof pathnames;
export type Path = (typeof pathnames)[Pathname][];
