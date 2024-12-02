import { FC } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  type SingleChoiceQuestion,
  SingleChoiceQuestionWithoutAnswers,
} from '@/types/questions/singleChoiceQuestion';

interface SingleChoiceQuestionViewProps {
  mode?: 'view';
  question: SingleChoiceQuestion;
}

interface SingleChoiceQuestionSolveProps {
  mode?: 'solve';
  question: SingleChoiceQuestionWithoutAnswers;
}

type SingleChoiceQuestionProps =
  | SingleChoiceQuestionViewProps
  | SingleChoiceQuestionSolveProps;

const SingleChoiceQuestion: FC<SingleChoiceQuestionProps> = ({
  question,
  mode = 'view',
}) => {
  const getDefaultValue = (answer: {
    isCorrect?: boolean | null;
    [key: string]: unknown;
  }) => {
    return 'isCorrect' in answer ? !!answer.isCorrect : false;
  };

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
            disabled={mode === 'view'}
            defaultChecked={getDefaultValue(answer)}
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
