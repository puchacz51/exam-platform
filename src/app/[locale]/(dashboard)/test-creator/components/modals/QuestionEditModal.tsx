import React from 'react';

import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import TestCreatorQuestionsEditForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsEditForm';

export const QuestionEditModal = () => {
  const t = useTranslations('testCreator.modals');
  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const setCurrentQuestion = useTestContext(
    (state) => state.setCurrentQuestion
  );
  const updateQuestion = useTestContext((state) => state.updateQuestion);
  const handleRemoveQuestion = () => {
    updateQuestion(
      currentQuestion?.groupId || '',
      currentQuestion?.id || '',
      null
    );
  };
  return (
    <Dialog
      open={!!currentQuestion}
      onOpenChange={() => setCurrentQuestion(null)}
    >
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col p-0">
        <DialogHeader className="flex flex-shrink-0 items-center justify-between border-b px-6 py-4">
          <DialogTitle>{t('editQuestion')}</DialogTitle>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              handleRemoveQuestion();
              setCurrentQuestion(null);
            }}
          >
            {t('deleteQuestion')}
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-auto px-6 py-4">
          <TestCreatorQuestionsEditForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
