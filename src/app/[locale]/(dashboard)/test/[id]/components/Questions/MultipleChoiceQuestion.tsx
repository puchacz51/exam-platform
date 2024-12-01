import { FC } from 'react';

import { Label } from '@/components/ui/label';
import {
  type MultipleChoiceQuestion,
  MultipleChoiceQuestionWithoutAnswers,
} from '@/types/questions/multipleChoiceQuestion';
import { Checkbox } from '@/components/ui/checkbox';

interface MultipleChoiceQuestionViewProps {
  question: MultipleChoiceQuestion;
  mode?: 'view';
}

interface MultipleChoiceQuestionSolveProps {
  question: MultipleChoiceQuestionWithoutAnswers;
  mode?: 'solve';
}

type MultipleChoiceQuestionProps =
  | MultipleChoiceQuestionViewProps
  | MultipleChoiceQuestionSolveProps;

const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({
  question,
  mode = 'view',
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
            checked={!!answer.isCorrect}
            disabled={mode === 'view'}
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
