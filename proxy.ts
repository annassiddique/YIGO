// proxy.ts
import createMiddleware from 'next-intl/middleware';
import {routingConfig} from './i18n/routing';

export default createMiddleware(routingConfig);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

