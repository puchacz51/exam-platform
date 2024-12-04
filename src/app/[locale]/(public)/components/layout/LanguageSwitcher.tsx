'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'pl' : 'en';
    router.replace(pathname as '/login', { locale: newLocale });
  };

  return (
    <Button
      variant="ghost"
      onClick={switchLocale}
    >
      {locale === 'en' ? '🇵🇱 PL' : '🇬🇧 EN'}
    </Button>
  );
};
