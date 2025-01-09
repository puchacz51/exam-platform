import { FC } from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('test.questions.boolean');
  const { id } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { setValue, watch } = useFormContext<TestAttemptFormDataBoolean>();
  const selectedValue =
    mode === 'solve'
      ? watch(fieldKey)?.[0]?.value?.toString()
      : 'answers' in question
        ? 'isCorrect' in question.answers[0]
          ? question.answers[0].isCorrect?.toString()
          : undefined
        : undefined;

  const handleRadioChange = (value: string) => {
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
        <Label htmlFor={`${id}-true`}>{t('true')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="false"
          id={`${id}-false`}
          disabled={mode === 'view'}
        />
        <Label htmlFor={`${id}-false`}>{t('false')}</Label>
      </div>
    </RadioGroup>
  );
};

export default BooleanQuestion;
