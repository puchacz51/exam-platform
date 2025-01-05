import React, { FC } from 'react';

import { useTranslations } from 'next-intl';

import { Checkbox } from '@/components/ui/checkbox';

import { QuestionProps } from '../types';

const MultipleChoiceQuestion: FC<QuestionProps> = ({
  question,
  answers,
  onAnswerChange,
}) => {
  const t = useTranslations('testCreator.questions.multipleChoice');

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.content}</p>
      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id={`option-${index}`}
              checked={answers.includes(option)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onAnswerChange([...answers, option]);
                } else {
                  onAnswerChange(answers.filter((a) => a !== option));
                }
              }}
            />
            <label htmlFor={`option-${index}`}>
              {t('answerPlaceholder', { number: index + 1 })}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
