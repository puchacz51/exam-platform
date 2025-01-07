import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import { UserFinishedAttemptResponse } from '@actions/attempt/getUserFinishedAttempt';

interface FinishedAttemptsProps {
  attempts: UserFinishedAttemptResponse;
}

export const FinishedAttempts = ({ attempts }: FinishedAttemptsProps) => {
  const t = useTranslations('dashboard.finishedAttempts');

  return (
    <Card className="rounded bg-white p-4 shadow sm:p-6">
      <div className="mb-4 rounded-lg bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">{t('title')}</h2>
        <p className="text-gray-500">{t('subtitle')}</p>
      </div>
      <Separator className="my-4" />
      {attempts.data?.length === 0 ? (
        <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
          <p className="text-center text-sm text-muted-foreground">
            {t('empty')}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {attempts.data?.map((attempt) => {
            const endsAt = attempt.finishedAt || attempt.testAccess.endsAt;

            return (
              <Link
                key={attempt.id}
                href={{
                  pathname: '/test-attempt/[id]/score',
                  params: { id: attempt.id },
                }}
                className="block rounded-lg bg-white transition-colors hover:bg-gray-50"
              >
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <h3 className="font-medium">
                        {attempt.testAccess.test.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {endsAt && formatDate(endsAt)}
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-semibold">{t('points')}:</span>{' '}
                      {attempt.totalPoints}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
};
