'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/app/[locale]/(dashboard)/test/components/pagination';
import { UserTestsResponse } from '@actions/test/getUserTests';

interface TestListProps {
  initialData: UserTestsResponse;
  onPageChange: (page: number) => Promise<UserTestsResponse>;
}

export const TestList = ({ initialData, onPageChange }: TestListProps) => {
  const [currentData, setCurrentData] = useState(initialData);

  const handlePageChange = async (page: number) => {
    const data = await onPageChange(page);
    setCurrentData(data);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentData.items.map((test) => (
          <Link
            key={test.id}
            href={`/test/${test.id}`}
            className="block"
          >
            <Card className="transition-all hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">
                  {test.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="line-clamp-2 text-sm text-muted-foreground">
                    {test.description || 'No description provided'}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {test.categories.map((category, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Questions:</span>
                      <span className="font-medium">{test.questionCount}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {format(new Date(test.createdAt), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {currentData.metadata.totalPages > 1 && (
        <Pagination
          currentPage={currentData.metadata.currentPage}
          totalPages={currentData.metadata.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
