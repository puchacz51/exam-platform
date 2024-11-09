import { FC } from 'react';

import { Input } from '@/components/ui/input';
import { type NumericQuestion } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

interface NumericQuestionProps {
  question: NumericQuestion;
}

const NumericQuestion: FC<NumericQuestionProps> = ({ question }) => {
  return (
    <div className="space-y-3">
      <Input
        type="number"
        placeholder="Enter numeric value"
        disabled
        className="max-w-xs"
      />
      {question?.numericQuestions && (
        <p className="text-sm text-muted-foreground">
          Tolerance: ±{question.numericQuestions.tolerance}
        </p>
      )}
    </div>
  );
};

export default NumericQuestion;
