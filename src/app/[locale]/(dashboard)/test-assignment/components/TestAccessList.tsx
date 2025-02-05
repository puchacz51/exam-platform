'use client';
import { FC, HTMLAttributes } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useOwnedAccessQuery } from '@/hooks/useGetOwnedAccessQuery';
import { PaginationControls } from '@/app/[locale]/components/navigation/PaginationControls';
import { cn } from '@/lib/utils';
import TestAccessListHeader from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessListHeader';
import { Link } from '@/i18n/routing';

interface TestAccessListProps extends HTMLAttributes<HTMLDivElement> {}

export const TestAccessList: FC<TestAccessListProps> = ({ className }) => {
  const t = useTranslations('testAssignment.list');
  const tAccessList = useTranslations('testAssignment');
  const { isLoading, error, data } = useOwnedAccessQuery();

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-center text-red-500">{t('failedToLoad')}</div>
      </Card>
    );
  }
  console.log(data);
  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <TestAccessListHeader />
      <Separator className="my-4" />

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="text-muted-foreground">{t('loading')}</div>
        </div>
      ) : (
        <div className="space-y-4">
          {!!error && (
            <div className="text-center text-red-500">{t('failedToLoad')}</div>
          )}

          {!!data?.items && (
            <div className="space-y-4">
              {data.items.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {assignment.testTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.testDescription}
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>
                            Start:{' '}
                            {new Date(
                              assignment.startAt || ''
                            ).toLocaleString()}
                          </p>
                          <p>
                            End:{' '}
                            {new Date(assignment.endAt || '').toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link
                          href={{
                            pathname: '/test-assignment/[id]',
                            params: { id: assignment.id },
                          }}
                        >
                          <Button variant="outline">{t('view')}</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <PaginationControls totalPages={data.metadata.totalPages} />
            </div>
          )}

          {!data?.items && (
            <div className="text-center">
              <h2>{tAccessList('list.title')}</h2>
              <p>{tAccessList('list.noAssignments')}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
