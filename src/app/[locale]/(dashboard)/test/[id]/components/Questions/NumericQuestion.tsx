import { FC } from 'react';

import { Input } from '@/components/ui/input';
import { type NumericQuestion } from '@/types/test/questionTypes';

interface NumericQuestionProps {
  question: NumericQuestion;
}

const NumericQuestion: FC<NumericQuestionProps> = ({ question }) => {
  const { tolerance, numericAnswer } = question.groupSubQuestions[0];
  return (
    <div className="space-y-3">
      <Input
        type="number"
        placeholder="Enter numeric value"
        className="max-w-xs"
        disabled
        value={numericAnswer?.toString()}
      />
      {tolerance && (
        <p className="text-sm text-muted-foreground">Tolerance: ±{tolerance}</p>
      )}
    </div>
  );
};

export default NumericQuestion;
