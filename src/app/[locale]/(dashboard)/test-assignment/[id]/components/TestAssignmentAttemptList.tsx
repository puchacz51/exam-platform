'use client';

import { FC, useState } from 'react';

import { useTranslations } from 'next-intl';
import { format } from 'date-fns';

import { useGetTestAttempts } from '@/hooks/useGetTestAttempts';
import { useGetAttemptDetails } from '@/hooks/useGetAttemptDetails';
import { TestAttemptsResponse } from '@actions/attempt/getTestAttempts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import AttemptDetailsView from './AttemptDetailsView';

interface TestAssignmentAttemptListProps {
  initialData: TestAttemptsResponse;
  maxPoints: number;
  testAccessId: string;
}

const TestAssignmentAttemptList: FC<TestAssignmentAttemptListProps> = ({
  initialData,
  maxPoints,
  testAccessId,
}) => {
  const t = useTranslations('dashboard.testAssignment.attemptList');
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(
    null
  );

  const { data } = useGetTestAttempts({
    testAccessId: testAccessId,
    limit: 100,
    page: 1,
    options: {
      initialData: {
        ...initialData,
        attempts: [...initialData.attempts],
      },
    },
  });

  const { data: attemptDetails } = useGetAttemptDetails(selectedAttemptId);

  const getRowStatus = (attempt: TestAttemptsResponse['attempts'][number]) => {
    const { startedAt, finishedAt, totalPoints } = attempt;
    if (!startedAt) return 'not-started';
    if (startedAt && !finishedAt) return 'in-progress';
    if (finishedAt && totalPoints == null) return 'finished-no-points';
    return 'finished-with-points';
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'not-started':
        return 'bg-gray-50';
      case 'in-progress':
        return 'bg-yellow-50';
      case 'finished-no-points':
        return 'bg-blue-50';
      case 'finished-with-points':
        return 'bg-green-50';
      default:
        return '';
    }
  };

  const handleViewDetails = (attemptId: string) => {
    setSelectedAttemptId(attemptId);
  };

  const handleCloseDetails = () => {
    setSelectedAttemptId(null);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('student')}</TableHead>
              <TableHead>{t('email')}</TableHead>
              <TableHead>{t('schoolIndex')}</TableHead>
              <TableHead>{t('startedAt')}</TableHead>
              <TableHead>{t('finishedAt')}</TableHead>
              <TableHead>{t('points')}</TableHead>
              <TableHead>{t('maxPoints')}</TableHead>
              <TableHead>{t('percents')}</TableHead>
              <TableHead>Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.attempts.map((attempt) => {
              const status = getRowStatus(attempt);
              return (
                <TableRow
                  key={attempt.id}
                  className={cn(getStatusStyles(status))}
                >
                  {' '}
                  <TableCell className="font-medium">
                    {attempt?.user?.firstname} {attempt?.user?.lastname}
                  </TableCell>
                  <TableCell>{attempt?.user?.email}</TableCell>
                  <TableCell>{attempt?.user?.schoolIndex ?? '-'}</TableCell>
                  <TableCell>
                    {attempt.startedAt
                      ? format(new Date(attempt.startedAt), 'dd/MM/yyyy HH:mm')
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {attempt.finishedAt
                      ? format(new Date(attempt.finishedAt), 'dd/MM/yyyy HH:mm')
                      : '-'}
                  </TableCell>
                  <TableCell>{attempt.totalPoints ?? '-'}</TableCell>
                  <TableCell>{maxPoints}</TableCell>
                  <TableCell>
                    {attempt.totalPoints && maxPoints
                      ? ((attempt.totalPoints / maxPoints) * 100).toFixed(2) +
                        '%'
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {attempt.startedAt && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(attempt.id)}
                      >
                        Podgląd odpowiedzi
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AttemptDetailsView
        attempt={attemptDetails || null}
        isOpen={!!selectedAttemptId}
        onClose={handleCloseDetails}
      />
    </>
  );
};

export default TestAssignmentAttemptList;
