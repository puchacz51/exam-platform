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
        <div className="space-y-4">
          {attempts.data?.map((attempt) => {
            const endsAt = attempt.testAccess.endsAt || attempt.finishedAt;

            return (
              <div
                key={attempt.id}
                className="mb-4 rounded-lg bg-white p-4 shadow"
              >
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-medium">
                      {attempt.testAccess.test.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {endsAt && formatDate(endsAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{t('points')}:</span>{' '}
                    {attempt.totalPoints}
                  </div>
                  <Link
                    href={{
                      pathname: '/test-attempt/[id]/score',
                      params: { id: attempt.id },
                    }}
                    className="hover:underline"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
