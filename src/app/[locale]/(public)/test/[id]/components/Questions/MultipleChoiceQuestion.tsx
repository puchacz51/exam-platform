import { FC } from 'react';

import { Checkbox } from '@radix-ui/react-checkbox';

import { Label } from '@/components/ui/label';
import { type MultipleChoiceQuestion } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion;
}
const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({
  question,
}) => {
  return (
    <div className="space-y-3">
      {question.answers?.map((answer, id) => (
        <div
          key={answer.text}
          className="flex items-center space-x-3"
        >
          <Checkbox
            id={id.toLocaleString()}
            disabled
          />
          <Label
            htmlFor={id.toLocaleString()}
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
