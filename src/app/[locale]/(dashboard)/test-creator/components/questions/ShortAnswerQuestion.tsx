import React, { FC } from 'react';

import { Input } from '@/components/ui/input';

import { QuestionProps } from '../types';

const ShortAnswerQuestion: FC<QuestionProps> = ({
  question,
  answers,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.content}</p>
      <Input
        type="text"
        value={answers[0] || ''}
        onChange={(e) => onAnswerChange([e.target.value])}
        placeholder="Wpisz krótką odpowiedź..."
        className="max-w-md"
      />
    </div>
  );
};

export default ShortAnswerQuestion;
