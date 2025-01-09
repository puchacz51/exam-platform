import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales, pathnames } from '@/i18n/pathnames';

const routing = defineRouting({
  pathnames,
  locales,
  defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation(routing);
