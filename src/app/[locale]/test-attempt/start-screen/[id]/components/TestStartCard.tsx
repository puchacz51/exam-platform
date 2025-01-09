'use client';

import { useState } from 'react';

import { Calendar, Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from '@/i18n/routing';
import { createUserAttempt } from '@actions/attempt/createUserAttempt';

interface TestStartCardProps {
  title: string;
  description: string;
  timeLimit?: number;
  hasStarted: boolean;
  startDate: Date;
  testId: string;
}

export const TestStartCard = ({
  title,
  description,
  timeLimit,
  hasStarted,
  startDate,
  testId,
}: TestStartCardProps) => {
  const t = useTranslations('testAttempt');
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();
  const handleStart = async () => {
    setIsStarting(true);
    const { data } = await createUserAttempt(testId);
    if (data) {
      router.replace({
        pathname: '/test-attempt/[id]',
        params: { id: data.testAccessId },
      });
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4 border-b pb-6">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">
                {title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {description}
              </CardDescription>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              {timeLimit && (
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>
                    {t('timeLimit')}: {timeLimit} {t('minutes')}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {hasStarted ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-green-700">{t('testAvailable')}</p>
                </div>
                <Button
                  onClick={handleStart}
                  disabled={isStarting}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  {t('startTest')}
                </Button>
              </div>
            ) : (
              <Alert className="border-2">
                <Calendar className="h-4 w-4" />
                <AlertTitle className="font-semibold">
                  {t('testNotStarted')}
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="font-medium">
                    {t('scheduledStart')}: {startDate?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t('comeBackLater')}
                  </p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
