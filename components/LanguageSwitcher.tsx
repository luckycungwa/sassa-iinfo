'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Language');

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t('label')}</span>
      <Globe className="w-4 h-4 text-ash pointer-events-none absolute left-2.5" aria-hidden />
      <select
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        aria-label={t('label')}
        className="appearance-none bg-fog/50 hover:bg-fog text-ash hover:text-ink text-xs font-bold pl-8 pr-7 py-2 rounded-[6px] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {t(l)}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 text-ash">▾</span>
    </label>
  );
}
