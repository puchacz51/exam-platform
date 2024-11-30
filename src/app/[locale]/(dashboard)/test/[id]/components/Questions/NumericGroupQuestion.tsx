import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { type NumericGroupQuestion } from '@/types/questions/numericGroupQuestion';

interface NumericGroupQuestionProps {
  question: NumericGroupQuestion;
}

const NumericGroupQuestion: FC<NumericGroupQuestionProps> = ({ question }) => {
  return (
    <div className="grid gap-4">
      {question?.groupSubQuestions?.map((subQuestion) => (
        <Card
          key={subQuestion.text}
          className="bg-gray-50"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="font-medium">{subQuestion.text}</div>
            <div className="flex flex-col items-end gap-1">
              <div className="min-w-[100px] rounded-md bg-white p-2 text-center shadow-sm">
                {subQuestion.numericAnswer}
              </div>
              {subQuestion.tolerance && (
                <div className="text-sm text-muted-foreground">
                  ±{subQuestion.tolerance}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NumericGroupQuestion;
