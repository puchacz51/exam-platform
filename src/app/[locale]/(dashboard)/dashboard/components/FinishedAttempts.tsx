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
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {t('title')}
        </h2>
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
                  <span className="font-semibold">points:</span>{' '}
                  {attempt.totalPoints}
                </div>
                <Link
                  href={{
                    pathname: '/test-attempt/[id]/score',
                    params: { id: attempt.id },
                  }}
                  className="text-blue-500 hover:underline"
                >
                  {t('viewDetails')}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
