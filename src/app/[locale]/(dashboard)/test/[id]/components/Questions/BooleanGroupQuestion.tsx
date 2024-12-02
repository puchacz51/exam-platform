import { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type BooleanGroupQuestion } from '@/types/questions/booleanGroupQuestion';
import { TestAttemptFormDataBooleanGroup } from '@/types/forms/testAttemptForm';

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
  mode = 'view',
}) => {
  const { id, groupSubQuestions } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { control, setValue, getValues, watch } =
    useFormContext<TestAttemptFormDataBooleanGroup>();
  const { fields } = useFieldArray({
    control,
    name: fieldKey,
  });

  const handleRadioChange = (subQuestionId: string, value: string) => {
    const questionValue = getValues('questions')[id];
    if (!questionValue?.type) {
      setValue(`questions.${id}.type`, 'BOOLEAN_GROUP');
    }
    const index = fields.findIndex(
      (field) => field.subQuestionId === subQuestionId
    );

    if (index !== -1) {
      setValue(`${fieldKey}.${index}.value`, value === 'true');
    } else {
      setValue(fieldKey, [...fields, { subQuestionId, value: value === 'true' }]);
    }
  };

  const answers = watch(fieldKey) || [];

  return (
    <div className="grid gap-4">
      {groupSubQuestions?.map((subQuestion) => {
        const answer = answers.find(
          (ans) => ans.subQuestionId === subQuestion.id
        );
        const selectedValue = mode === 'solve'
          ? answer?.value?.toString()
          : subQuestion.booleanAnswer?.toString();

        return (
          <Card
            key={subQuestion.id}
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
                value={selectedValue}
                onValueChange={(value) =>
                  mode === 'solve' && handleRadioChange(subQuestion.id, value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="true"
                    id={`${subQuestion.id}-true`}
                    disabled={mode === 'view'}
                    className="text-primary"
                  />
                  <Label
                    htmlFor={`${subQuestion.id}-true`}
                    className="cursor-pointer text-sm font-medium text-gray-600"
                  >
                    True
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="false"
                    id={`${subQuestion.id}-false`}
                    disabled={mode === 'view'}
                    className="text-primary"
                  />
                  <Label
                    htmlFor={`${subQuestion.id}-false`}
                    className="cursor-pointer text-sm font-medium text-gray-600"
                  >
                    False
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BooleanGroupQuestion;
