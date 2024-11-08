import { FC } from 'react';

import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const BooleanQuestion: FC<{ question: QuestionType }> = ({ question }) => {
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
