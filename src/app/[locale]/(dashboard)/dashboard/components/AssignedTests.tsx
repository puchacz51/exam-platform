import { ChevronRight, ClipboardList } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/routing';

interface AssignedTest {
  id: string;
  title: string;
  startsAt: Date | null;
  endsAt: Date | null;
}

interface AssignedTestsProps {
  assignedTests: AssignedTest[];
}

const getTimeStatus = (startsAt: Date | null, endsAt: Date | null, t: any) => {
  if (!startsAt) return null;

  const now = new Date();
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;

  const hoursToStart = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursToStart > 0 && hoursToStart <= 24) {
    return t('startsIn', { hours: Math.round(hoursToStart) });
  }

  if (hoursToStart <= 0 && end) {
    const hoursToEnd = (end.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursToEnd > 0) {
      return t('endsIn', { hours: Math.round(hoursToEnd) });
    }
  }

  return null;
};

export const AssignedTests = ({ assignedTests }: AssignedTestsProps) => {
  const t = useTranslations('dashboard.assignedTests');

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t('title')}
          </h2>
          {assignedTests.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {t('subTitle', { count: assignedTests.length })}
            </p>
          )}
        </div>
      </div>
      <Separator className="my-4" />
      {assignedTests.length === 0 ? (
        <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            {t('empty')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignedTests.map((test) => (
            <div key={test.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h3 className="font-medium">{test.title}</h3>
                {!!test.startsAt && (
                  <p className="text-sm text-muted-foreground">
                    {getTimeStatus(test.startsAt, test.endsAt, t) ||
                      t('startDate', { date: new Date(test.startsAt).toLocaleDateString() })}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={{
                  pathname: '/test-attempt/start-screen/[id]',
                  params: { id: test.id },
                }}>
                  {t('attemptTest')} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
