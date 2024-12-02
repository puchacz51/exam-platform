import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import {
  type OpenQuestion,
  OpenQuestionWithoutAnswers,
} from '@/types/questions/openQuestion';
import { TestAttemptFormDataOpen } from '@/types/forms/testAttemptForm';

interface OpenQuestionViewProps {
  mode?: 'view';
  question: OpenQuestion;
}

interface OpenQuestionSolveProps {
  mode?: 'solve';
  question: OpenQuestionWithoutAnswers;
}

type OpenQuestionProps = OpenQuestionViewProps | OpenQuestionSolveProps;

const OpenQuestion: FC<OpenQuestionProps> = ({ question, mode = 'view' }) => {
  const { id } = question;
  const fieldKey = `questions.${id}.answer` as const;
  const { setValue, watch } = useFormContext<TestAttemptFormDataOpen>();

  const handleInputChange = (value: string) => {
    setValue(`questions.${id}.answer`, {
      text: value,
    });
  };

  const answerValue =
    mode === 'solve'
      ? watch(fieldKey)?.text || ''
      : 'answer' in question
        ? question.answer?.text || ''
        : '';

  return (
    <Textarea
      placeholder="Enter your answer"
      className="w-full"
      disabled={mode === 'view'}
      value={answerValue}
      onChange={(e) => mode === 'solve' && handleInputChange(e.target.value)}
    />
  );
};

export default OpenQuestion;
