import { FC } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { type BooleanQuestion } from '../../../../../../../../types/questionTypes';

interface BooleanQuestionProps {
  question: BooleanQuestion;
}

const BooleanQuestion: FC<BooleanQuestionProps> = ({ question }) => {
  return (
    <RadioGroup className="flex space-x-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="true"
          id={`${question.id}-true`}
          disabled
        />
        <Label htmlFor={`${question.id}-true`}>True</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="false"
          id={`${question.id}-false`}
          disabled
        />
        <Label htmlFor={`${question.id}-false`}>False</Label>
      </div>
    </RadioGroup>
  );
};

export default BooleanQuestion;
