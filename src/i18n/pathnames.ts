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

export const protectedPathnames = {
  '/dashboard': {
    en: '/dashboard',
    pl: '/panel',
  },
  '/test-creator': {
    en: '/test-creator',
    pl: '/tworzenie-testu',
  },
  '/test-creator/[id]': {
    en: '/test-creator/[id]',
    pl: '/tworzenie-testu/[id]',
  },
  '/groups': {
    en: '/groups',
    pl: '/grupy',
  },
  '/test': '/test',
  '/test/[id]': '/test/[id]',
  '/test/assign/[id]/': {
    en: '/test/assign/[id]/',
    pl: '/test/przypisanie/[id]/',
  },
  '/test/assign': {
    en: '/test-assignment',
    pl: '/przypisanie-testu',
  },
  'test-assignment': {
    en: '/assigned-tests',
    pl: '/przypisane-testy',
  },
  '/test-attempt/start-screen/[id]': {
    en: '/test-attempt/start-screen/[id]',
    pl: '/podejscie-do-testu/ekran-startowy/[id]',
  },
  '/test-attempt/[id]': {
    en: '/test-attempt/[id]',
    pl: '/podejscie-do-testu/[id]',
  },
} as const;

const publicPathnames = {
  '/': '/',
} as const;

export const pathnames = {
  ...authPathnames,
  ...protectedPathnames,
  ...publicPathnames,
} satisfies Pathnames<typeof locales>;

export type Pathname = keyof typeof pathnames;
export type Path = (typeof pathnames)[Pathname][];
