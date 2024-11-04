import React, { FC } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useTestContext } from '../../store/storeContext';
import QuestionBullet from './QuestionBullet';

const QuestionList: FC = () => {
  const {
    currentQuestionGroupId,
    isQuestionGroupConfiguratorOpen,
    questionGroups,
    setIsTestConfiguratorShowed,
    setIsQuestionConfiguratorOpen,
  } = useTestContext((state) => state);

  const handleAddNewQuestion = () => {
    setIsTestConfiguratorShowed(true);
    setIsQuestionConfiguratorOpen(true);
  };

  const currentQuestionGroup = questionGroups.find(
    (group) => group.id === currentQuestionGroupId
  );
  const hasQuestions = (currentQuestionGroup?.questions?.length || 0) > 0;

  return (
    <div
      className={cn(
        'grid min-h-[60px] grid-cols-[1fr_max-content] items-center space-x-4',
        isQuestionGroupConfiguratorOpen && 'col-start-1'
      )}
    >
      <div className="flex flex-nowrap gap-x-2 overflow-y-auto">
        {!hasQuestions ? (
          <p className="text-gray-500">Lista pytań jest pusta</p>
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
      <Button
        className="cursor-pointer whitespace-nowrap"
        onClick={handleAddNewQuestion}
      >
        Dodaj pytanie
      </Button>
    </div>
  );
};

export default QuestionList;
