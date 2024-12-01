import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  type NumericGroupQuestion,
  NumericGroupQuestionWithoutAnswer,
} from '@/types/questions/numericGroupQuestion';

interface NumericGroupQuestionViewProps {
  question: NumericGroupQuestion;
  mode?: 'view';
}

interface NumericGroupQuestionSolveProps {
  question: NumericGroupQuestionWithoutAnswer;
  mode?: 'solve';
}

type NumericGroupQuestionProps =
  | NumericGroupQuestionViewProps
  | NumericGroupQuestionSolveProps;

const NumericGroupQuestion: FC<NumericGroupQuestionProps> = ({
  question,
  mode = 'view',
}) => {
  return (
    <div className="grid gap-4">
      {question?.groupSubQuestions?.map((subQuestion) => {
        const value =
          'numericAnswer' in subQuestion ? subQuestion.numericAnswer : 0;
        return (
          <Card
            key={subQuestion.text}
            className="bg-gray-50"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="font-medium">{subQuestion.text}</div>
              <div className="flex flex-col items-end gap-1">
                <Input
                  type="number"
                  className="w-[100px] text-center"
                  value={!!value ? value : ''}
                  disabled={mode === 'view'}
                />
                {subQuestion.tolerance && (
                  <div className="text-sm text-muted-foreground">
                    ±{subQuestion.tolerance}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NumericGroupQuestion;
