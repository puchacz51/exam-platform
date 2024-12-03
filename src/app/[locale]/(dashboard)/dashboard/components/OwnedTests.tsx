import { ChevronRight, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/routing';

interface OwnedTest {
  testId: string;
  testTitle: string;
  accessType: string;
  groupName?: string | null;
}

interface OwnedTestsProps {
  ownedTests: OwnedTest[];
}

export const OwnedTests = ({ ownedTests }: OwnedTestsProps) => {
  const t = useTranslations('dashboard.ownedTests');

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t('title')}
          </h2>
          {ownedTests.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {t('subTitle', { count: ownedTests.length })}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          className="hidden sm:flex"
          asChild
        >
          <Link
            href="/test/assign"
            className="gap-2"
          >
            {t('assignTest')} <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Separator className="my-4" />
      {ownedTests.length === 0 ? (
        <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
          <Share2 className="h-8 w-8 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            {t('empty')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ownedTests.map((test) => (
            <div
              key={test.testId}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-medium">{test.testTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {test.groupName
                    ? t('assignedTo', { group: test.groupName })
                    : t('accessType', { type: test.accessType })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href="/test/assign">
                  {t('viewList')} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
