import { NextResponse } from 'next/server';

import { Middleware } from '@/types/middlewares/middlewareChain';
import { getPathname } from '@/i18n/routing';
const APP_URL = process.env.NEXT_PUBLIC_URL || process.env.VERCEL_URL;

export const profileCompletionMiddleware: Middleware = async (context) => {
  const completeProfileUrl = getPathname({
    locale: 'pl',
    href: '/complete-registration',
  });
  if (!context.auth?.user) return context;

  if (context.auth?.user?.profileNeedsCompletion) {
    if (!context.req.nextUrl.pathname.includes(completeProfileUrl)) {
      const confirmUrl = new URL(completeProfileUrl, APP_URL);

      // Preserve the original URL for return after profile completion
      const originalUrl =
        context.req.nextUrl.pathname + context.req.nextUrl.search;
      confirmUrl.searchParams.set('returnUrl', originalUrl);

      return { ...context, res: NextResponse.redirect(confirmUrl.toString()) };
    }

    return context;
  }

  if (!context.req.nextUrl.pathname.endsWith(completeProfileUrl))
    return context;

  // After profile completion, check if there's a returnUrl
  const returnUrl = context.req.nextUrl.searchParams.get('returnUrl');
  const redirectUrl = returnUrl || '/dashboard';

  return {
    ...context,
    res: NextResponse.redirect(new URL(redirectUrl, APP_URL).toString()),
  };
};
