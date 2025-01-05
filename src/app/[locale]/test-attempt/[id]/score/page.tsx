import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Target, Trophy } from 'lucide-react';

import { auth } from '@/next-auth/auth';
import { getUserPoints } from '@actions/attempt/helpers/getUserPoints';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import TestViewer from '@/app/[locale]/(dashboard)/test/[id]/components/TestViewer';
import { setAttemptPoints } from '@actions/attempt/helpers/setAttemptPoints';

const TestScorePage = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations('testAttempt.score');
  const session = await auth();
  let result = await getUserPoints(params.id);
  if (result.data && !result.data.attempt.finishedAt) {
    await setAttemptPoints(result.data.attempt.id);
    result = await getUserPoints(params.id);
  }
  const { data, error } = result;

  if (!session?.user.userID) {
    return <div>{t('unauthorized')}</div>;
  }

  if (error) {
    return <div>{t('error')}</div>;
  }

  if (!data) {
    return <div>{t('notFound')}</div>;
  }

  const { firstname, lastname } = session.user;
  const {
    receivedPoints,
    receivedPointsPercentage,
    attempt: {
      testAccess: { test },
    },
  } = data;

  const testSettings = test?.settings || {};

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <Badge
              variant="secondary"
              className="text-base"
            >
              {firstname} {lastname}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid items-center justify-center gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Trophy className="mx-auto mb-2 h-12 w-12 text-primary" />
                    <div className="mb-2 text-4xl font-bold text-primary">
                      {receivedPoints}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('totalScore')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Target className="mx-auto mb-2 h-12 w-12 text-primary" />
                    <div className="mb-2 text-4xl font-bold text-primary">
                      {receivedPointsPercentage}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('percentage')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>{t('statistics.category')}</TableCell>
                      <TableCell className="text-right">
                        {t('statistics.value')}
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{t('statistics.totalTime')}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatDuration(
                          data.attempt.finishedAt?.toString() ||
                            new Date().toString(),
                          data.attempt.startedAt?.toString() ||
                            new Date().toString()
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center gap-4">
        <Button asChild>
          <Link href="/dashboard">
            {t('buttons.backToDashboard')}{' '}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {testSettings?.showCorrectAnswers && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">{t('reviewAnswers')}</h2>
          <TestViewer testId={test.id} />
        </div>
      )}
    </div>
  );
};

const formatDuration = (end: string, start: string) => {
  console.log(end, start);
  const duration = new Date(end).getTime() - new Date(start).getTime();
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
};

export default TestScorePage;
