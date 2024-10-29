import React, { FC } from 'react';

import { cn } from '@/lib/utils';

import { useTestContext } from '../../store/storeContext';
import QuestionBullet from './QuestionBullet';

const QuestionList: FC = () => {
  const {
    currentQuestionGroupId,
    isQuestionGroupConfiguratorOpen,
    questionGroups,
  } = useTestContext((state) => state);

  const currentQuestionGroup = questionGroups.find(
    (group) => group.id === currentQuestionGroupId
  );
  const hasQuestions = (currentQuestionGroup?.questions?.length || 0) > 0;

  return (
    <div
      className={cn(
        'flex min-h-[60px] items-center space-x-4',
        isQuestionGroupConfiguratorOpen && 'col-start-1'
      )}
    >
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
  );
};

export default QuestionList;
