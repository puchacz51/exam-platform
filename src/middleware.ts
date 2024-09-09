import { authMiddleware } from '@/app/middlewares/authMiddleware';
import { initlMiddleware } from '@/app/middlewares/initlMiddleware';
import { chainMiddleware } from '@/app/middlewares/middlewareChain';
import { profileCompletionMiddleware } from '@/app/middlewares/profileCompilationMiddleware';

const middleware = chainMiddleware(
  [initlMiddleware],
  [authMiddleware],
  [profileCompletionMiddleware]
);

export default middleware;
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
