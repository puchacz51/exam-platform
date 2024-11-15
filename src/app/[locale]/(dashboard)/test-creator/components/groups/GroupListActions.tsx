import { Button } from '@/components/ui/button';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { Sparkles } from 'lucide-react';

export const GroupListActions = () => {
  const setIsAiGeneratorOpen = useTestContext(
    (state) => state.setIsAiGeneratorOpen
  );
  const setCurrentQuestionGroup = useTestContext(
    (state) => state.setCurrentQuestionGroup
  );

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsAiGeneratorOpen(true)}
        className="flex items-center gap-2"
      >
        <Sparkles className="h-4 w-4" />
        AI Generator
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentQuestionGroup(null)}
        className="flex items-center gap-2"
      >
        Add Group
      </Button>
    </div>
  );
};
