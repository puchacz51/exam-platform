import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

export type MiddlewareContext = {
  req: NextRequest;
  res: NextResponse | null;
  locale: string | null;
  auth: Session | null;
};

export type Middleware = (
  context: MiddlewareContext
) => Promise<MiddlewareContext>;
