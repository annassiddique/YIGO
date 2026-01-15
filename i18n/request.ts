import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {routingConfig} from './routing';

const locales = ['en', 'zh'];


 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routingConfig.locales, requested)
    ? requested
    : routingConfig.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});