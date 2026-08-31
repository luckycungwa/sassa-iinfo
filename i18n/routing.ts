import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zu', 'xh', 'af'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});
