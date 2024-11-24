import Link from 'next/link';
import { ChevronRight, FolderPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TestWithCategory } from '@/types/test/testWithCategory';
import { formatDate } from '@/lib/utils';

interface RecentTestsProps {
  tests: TestWithCategory[];
}

export const RecentTests = ({ tests }: RecentTestsProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Recent Tests
        </h2>
        <Button
          variant="ghost"
          className="hidden sm:flex"
          asChild
        >
          <Link
            href="/tests"
            className="gap-2"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Separator className="my-4" />
      {tests.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
          <FolderPlus className="h-8 w-8 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            No tests created yet
          </p>
          <Button
            variant="secondary"
            size="sm"
            asChild
          >
            <Link href="/test-creator">Create your first test</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tests.map((test) => (
            <Link
              key={test.id}
              href={`/test/${test.id}`}
              className="block"
            >
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex justify-between">
                  <h3 className="font-medium">{test.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(test.createdAt)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {test.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {test.questionCount} questions
                  </span>
                  •
                  <span className="text-sm text-muted-foreground">
                    {test.categories.join(', ')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        className="mt-4 w-full sm:hidden"
        asChild
      >
        <Link
          href="/tests"
          className="gap-2"
        >
          View All Tests <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
};
