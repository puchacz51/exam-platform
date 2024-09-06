import { auth } from '@/next-auth/auth';
import { Middleware } from '@/types/middlewares/middlewareChain';

export const authMiddleware: Middleware = async (context) => {
  const session = await auth();
  return { ...context, auth: session };
};
