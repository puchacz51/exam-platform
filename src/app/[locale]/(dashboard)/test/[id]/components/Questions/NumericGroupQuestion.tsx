import { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  type NumericGroupQuestion,
  NumericGroupQuestionWithoutAnswer,
} from '@/types/questions/numericGroupQuestion';
import { TestAttemptFormDataNumericGroup } from '@/types/forms/testAttemptForm';

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
  const { id, groupSubQuestions } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { control, setValue, getValues, watch } =
    useFormContext<TestAttemptFormDataNumericGroup>();
  const { fields } = useFieldArray({
    control,
    name: fieldKey,
  });

  const handleInputChange = (subQuestionId: string, value: string) => {
    const questionValue = getValues('questions')[id];
    if (!questionValue?.type) {
      setValue(`questions.${id}.type`, 'NUMERIC_GROUP');
    }
    const index = fields.findIndex(
      (field) => field.subQuestionId === subQuestionId
    );

    if (index !== -1) {
      setValue(`${fieldKey}.${index}.value`, Number(value));
    } else {
      setValue(fieldKey, [...fields, { subQuestionId, value: Number(value) }]);
    }
  };

  const answers = watch(fieldKey) || [];

  return (
    <div className="grid gap-4">
      {groupSubQuestions?.map((subQuestion) => {
        const answer = answers.find(
          (ans) => ans.subQuestionId === subQuestion.id
        );
        return (
          <Card
            key={subQuestion.id}
            className="max-w-full overflow-hidden bg-gray-50 transition-colors hover:bg-gray-100"
          >
            <CardContent className="grid items-center gap-2 p-4 md:grid-cols-[1fr_max-content]">
              <div>
                <p className="whitespace-break-spaces font-medium">
                  {subQuestion.text}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="rounded-lg border bg-white p-2 shadow-sm">
                  <Input
                    type="number"
                    className="w-[100px] text-center"
                    value={
                      'numericAnswer' in subQuestion
                        ? !!subQuestion.numericAnswer
                          ? subQuestion.numericAnswer.toString()
                          : ''
                        : undefined
                    }
                    disabled={mode === 'view'}
                    onChange={(e) =>
                      mode === 'solve' &&
                      handleInputChange(subQuestion.id, e.target.value)
                    }
                  />
                </div>
                {subQuestion.tolerance && (
                  <div className="text-sm text-muted-foreground text-center">
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
