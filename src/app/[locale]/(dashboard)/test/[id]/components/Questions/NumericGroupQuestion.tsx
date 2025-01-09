import { FC } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

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
  const { id, GSQ } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { control } = useFormContext<TestAttemptFormDataNumericGroup>();
  const { fields, update, append, remove } = useFieldArray({
    control,
    name: fieldKey,
  });
  console.log(fields);
  const handleInputChange = (subQuestionId: string, value: string) => {
    const index = fields.findIndex(
      (field) => field.subQuestionId === subQuestionId
    );
    if (index !== -1) {
      if (!value) return remove(index);

      update(index, { subQuestionId, value: Number(value) });
    } else {
      append({ subQuestionId, value: Number(value) });
    }
  };

  return (
    <div className="grid gap-4">
      {GSQ?.map((subQuestion) => {
        const fieldsAnswer = fields.find(
          (field) => field.subQuestionId === subQuestion.id
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
                    defaultValue={
                      !!fieldsAnswer?.value ? fieldsAnswer.value.toString() : ''
                    }
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
                  <div className="text-center text-sm text-muted-foreground">
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
