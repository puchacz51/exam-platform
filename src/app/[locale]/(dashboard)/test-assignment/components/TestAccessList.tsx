'use client';
import { FC, HTMLAttributes, useState } from 'react';

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Search, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';
import { TestAccessForm } from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessForm';
import { useOwnedAccessQuery } from '@/hooks/useGetOwnedAccessQuery';
import { usePagination } from '@/hooks/navigation/usePagination';
import { PaginationControls } from '@/app/[locale]/components/navigation/PaginationControls';
import { cn } from '@/lib/utils';
import TestAccessListHeader from '@/app/[locale]/(dashboard)/test-assignment/components/TestAccessListHeader';
import { Link } from '@/i18n/routing';

const ITEMS_PER_PAGE = 10;
interface TestAccessListProps extends HTMLAttributes<HTMLDivElement> {}

export const TestAccessList: FC<TestAccessListProps> = ({ className }) => {
  const t = useTranslations('testAssignment.list');
  const { isLoading, error, data } = useOwnedAccessQuery();

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-center text-red-500">
          Failed to load assignments
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <TestAccessListHeader />
      <Separator className="my-4" />

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {!!error && (
            <div className="text-center text-red-500">
              Failed to load assignments
            </div>
          )}

          {!!data?.assignments && (
            <div className="space-y-4">
              {data.assignments.map((assignment) => (
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
                        <Link href={`/test-assignment`}>
                          <Button variant="outline">View</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <PaginationControls />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
