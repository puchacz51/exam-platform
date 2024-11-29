import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import { authConfigWithProviders } from '@/next-auth/authWithoutProviders';
import { Middleware } from '@/types/middlewares/middlewareChain';
import { Locale, pathnames } from '@/i18n/pathnames';

const { auth } = NextAuth(authConfigWithProviders);

export const authMiddleware: Middleware = async (context) => {
  const session = await auth();
  const locale = context.req.nextUrl.locale || 'en';

  if (!session) {
    const loginPath = pathnames['/login'][locale as Locale];
    const loginUrl = new URL(loginPath, context.req.url);
    loginUrl.searchParams.set('returnUrl', context.req.nextUrl.pathname);
    
    return {
      ...context,
      res: NextResponse.redirect(loginUrl.toString()),
    };
  }

  const authPaths = [
    pathnames['/login'].en,
    pathnames['/register'].en,
    pathnames['/verify-email'].en,
    pathnames['/login'].pl,
    pathnames['/register'].pl,
    pathnames['/verify-email'].pl,
  ] as string[];
  if (authPaths.includes(context.req.nextUrl.pathname)) {
    const dashboardPath = pathnames['/dashboard'][locale as Locale];

    return {
      ...context,
      res: NextResponse.redirect(dashboardPath),
    };
  }

  return { ...context, auth: session };
};
