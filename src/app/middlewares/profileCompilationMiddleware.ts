import { NextResponse } from 'next/server';

import { Middleware } from '@/types/middlewares/middlewareChain';

export const profileCompletionMiddleware: Middleware = async (context) => {
  if (context.auth?.user?.profileNeedsCompletion) {
    if (!context.req.nextUrl.pathname.endsWith('/complete-profile')) {
      const url = context.req.nextUrl.clone();
      url.pathname = `/${context.locale}/complete-profile`;
      return { ...context, res: NextResponse.redirect(url) };
    }
  }
  return context;
};
