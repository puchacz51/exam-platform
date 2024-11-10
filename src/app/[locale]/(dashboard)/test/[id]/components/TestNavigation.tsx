import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TestNavigationProps {
  currentGroupIndex: number;
  totalGroups: number;
  isChangeable: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const TestNavigation = ({
  currentGroupIndex,
  totalGroups,
  isChangeable,
  onPrevious,
  onNext,
}: TestNavigationProps) => (
  <div className="flex w-full justify-between border-t p-6">
    <Button
      variant="outline"
      onClick={onPrevious}
      disabled={currentGroupIndex === 0 || isChangeable}
      className="gap-2"
    >
      <ChevronLeft className="h-4 w-4" /> Previous Group
    </Button>
    <Button
      onClick={onNext}
      className="gap-2"
      disabled={currentGroupIndex >= totalGroups - 1}
    >
      Next Group
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);
