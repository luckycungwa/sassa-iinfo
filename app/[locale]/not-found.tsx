import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <img src="/main-logo.svg" alt="SASSA Grant Guide" className="w-16 h-16 mb-6" />
      <h1 className="text-4xl font-black tracking-tight text-ink mb-2">{t('title')}</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">{t('description')}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-violet hover:opacity-90 text-white font-bold rounded-xl transition text-sm"
      >
        {t('home')}
      </Link>
    </div>
  );
}
