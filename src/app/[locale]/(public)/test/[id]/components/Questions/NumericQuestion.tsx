import { QuestionType } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { Input } from '@/components/ui/input';
import { FC } from 'react';

const NumericQuestion: FC<{ question: QuestionType }> = ({ question }) => {
  return (
    <div className="space-y-3">
      <Input
        type="number"
        placeholder="Enter numeric value"
        disabled
        className="max-w-xs"
      />
      {question.numericQuestion && (
        <p className="text-sm text-muted-foreground">
          Tolerance: ±{question.numericQuestion.tolerance}
        </p>
      )}
    </div>
  );
};

export default NumericQuestion;