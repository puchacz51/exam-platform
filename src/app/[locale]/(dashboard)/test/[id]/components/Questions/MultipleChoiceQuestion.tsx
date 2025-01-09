import { FC } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  type MultipleChoiceQuestion,
  MultipleChoiceQuestionWithoutAnswers,
} from '@/types/questions/multipleChoiceQuestion';
import { Checkbox } from '@/components/ui/checkbox';
import { TestAttemptFormDataMultiChoice } from '@/types/forms/testAttemptForm';

interface MultipleChoiceQuestionViewProps {
  question: MultipleChoiceQuestion;
  mode?: 'view';
}

interface MultipleChoiceQuestionSolveProps {
  question: MultipleChoiceQuestionWithoutAnswers;
  mode?: 'solve';
}

type MultipleChoiceQuestionProps =
  | MultipleChoiceQuestionViewProps
  | MultipleChoiceQuestionSolveProps;

const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = ({
  question,
  mode = 'view',
}) => {
  const { id, answers } = question;
  const fieldKey = `questions.${id}.answers` as const;
  const { control } = useFormContext<TestAttemptFormDataMultiChoice>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldKey,
  });

  const handleCheckboxChange = (answerId: string, checked: boolean) => {
    if (checked) {
      append({ answerId });
    } else {
      const index = fields.findIndex((field) => field.answerId === answerId);
      if (index !== -1) {
        remove(index);
      }
    }
  };

  const getIsDefaultAnswerCorrect = (
    answer: MultipleChoiceQuestion['answers'][number]
  ) => {
    return !!answer.isCorrect;
  };

  return (
    <div className="space-y-3">
      {answers?.map((answer) => (
        <div
          key={answer.id}
          className="flex items-center space-x-3"
        >
          <Checkbox
            id={`${id}-${answer.id}`}
            defaultChecked={
              mode === 'view' && getIsDefaultAnswerCorrect(answer)
            }
            disabled={mode === 'view'}
            checked={
              mode === 'solve'
                ? fields.some((field) => field.answerId === answer.id)
                : !!answers.find((ans) => ans.id === answer.id)?.isCorrect
            }
            onCheckedChange={(checked) =>
              mode === 'solve' && handleCheckboxChange(answer.id, !!checked)
            }
          />
          <Label
            htmlFor={`${id}-${answer.id}`}
            className="text-sm"
          >
            {answer.text}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
