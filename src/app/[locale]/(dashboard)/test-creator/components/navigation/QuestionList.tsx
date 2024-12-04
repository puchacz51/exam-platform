import React, { FC, useState } from 'react';

import { List, ListX } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import QuestionBullet from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';

const QuestionList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    currentQuestionGroupId,
    isQuestionGroupConfiguratorOpen,
    questionGroups,
  } = useTestContext((state) => state);

  const currentQuestionGroup = questionGroups.find(
    (group) => group.id === currentQuestionGroupId
  );
  const hasQuestions = (currentQuestionGroup?.questions?.length || 0) > 0;

  const questionsContent = (
    <div className="flex max-h-[70vh] flex-wrap gap-2 overflow-y-auto rounded-md bg-gray-50 p-4">
      {!hasQuestions ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 text-gray-500">
          <ListX className="h-8 w-8" />
          <p>Lista pytań jest pusta</p>
          <p className="text-sm">
            Kliknij &quot;Dodaj pytanie&quot; aby rozpocząć
          </p>
        </div>
      ) : (
        currentQuestionGroup?.questions?.map((question, index) => (
          <QuestionBullet
            key={question.id}
            question={question}
            questionGroupId={currentQuestionGroupId || ''}
            index={index}
          />
        ))
      )}
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <Dialog
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
            >
              <List className="mr-2 h-4 w-4" />
              Lista pytań
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] w-[95vw] p-4 sm:max-w-[425px]">
            <div className="h-full overflow-hidden">{questionsContent}</div>
          </DialogContent>
        </Dialog>
      </div>

      <div
        className={cn(
          'hidden flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:flex',
          isQuestionGroupConfiguratorOpen && 'col-start-1'
        )}
      >
        {questionsContent}
      </div>
    </>
  );
};

export default QuestionList;
