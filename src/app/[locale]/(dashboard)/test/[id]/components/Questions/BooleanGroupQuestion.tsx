import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { type BooleanGroupQuestion } from '@/types/questions/booleanGroupQuestion';

interface BooleanGroupQuestionViewProps {
  mode?: 'view';
  question: BooleanGroupQuestion;
}

interface BooleanGroupQuestionSolveProps {
  mode?: 'solve';
  question: BooleanGroupQuestion;
}

type BooleanGroupQuestionProps =
  | BooleanGroupQuestionViewProps
  | BooleanGroupQuestionSolveProps;

const BooleanGroupQuestion: FC<BooleanGroupQuestionProps> = ({ question }) => {
  return (
    <div className="grid gap-4">
      {question?.groupSubQuestions?.map((subQuestion) => (
        <Card
          key={subQuestion.text}
          className="bg-gray-50"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="font-medium">{subQuestion.text}</div>
            <div className="min-w-[100px] rounded-md bg-white p-2 text-center shadow-sm">
              {subQuestion.booleanAnswer ? 'True' : 'False'}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooleanGroupQuestion;
