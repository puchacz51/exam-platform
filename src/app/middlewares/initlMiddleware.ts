import createMiddleware from 'next-intl/middleware';

import { Locale, locales, pathnames } from '@/i18n/pathnames';
import {
  Middleware,
  MiddlewareContext,
} from '@/types/middlewares/middlewareChain';

const createNextIntlMiddleware = (): Middleware => {
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: 'pl',
    localePrefix: 'never',
    localeDetection: true,
    pathnames,
  });

  return async (context: MiddlewareContext) => {
    const res = intlMiddleware(context.req);
    const locale = res.headers.get(
      'x-middleware-request-x-next-intl-locale'
    ) as Locale;
    return {
      ...context,
      res,
      locale,
    };
  };
};

export const initlMiddleware = createNextIntlMiddleware();
