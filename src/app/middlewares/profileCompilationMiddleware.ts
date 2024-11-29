import { NextResponse } from 'next/server';

import { Middleware } from '@/types/middlewares/middlewareChain';
import { getPathname } from '@/i18n/routing';

export const profileCompletionMiddleware: Middleware = async (context) => {
  const completeProfileUrl = getPathname({
    locale: context.locale || 'pl',
    href: '/complete-registration',
  });

  if (!context.auth?.user) return context;

  console.log(context.auth?.user?.profileNeedsCompletion);

  if (context.auth?.user?.profileNeedsCompletion) {
    if (!context.req.nextUrl.pathname.endsWith(completeProfileUrl)) {
      const confirmPath = context.req.nextUrl.clone();
      const confirmUrl = new URL(confirmPath.pathname, context.req.url);

      return { ...context, res: NextResponse.redirect(confirmUrl) };
    }

    return context;
  }

  if (!context.req.nextUrl.pathname.endsWith(completeProfileUrl))
    return context;

  const url = context.req.nextUrl.clone();

  return { ...context, res: NextResponse.redirect('/dashboard') };
};
