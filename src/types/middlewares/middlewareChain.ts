import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import { Locale } from '@/i18n/pathnames';

export type MiddlewareContext = {
  req: NextRequest & { auth?: Session };
  res: NextResponse | null;
  locale: Locale | null;
  auth: Session | null;
};

export type Middleware = (
  context: MiddlewareContext
) => Promise<MiddlewareContext>;
