'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/navigation/usePagination';

interface PaginationControlsProps {}

export const PaginationControls = ({}: PaginationControlsProps) => {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  } = usePagination({});

  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={previousPage}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
        prev
      </Button>
      <span className="text-sm text-muted-foreground"></span>
      <Button
        variant="outline"
        size="sm"
        onClick={nextPage}
        disabled={!hasNextPage}
      >
        next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
