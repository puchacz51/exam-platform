import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTestContext } from '../../store/storeContext';
import TestCreatorQuestionsEditForm from '../TestCreatorQuestionsEditForm';
import { ScrollArea } from '@/components/ui/scroll-area';

export const QuestionEditModal = () => {
  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const setCurrentQuestion = useTestContext((state) => state.setCurrentQuestion);

  return (
    <Dialog open={!!currentQuestion} onOpenChange={() => setCurrentQuestion(null)}>
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col p-0">
        <DialogHeader className="flex-shrink-0 px-6 py-4 border-b">
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-6 py-4">
              <TestCreatorQuestionsEditForm />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};