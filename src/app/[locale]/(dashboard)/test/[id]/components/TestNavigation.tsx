import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface TestNavigationProps {
  currentGroupIndex: number;
  totalGroups: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const TestNavigation = ({
  currentGroupIndex,
  totalGroups,
  onPrevious,
  onNext,
}: TestNavigationProps) => {
  const t = useTranslations('dashboard.testViewer');

  return (
    <div className="flex w-full justify-between border-t p-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" /> {t('previousGroup')}
      </Button>
      <Button
        onClick={onNext}
        className="gap-2"
        disabled={currentGroupIndex >= totalGroups - 1}
      >
        {t('nextGroup')}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
