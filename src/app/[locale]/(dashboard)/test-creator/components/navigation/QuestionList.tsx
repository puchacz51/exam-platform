import React, { FC } from 'react';

import { ListX, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import QuestionBullet from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionBullet';

const QuestionList: FC = () => {
  const {
    currentQuestionGroupId,
    isQuestionGroupConfiguratorOpen,
    questionGroups,
    setIsTestConfiguratorOpen,
  } = useTestContext((state) => state);

  const currentQuestionGroup = questionGroups.find(
    (group) => group.id === currentQuestionGroupId
  );
  const hasQuestions = (currentQuestionGroup?.questions?.length || 0) > 0;

  const handleAddNewQuestion = () => {
    setIsTestConfiguratorOpen(true);
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md',
        isQuestionGroupConfiguratorOpen && 'col-start-1'
      )}
    >
      <div className="flex flex-wrap gap-2 rounded-md bg-gray-50 p-4">
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
    </div>
  );
};

export default QuestionList;
