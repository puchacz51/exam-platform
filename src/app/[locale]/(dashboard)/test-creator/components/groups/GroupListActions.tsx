import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

export const GroupListActions = () => {
  const t = useTranslations('testCreator.actions');
  const setIsAiGeneratorOpen = useTestContext(
    (state) => state.setIsAiGeneratorOpen
  );
  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsAiGeneratorOpen(true)}
        className="flex items-center gap-2"
      >
        <Sparkles className="h-4 w-4" />
        {t('aiGenerator')}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addQuestionGroup()}
        className="flex items-center gap-2"
      >
        {t('addGroup')}
      </Button>
    </div>
  );
};
