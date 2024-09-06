import { NextRequest, NextResponse } from 'next/server';

import { MiddlewareContext } from '@/types/middlewares/middlewareChain';

export type Middleware = (
  context: MiddlewareContext
) => Promise<MiddlewareContext>;
export type MiddlewareWithPattern = [Middleware, RegExp?];

export const chainMiddleware = (...middlewares: MiddlewareWithPattern[]) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    let context: MiddlewareContext = {
      req,
      res: null,
      locale: null,
      auth: null,
    };

    for (const [middleware, pattern] of middlewares) {
      // If there's no pattern, or the pattern matches the request pathname, run the middleware
      if (!pattern || pattern.test(req.nextUrl.pathname)) {
        context = await middleware(context);
        if (context.res) return context.res; // Exit early if a response is already set
      }
    }

    return context.res || NextResponse.next();
  };
};
