import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

import { TestCreatorQuestion } from '../../types/question';

interface QuestionBulletProps {
  question: TestCreatorQuestion;
  index: number;
}

const QuestionBullet: FC<QuestionBulletProps> = ({ question, index }) => {
  return (
    <Button
      variant="outline"
      className="relative flex items-center space-x-2 rounded-full bg-gray-200 px-4 py-2 text-black transition-colors duration-200 ease-in-out hover:bg-gray-300"
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
