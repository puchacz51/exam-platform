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
  <div className="flex justify-between border-t p-6">
    <Button
      variant="outline"
      onClick={onPrevious}
      disabled={currentGroupIndex === 0 || isChangeable}
      className="gap-2"
    >
      <ChevronLeft className="h-4 w-4" /> Previous Group
    </Button>

    {currentGroupIndex === totalGroups - 1 ? (
      <Button className="gap-2">
        Submit Test
        <ChevronRight className="h-4 w-4" />
      </Button>
    ) : (
      <Button
        onClick={onNext}
        className="gap-2"
      >
        Next Group
        <ChevronRight className="h-4 w-4" />
      </Button>
    )}
  </div>
);
