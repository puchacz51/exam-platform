import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  type SingleChoiceQuestion,
  SingleChoiceQuestionWithoutAnswers,
} from '@/types/questions/singleChoiceQuestion';
import { TestAttemptFormDataSingleChoice } from '@/types/forms/testAttemptForm';

interface SingleChoiceQuestionViewProps {
  mode?: 'view';
  question: SingleChoiceQuestion;
}

interface SingleChoiceQuestionSolveProps {
  mode?: 'solve';
  question: SingleChoiceQuestionWithoutAnswers;
}

type SingleChoiceQuestionProps =
  | SingleChoiceQuestionViewProps
  | SingleChoiceQuestionSolveProps;

const SingleChoiceQuestion: FC<SingleChoiceQuestionProps> = ({
  question,
  mode = 'view',
}) => {
  const { id, answers } = question;
  const fieldKey = `questions.${id}.answers` as const;

  const { setValue, getValues, watch } =
    useFormContext<TestAttemptFormDataSingleChoice>();

  const selectedAnswerId =
    mode === 'solve'
      ? watch(fieldKey)?.[0]?.answerId
      : answers.find((answer) => 'isCorrect' in answer && answer.isCorrect)?.id;

  const handleRadioChange = (answerId: string) => {
    const questionValue = getValues('questions')[id];

    if (!questionValue?.type) {
      setValue(`questions.${id}.type`, 'SINGLE_CHOICE');
    }

    setValue(fieldKey, [{ answerId }]);
  };

  return (
    <RadioGroup
      className="space-y-3"
      onValueChange={(value) => mode === 'solve' && handleRadioChange(value)}
      value={selectedAnswerId ? selectedAnswerId : undefined}
    >
      {answers?.map((answer) => (
        <div
          key={answer.id}
          className="flex items-center space-x-3"
        >
          <RadioGroupItem
            value={answer.id}
            id={answer.id}
            disabled={mode === 'view'}
          />
          <Label
            htmlFor={answer.id}
            className="text-sm"
          >
            {answer.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default SingleChoiceQuestion;
