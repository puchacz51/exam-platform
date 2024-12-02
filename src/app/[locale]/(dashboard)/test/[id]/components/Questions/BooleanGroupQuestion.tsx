import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

const BooleanGroupQuestion: FC<BooleanGroupQuestionProps> = ({
  question,
  mode,
}) => {
  return (
    <div className="grid gap-4">
      {question?.groupSubQuestions?.map((subQuestion) => (
        <Card
          key={subQuestion.text}
          className="max-w-full overflow-hidden bg-gray-50 transition-colors hover:bg-gray-100"
        >
          <CardContent className="grid items-center gap-2 p-4 md:grid-cols-[1fr_max-content]">
            <div className="">
              <p className="whitespace-break-spaces font-medium">
                {subQuestion.text}
              </p>
            </div>
            <RadioGroup
              className="justify-around flex space-x-6 rounded-lg border bg-white p-2 shadow-sm"
              defaultValue={subQuestion.booleanAnswer ? 'true' : 'false'}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="true"
                  id={`${subQuestion.text}-true`}
                  disabled={mode === 'view'}
                  className="text-primary"
                />
                <Label
                  htmlFor={`${subQuestion.text}-true`}
                  className="cursor-pointer text-sm font-medium text-gray-600"
                >
                  True
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="false"
                  id={`${subQuestion.text}-false`}
                  disabled={mode === 'view'}
                  className="text-primary"
                />
                <Label
                  htmlFor={`${subQuestion.text}-false`}
                  className="cursor-pointer text-sm font-medium text-gray-600"
                >
                  False
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default BooleanGroupQuestion;
