import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'pl',
  localePrefix:'never',
  localeDetection: true,
  pathnames : {
    "/":{
        en:"/home",
        pl:"/strona-glowna"
    }
  }
});
 
export const config = {
  matcher: [  '/((?!api|_next|_vercel|.*\\..*).*)']
};