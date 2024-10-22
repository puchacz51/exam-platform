import React, { FC } from 'react';

import { TestCreatorQuestion } from '../../types/question';

interface QuestionBulletProps {
  question: TestCreatorQuestion;
  index: number;
}

const QuestionBullet: FC<QuestionBulletProps> = ({ question, index }) => {
  return (
    <div className="flex items-center space-x-2 rounded bg-gray-100 p-2">
      <span className="font-bold">{index + 1}.</span>
      <span>{question.text}</span>
    </div>
  );
};

export default QuestionBullet;
