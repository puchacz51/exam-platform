import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type BooleanQuestion } from '@/types/questions/booleanQuestion';
import { TestAttemptFormDataBoolean } from '@/types/forms/testAttemptForm';

interface BooleanQuestionViewProps {
  mode?: 'view';
  question: BooleanQuestion;
}

interface BooleanQuestionSolveProps {
  mode?: 'solve';
  question: BooleanQuestion;
}

type BooleanQuestionProps =
  | BooleanQuestionViewProps
  | BooleanQuestionSolveProps;

const BooleanQuestion: FC<BooleanQuestionProps> = ({
  question,
  mode = 'view',
}) => {
  const { id } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { setValue, getValues, watch } =
    useFormContext<TestAttemptFormDataBoolean>();

  const selectedValue =
    mode === 'solve'
      ? watch(fieldKey)?.[0]?.value?.toString()
      : 'booleanAnswer' in question
        ? question.booleanAnswer?.toString()
        : undefined;

  const handleRadioChange = (value: string) => {
    const questionValue = getValues('questions')[id];
    if (!questionValue?.type) {
      setValue(`questions.${id}.type`, 'BOOLEAN');
    }
    setValue(fieldKey, [{ subQuestionId: id, value: value === 'true' }]);
  };

  return (
    <RadioGroup
      className="flex space-x-6"
      value={selectedValue}
      onValueChange={(value) => mode === 'solve' && handleRadioChange(value)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="true"
          id={`${id}-true`}
          disabled={mode === 'view'}
        />
        <Label htmlFor={`${id}-true`}>True</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="false"
          id={`${id}-false`}
          disabled={mode === 'view'}
        />
        <Label htmlFor={`${id}-false`}>False</Label>
      </div>
    </RadioGroup>
  );
};

export default BooleanQuestion;
