import React, { FC } from 'react';

import { ListX, Plus } from 'lucide-react';

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
        'flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm',
        isQuestionGroupConfiguratorOpen && 'col-start-1'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Lista pytań</h3>
        <Button
          className="flex items-center gap-2"
          onClick={handleAddNewQuestion}
          variant="default"
        >
          <Plus className="h-4 w-4" />
          Dodaj pytanie
        </Button>
      </div>

      <div className="flex min-h-[100px] flex-wrap gap-2 rounded-md bg-gray-50 p-4">
        {!hasQuestions ? (
          <div className="flex w-full flex-col items-center justify-center gap-2 text-gray-500">
            <ListX className="h-8 w-8" />
            <p>Lista pytań jest pusta</p>
            <p className="text-sm">Kliknij "Dodaj pytanie" aby rozpocząć</p>
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
