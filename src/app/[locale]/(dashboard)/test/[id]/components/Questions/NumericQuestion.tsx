import { FC } from 'react';

import { Input } from '@/components/ui/input';
import {
  type NumericQuestion,
  NumericQuestionWithoutSubQuestions,
} from '@/types/questions/numericQuestion';

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
  console.log(question, 1111);
  const { tolerance } = question.groupSubQuestions[0];
  const defaultValue =
    'numericAnswer' in question.groupSubQuestions[0]
      ? !!question.groupSubQuestions[0].numericAnswer
        ? question.groupSubQuestions[0].numericAnswer.toString()
        : 'Podaj poprawną odpowiedź'
      : 'Podaj poprawną odpowiedź';

  return (
    <div className="space-y-3">
      <Input
        type="number"
        placeholder={defaultValue}
        className="max-w-xs"
        disabled={mode === 'view'}
      />
      {tolerance && (
        <p className="text-sm text-muted-foreground">Tolerance: ±{tolerance}</p>
      )}
    </div>
  );
};

export default NumericQuestion;
