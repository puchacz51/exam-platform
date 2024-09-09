import NextAuth from 'next-auth';

import { authConfigWithProviders } from '@/next-auth/authWithoutProviders';
import { Middleware } from '@/types/middlewares/middlewareChain';

const { auth } = NextAuth(authConfigWithProviders);

export const authMiddleware: Middleware = async (context) => {
  const session = await auth();
  return { ...context, auth: session };
};
