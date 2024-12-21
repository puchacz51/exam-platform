import { ChevronRight, FolderPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TestWithCategory } from '@/types/test/testWithCategory';
import { TestItem } from '@/app/[locale]/(dashboard)/dashboard/components/RecentTests/TestItem';

interface RecentTestsProps {
  tests: TestWithCategory[];
}

export const RecentTests = ({ tests }: RecentTestsProps) => {
  const t = useTranslations('dashboard.recentTests');
  const hasTests = tests.length > 0;

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {t('title')}
        </h2>
        {hasTests && (
          <Button
            variant="ghost"
            className="hidden sm:flex"
            asChild
          >
            <Link
              href="/test"
              className="gap-2"
            >
              {t('viewAll')} <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      <Separator className="my-4" />
      {!hasTests ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed bg-muted/10">
          <FolderPlus className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
              {t('empty.title')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('empty.description')}
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            asChild
          >
            <Link href="/test-creator">{t('empty.action')}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {tests.map((test) => (
              <TestItem
                key={test.id}
                test={test}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            className="mt-6 w-full sm:hidden"
            asChild
          >
            <Link
              href="/test"
              className="gap-2"
            >
              View All Tests <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </>
      )}
    </Card>
  );
};
