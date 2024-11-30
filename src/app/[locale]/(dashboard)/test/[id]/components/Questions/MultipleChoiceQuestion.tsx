import { FC } from 'react';

import { Label } from '@/components/ui/label';
import { type MultipleChoiceQuestion } from '@/types/questions/multipleChoiceQuestion';
import { Checkbox } from '@/components/ui/checkbox';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion;
}
const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({
  question,
}) => {
  console.log(question);
  return (
    <div className="space-y-3">
      {question.answers?.map((answer, id) => (
        <div
          key={answer.text}
          className="flex items-center space-x-3"
        >
          <Checkbox
            id={id.toLocaleString()}
            checked={!!answer.isCorrect}
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
