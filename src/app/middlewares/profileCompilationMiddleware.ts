import { NextResponse } from 'next/server';

import { Middleware } from '@/types/middlewares/middlewareChain';
import { getPathname } from '@/i18n/routing';

export const profileCompletionMiddleware: Middleware = async (context) => {
  const completeProfileUrl = getPathname({
    locale: context.locale || 'pl',
    href: '/complete-registration',
  });

  if (!context.auth?.user?.profileNeedsCompletion) return context;

  if (context.req.nextUrl.pathname.endsWith(completeProfileUrl))
    return context;

  const url = context.req.nextUrl.clone();

  url.pathname = completeProfileUrl;
  console.log('Redirecting to complete profile page');
  console.log(completeProfileUrl);
  return { ...context, res: NextResponse.redirect(url) };

  return context;
};
