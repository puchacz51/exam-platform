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
      const confirmUrl = APP_URL + completeProfileUrl;
      console.log('confirmUrl', context.req.nextUrl.pathname);
      return { ...context, res: NextResponse.redirect(confirmUrl) };
    }

    return context;
  }

  if (!context.req.nextUrl.pathname.endsWith(completeProfileUrl))
    return context;

  return { ...context, res: NextResponse.redirect('/dashboard') };
};
