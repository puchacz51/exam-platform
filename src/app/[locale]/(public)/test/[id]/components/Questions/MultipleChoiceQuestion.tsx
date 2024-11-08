import { FC } from 'react';

import { Checkbox } from '@radix-ui/react-checkbox';

import { Label } from '@/components/ui/label';
import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

const MultipleChoiceQuestion: FC<{ question: QuestionType }> = ({
  question,
}) => {
  return (
    <div className="space-y-3">
      {question.answers?.map((answer) => (
        <div
          key={answer.id}
          className="flex items-center space-x-3"
        >
          <Checkbox
            id={answer.id}
            disabled
          />
          <Label
            htmlFor={answer.id}
            className="text-sm"
          >
            {answer.text}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
