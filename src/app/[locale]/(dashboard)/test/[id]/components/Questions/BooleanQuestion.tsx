import { FC } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type BooleanQuestion } from '@/types/questions/booleanQuestion';

interface BooleanQuestionViewProps {
  mode?: 'view';
  question: BooleanQuestion;
}

interface BooleanQuestionSolveProps {
  mode?: 'solve';
  question: BooleanQuestion;
}

type BooleanQuestionProps =
  | BooleanQuestionViewProps
  | BooleanQuestionSolveProps;

const BooleanQuestion: FC<BooleanQuestionProps> = ({ question, mode }) => {
  const defaultValue = 'booleanAnswer' in question && !!question.booleanAnswer;

  return (
    <RadioGroup className="flex space-x-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="true"
          checked={defaultValue}
          id={`${question.id}-true`}
          disabled={mode === 'view'}
        />
        <Label htmlFor={`${question.id}-true`}>True</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          checked={!defaultValue}
          value="false"
          id={`${question.id}-false`}
          disabled={mode === 'view'}
        />
        <Label htmlFor={`${question.id}-false`}>False</Label>
      </div>
    </RadioGroup>
  );
};

export default BooleanQuestion;
