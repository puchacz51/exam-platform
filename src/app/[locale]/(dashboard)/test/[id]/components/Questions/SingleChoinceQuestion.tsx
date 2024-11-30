import { FC } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { type SingleChoiceQuestion } from '@/types/questions/singleChoiceQuestion';

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion;
}

const SingleChoiceQuestion: FC<SingleChoiceQuestionProps> = ({ question }) => {
  return (
    <RadioGroup className="space-y-3">
      {question.answers?.map((answer) => (
        <div
          key={answer.id}
          className="flex items-center space-x-3"
        >
          <RadioGroupItem
            value={answer.id}
            id={answer.id}
            disabled
            checked={!!answer.isCorrect}
          />
          <Label
            htmlFor={answer.id}
            className="text-sm"
          >
            {answer.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default SingleChoiceQuestion;
