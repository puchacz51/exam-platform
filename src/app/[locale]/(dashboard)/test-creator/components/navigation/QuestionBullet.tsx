import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { TestCreatorQuestion } from '../../types/question';
import { useTestContext } from '../../store/storeContext';

interface QuestionBulletProps {
  question: TestCreatorQuestion;
  questionGroupId: string;
  index: number;
}

const QuestionBullet: FC<QuestionBulletProps> = ({
  question,
  index,
  questionGroupId,
}) => {
  const setCurrentQuestion = useTestContext(
    (state) => state.setCurrentQuestion
  );
  const currentQuestion = useTestContext((state) => state.currentQuestion);

  return (
    <Button
      onClick={() => setCurrentQuestion(questionGroupId, question.id)}
      variant="outline"
      className={cn(
        '"relative hover:bg-gray-300" flex items-center space-x-2 rounded-full bg-gray-200 px-4 py-2 text-black transition-colors duration-200 ease-in-out',
        currentQuestion?.id === question.id && 'bg-green-500 text-white'
      )}
    >
      <span className="font-bold">{index + 1}.</span>
      <span className="max-w-[150px] overflow-hidden truncate whitespace-nowrap">
        {question.text}
      </span>
      <div className="absolute left-0 top-full mt-2 hidden w-max max-w-xs rounded bg-white p-2 text-sm shadow-lg group-hover:block">
        {question.text}
      </div>
    </Button>
  );
};

export default QuestionBullet;
