import { ChevronRight, ClipboardList } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/routing';

interface AssignedTestsProps {
  assignedTests: string[];
}

export const AssignedTests = ({ assignedTests }: AssignedTestsProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Assigned Tests
        </h2>
        <Button
          variant="ghost"
          className="hidden sm:flex"
          asChild
        >
          <Link
            href="/"
            className="gap-2"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Separator className="my-4" />
      {assignedTests.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            No tests assigned to you
          </p>
        </div>
      ) : (
        <div className="space-y-4"></div>
      )}
      <Button
        variant="ghost"
        className="mt-4 w-full sm:hidden"
        asChild
      >
        <Link
          href="/test-assigment"
          className="gap-2"
        >
          View All Assigned <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
};
