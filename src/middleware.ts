import { authMiddleware } from '@/app/middlewares/authMiddleware';
import { initlMiddleware } from '@/app/middlewares/initlMiddleware';
import { chainMiddleware } from '@/app/middlewares/middlewareChain';
import { profileCompletionMiddleware } from '@/app/middlewares/profileCompilationMiddleware';
import { protectedPathnames } from '@/i18n/pathnames';

const protectedRoutes = Object.keys(protectedPathnames)
  .filter(
    (path) =>
      protectedPathnames[
        path as keyof typeof protectedPathnames
      ].hasOwnProperty('en') &&
      protectedPathnames[
        path as keyof typeof protectedPathnames
      ].hasOwnProperty('pl')
  )
  .flatMap((path) => [
    (
      protectedPathnames[path as keyof typeof protectedPathnames] as {
        en: string;
      }
    ).en,
    (
      protectedPathnames[path as keyof typeof protectedPathnames] as {
        pl: string;
      }
    ).pl,
  ]);

const middleware = chainMiddleware(
  [initlMiddleware],
  [authMiddleware, new RegExp(`^(${protectedRoutes.join('|')})`)],
  [profileCompletionMiddleware]
);

export default middleware;
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
