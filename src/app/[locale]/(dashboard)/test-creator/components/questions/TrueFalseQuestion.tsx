import React, { FC } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { QuestionProps } from '../types';

const TrueFalseQuestion: FC<QuestionProps> = ({
  question,
  answers,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.content}</p>
      <RadioGroup
        value={answers[0]}
        onValueChange={(value) => onAnswerChange([value])}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="true"
            id="true"
          />
          <label htmlFor="true">Prawda</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="false"
            id="false"
          />
          <label htmlFor="false">Fałsz</label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TrueFalseQuestion;
