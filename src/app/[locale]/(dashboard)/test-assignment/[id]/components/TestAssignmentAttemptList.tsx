'use client';

import { FC } from 'react';

import { format } from 'date-fns';

import { useGetTestAttempts } from '@/hooks/useGetTestAttempts';
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

interface TestAssignmentAttemptListProps {
  initialData: TestAttemptsResponse;
}

const TestAssignmentAttemptList: FC<TestAssignmentAttemptListProps> = ({
  initialData,
}) => {
  console.log(initialData);
  const { data } = useGetTestAttempts({
    testAccessId: initialData.attempts[0].testAccessId,
    limit: 10,
    page: 1,
    options: {
      initialData,
    },
  });

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Finished At</TableHead>
            <TableHead>Total Points</TableHead>
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
                <TableCell className="font-medium">
                  {attempt?.user?.firstname} {attempt?.user?.lastname}
                </TableCell>
                <TableCell>{attempt?.user?.email}</TableCell>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestAssignmentAttemptList;
