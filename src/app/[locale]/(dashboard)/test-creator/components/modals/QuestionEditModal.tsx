import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import TestCreatorQuestionsEditForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsEditForm';

export const QuestionEditModal = () => {
  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const setCurrentQuestion = useTestContext(
    (state) => state.setCurrentQuestion
  );

  return (
    <Dialog
      open={!!currentQuestion}
      onOpenChange={() => setCurrentQuestion(null)}
    >
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col p-0">
        <DialogHeader className="flex-shrink-0 border-b px-6 py-4">
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto px-6 py-4">
          <TestCreatorQuestionsEditForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
