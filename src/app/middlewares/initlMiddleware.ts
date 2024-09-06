import createMiddleware from 'next-intl/middleware';

import { locales, pathnames } from '@/i18n/pathnames';
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
    const res = await intlMiddleware(context.req);
    return { ...context, res, locale: res.headers.get('x-next-intl-locale') };
  };
};

export const initlMiddleware = createNextIntlMiddleware();
