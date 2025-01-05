import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export const HomePageBanner = () => {
  const t = useTranslations('home');

  return (
    <div className="relative isolate flex grow items-center justify-center px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/dashboard">
              <Button
                variant="default"
                size="lg"
              >
                {t('buttons.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
