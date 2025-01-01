'use client';

import { FC } from 'react';

import { useTranslations } from 'next-intl';
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
  maxPoints: number;
}

const TestAssignmentAttemptList: FC<TestAssignmentAttemptListProps> = ({
  initialData,
  maxPoints,
}) => {
  const t = useTranslations('dashboard.testAssignment.attemptList');

  const mockAttempts = [
    { 
      id: 'mock-1',
      testAccessId: 'fake-1',
      userId: 'user-1',
      startedAt: new Date('2024-12-01T10:00:00Z'),
      finishedAt: new Date('2024-12-01T10:30:00Z'),
      totalPoints: 15,
      user: {
        id: 'user-1',
        firstname: 'Adam',
        lastname: 'Nowak',
        email: 'adam.nowak@example.com'
      }
    },
    { 
      id: 'mock-2',
      testAccessId: 'fake-2',
      userId: 'user-2',
      startedAt: new Date('2024-12-02T10:00:00Z'),
      finishedAt: new Date('2024-12-02T10:30:00Z'),
      totalPoints: 18,
      user: {
        id: 'user-2',
        firstname: 'Ewa',
        lastname: 'Kowalska',
        email: 'ewa.kowalska@example.com'
      }
    },
    { 
      id: 'mock-3',
      testAccessId: 'fake-3',
      userId: 'user-3',
      startedAt: new Date('2024-12-03T10:00:00Z'),
      finishedAt: new Date('2024-12-03T10:30:00Z'),
      totalPoints: 12,
      user: {
        id: 'user-3',
        firstname: 'Jan',
        lastname: 'Zieliński',
        email: 'jan.zielinski@example.com'
      }
    },
    { 
      id: 'mock-4',
      testAccessId: 'fake-4',
      userId: 'user-4',
      startedAt: new Date('2024-12-04T10:00:00Z'),
      finishedAt: new Date('2024-12-04T10:30:00Z'),
      totalPoints: 20,
      user: {
        id: 'user-4',
        firstname: 'Maria',
        lastname: 'Wójcik',
        email: 'maria.wojcik@example.com'
      }
    },
    { 
      id: 'mock-5',
      testAccessId: 'fake-5',
      userId: 'user-5',
      startedAt: new Date('2024-12-05T10:00:00Z'),
      finishedAt: new Date('2024-12-05T10:30:00Z'),
      totalPoints: 16,
      user: {
        id: 'user-5',
        firstname: 'Piotr',
        lastname: 'Kowal',
        email: 'piotr.kowal@example.com'
      }
    },
    { 
      id: 'mock-6',
      testAccessId: 'fake-6',
      userId: 'user-6',
      startedAt: new Date('2024-12-06T10:00:00Z'),
      finishedAt: new Date('2024-12-06T10:30:00Z'),
      totalPoints: 19,
      user: {
        id: 'user-6',
        firstname: 'Anna',
        lastname: 'Lewandowska',
        email: 'anna.lewandowska@example.com'
      }
    },
    { 
      id: 'mock-7',
      testAccessId: 'fake-7',
      userId: 'user-7',
      startedAt: new Date('2024-12-07T10:00:00Z'),
      finishedAt: new Date('2024-12-07T10:30:00Z'),
      totalPoints: 14,
      user: {
        id: 'user-7',
        firstname: 'Tomasz',
        lastname: 'Kaczmarek',
        email: 'tomasz.kaczmarek@example.com'
      }
    },
    { 
      id: 'mock-8',
      testAccessId: 'fake-8',
      userId: 'user-8',
      startedAt: new Date('2024-12-08T10:00:00Z'),
      finishedAt: new Date('2024-12-08T10:30:00Z'),
      totalPoints: 17,
      user: {
        id: 'user-8',
        firstname: 'Karolina',
        lastname: 'Wiśniewska',
        email: 'karolina.wisniewska@example.com'
      }
    },
    { 
      id: 'mock-9',
      testAccessId: 'fake-9',
      userId: 'user-9',
      startedAt: new Date('2024-12-09T10:00:00Z'),
      finishedAt: new Date('2024-12-09T10:30:00Z'),
      totalPoints: 13,
      user: {
        id: 'user-9',
        firstname: 'Michał',
        lastname: 'Dąbrowski',
        email: 'michal.dabrowski@example.com'
      }
    },
    { 
      id: 'mock-10',
      testAccessId: 'fake-10',
      userId: 'user-10',
      startedAt: new Date('2024-12-10T10:00:00Z'),
      finishedAt: new Date('2024-12-10T10:30:00Z'),
      totalPoints: 20,
      user: {
        id: 'user-10',
        firstname: 'Agnieszka',
        lastname: 'Szymańska',
        email: 'agnieszka.szymanska@example.com'
      }
    },
    { 
      id: 'mock-11',
      testAccessId: 'fake-11',
      userId: 'user-11',
      startedAt: new Date('2024-12-11T10:00:00Z'),
      finishedAt: new Date('2024-12-11T10:30:00Z'),
      totalPoints: 15,
      user: {
        id: 'user-11',
        firstname: 'Krzysztof',
        lastname: 'Walczak',
        email: 'krzysztof.walczak@example.com'
      }
    },
    { 
      id: 'mock-12',
      testAccessId: 'fake-12',
      userId: 'user-12',
      startedAt: new Date('2024-12-12T10:00:00Z'),
      finishedAt: new Date('2024-12-12T10:30:00Z'),
      totalPoints: 18,
      user: {
        id: 'user-12',
        firstname: 'Magdalena',
        lastname: 'Adamczyk',
        email: 'magdalena.adamczyk@example.com'
      }
    },
    { 
      id: 'mock-13',
      testAccessId: 'fake-13',
      userId: 'user-13',
      startedAt: new Date('2024-12-13T10:00:00Z'),
      finishedAt: new Date('2024-12-13T10:30:00Z'),
      totalPoints: 16,
      user: {
        id: 'user-13',
        firstname: 'Bartosz',
        lastname: 'Pawlak',
        email: 'bartosz.pawlak@example.com'
      }
    },
    { 
      id: 'mock-14',
      testAccessId: 'fake-14',
      userId: 'user-14',
      startedAt: new Date('2024-12-14T10:00:00Z'),
      finishedAt: new Date('2024-12-14T10:30:00Z'),
      totalPoints: 19,
      user: {
        id: 'user-14',
        firstname: 'Natalia',
        lastname: 'Górska',
        email: 'natalia.gorska@example.com'
      }
    },
    { 
      id: 'mock-15',
      testAccessId: 'fake-15',
      userId: 'user-15',
      startedAt: new Date('2024-12-15T10:00:00Z'),
      finishedAt: new Date('2024-12-15T10:30:00Z'),
      totalPoints: 14,
      user: {
        id: 'user-15',
        firstname: 'Wojciech',
        lastname: 'Rutkowski',
        email: 'wojciech.rutkowski@example.com'
      }
    },
    { 
      id: 'mock-16',
      testAccessId: 'fake-16',
      userId: 'user-16',
      startedAt: new Date('2024-12-16T10:00:00Z'),
      finishedAt: new Date('2024-12-16T10:30:00Z'),
      totalPoints: 17,
      user: {
        id: 'user-16',
        firstname: 'Aleksandra',
        lastname: 'Michalska',
        email: 'aleksandra.michalska@example.com'
      }
    },
    { 
      id: 'mock-17',
      testAccessId: 'fake-17',
      userId: 'user-17',
      startedAt: new Date('2024-12-17T10:00:00Z'),
      finishedAt: new Date('2024-12-17T10:30:00Z'),
      totalPoints: 15,
      user: {
        id: 'user-17',
        firstname: 'Marcin',
        lastname: 'Szewczyk',
        email: 'marcin.szewczyk@example.com'
      }
    },
    { 
      id: 'mock-18',
      testAccessId: 'fake-18',
      userId: 'user-18',
      startedAt: new Date('2024-12-18T10:00:00Z'),
      finishedAt: new Date('2024-12-18T10:30:00Z'),
      totalPoints: 18,
      user: {
        id: 'user-18',
        firstname: 'Patrycja',
        lastname: 'Zawadzka',
        email: 'patrycja.zawadzka@example.com'
      }
    },
    { 
      id: 'mock-19',
      testAccessId: 'fake-19',
      userId: 'user-19',
      startedAt: new Date('2024-12-19T10:00:00Z'),
      finishedAt: new Date('2024-12-19T10:30:00Z'),
      totalPoints: 16,
      user: {
        id: 'user-19',
        firstname: 'Kamil',
        lastname: 'Jabłoński',
        email: 'kamil.jablonski@example.com'
      }
    },
    { 
      id: 'mock-20',
      testAccessId: 'fake-20',
      userId: 'user-20',
      startedAt: new Date('2024-12-20T10:00:00Z'),
      finishedAt: new Date('2024-12-20T10:30:00Z'),
      totalPoints: 20,
      user: {
        id: 'user-20',
        firstname: 'Dominika',
        lastname: 'Mazur',
        email: 'dominika.mazur@example.com'
      }
    }
  ] as const;

  const { data } = useGetTestAttempts({
    testAccessId: 'fake-1',
    limit: 100,
    page: 1,
    options: {
      initialData: {
        ...initialData,
        attempts: [...initialData.attempts, ...mockAttempts],
      },
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
            <TableHead>{t('student')}</TableHead>
            <TableHead>{t('email')}</TableHead>
            <TableHead>{t('startedAt')}</TableHead>
            <TableHead>{t('finishedAt')}</TableHead>
            <TableHead>{t('points')}</TableHead>
            <TableHead>{t('maxPoints')}</TableHead>
            <TableHead>{t('percents')}</TableHead>
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
                <TableCell>{data.maxPoints}</TableCell>
                <TableCell>
                  {attempt.totalPoints && maxPoints
                    ? ((attempt.totalPoints / maxPoints) * 100).toFixed(2) + '%'
                    : '-'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestAssignmentAttemptList;
