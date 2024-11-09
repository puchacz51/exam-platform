
import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { type BooleanGroupQuestion } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';

interface BooleanGroupQuestionProps {
  question: BooleanGroupQuestion;
}

const BooleanGroupQuestion: FC<BooleanGroupQuestionProps> = ({ question }) => {
  return (
    <div className="grid gap-4">
      {question?.subQuestions?.map((subQuestion) => (
        <Card
          key={subQuestion.text}
          className="bg-gray-50"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="font-medium">{subQuestion.text}</div>
            <div className="min-w-[100px] rounded-md bg-white p-2 shadow-sm text-center">
              {subQuestion.correctAnswer ? 'True' : 'False'}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooleanGroupQuestion;