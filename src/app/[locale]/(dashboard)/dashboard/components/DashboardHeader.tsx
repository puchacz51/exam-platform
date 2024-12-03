import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export const DashboardHeader = () => {
  const t = useTranslations('dashboard.header');
  
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('welcome')}
        </p>
      </div>
      <Button
        className="w-full sm:w-auto"
        asChild
      >
        <Link
          href="/test-creator"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {t('createTest')}
        </Link>
      </Button>
    </div>
  );
};
