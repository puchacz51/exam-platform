import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to your test management dashboard
        </p>
      </div>
      <Button
        className="w-full sm:w-auto"
        asChild
      >
        <Link
          href="/test-creator"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Test
        </Link>
      </Button>
    </div>
  );
};
