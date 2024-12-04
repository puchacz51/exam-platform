import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import {
  type NumericQuestion,
  NumericQuestionWithoutSubQuestions,
} from '@/types/questions/numericQuestion';
import { TestAttemptFormDataNumeric } from '@/types/forms/testAttemptForm';

interface NumericQuestionViewProps {
  mode?: 'view';
  question: NumericQuestion;
}

interface NumericQuestionSolveProps {
  mode?: 'solve';
  question: NumericQuestionWithoutSubQuestions;
}

type NumericQuestionProps =
  | NumericQuestionViewProps
  | NumericQuestionSolveProps;

const NumericQuestion: FC<NumericQuestionProps> = ({
  question,
  mode = 'view',
}) => {
  const { id, groupSubQuestions } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { setValue, watch } = useFormContext<TestAttemptFormDataNumeric>();

  const handleInputChange = (value: string) => {
    setValue(fieldKey, [
      { subQuestionId: groupSubQuestions[0].id, value: Number(value) },
    ]);
  };

  const answerValue =
    mode === 'solve'
      ? watch(fieldKey)?.[0]?.value || ''
      : 'numericAnswer' in groupSubQuestions[0]
        ? groupSubQuestions[0].numericAnswer?.toString() || ''
        : '';

  const { tolerance } = groupSubQuestions[0];

  return (
    <div className="space-y-3">
      <Input
        type="number"
        className="max-w-xs"
        disabled={mode === 'view'}
        value={answerValue}
        onChange={(e) => mode === 'solve' && handleInputChange(e.target.value)}
      />
      {tolerance && (
        <p className="text-sm text-muted-foreground">Tolerance: ±{tolerance}</p>
      )}
    </div>
  );
};

export default NumericQuestion;
