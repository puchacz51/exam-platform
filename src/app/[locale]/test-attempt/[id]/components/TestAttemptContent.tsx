'use client';

import { FC, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { QuestionItem } from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionItem';
import { Question } from '@/types/questions';
import { submitAnswers } from '@actions/attempt/submitAnswers';
import { TestAttemptFormData } from '@/types/forms/testAttemptForm';
import { AnswerInput } from '@/types/answers/testAttemptAnswers';

export interface AttemptQuestionGroup {
  id: string;
  name: string | null;
  questions: Question[];
}

interface TestAttemptContentProps {
  questionGroups: AttemptQuestionGroup[];
  attemptId: string;
}

export const TestAttemptContent: FC<TestAttemptContentProps> = ({
  questionGroups,
  attemptId,
}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<TestAttemptFormData>({
    defaultValues: {
      questions: questionGroups.reduce(
        (acc, group) => {
          group.questions.forEach((question) => {
            acc[question.id] = {
              attemptId,
              questionId: question.id,
              type: question.questionType,
            };
          });
          return acc;
        },
        {} as Record<string, Partial<AnswerInput>>
      ),
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: TestAttemptFormData) => {
    console.log(data);
    try {
      const formattedAnswers = Object.entries(data.questions).map(
        ([questionId, attempt]) => {
          if ('answers' in attempt) {
            return {
              questionId: questionId,
              type: attempt.type,
              answers: attempt.answers,
              attemptId,
            };
          }
        }
      );

      const result = await submitAnswers(formattedAnswers as AnswerInput[]);

      if (result.error) {
        setSubmitError(result.error);
        return;
      }
    } catch (error) {
      setSubmitError('Failed to submit answers');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto p-4"
      >
        <h1 className="mb-4 text-2xl font-bold">Test Assignment Data</h1>
        <pre className="overflow-auto rounded-lg bg-gray-100 p-4">
          {questionGroups.map((group) => (
            <div key={group.id}>
              <h2 className="mb-2 text-xl font-bold">{group.name}</h2>
              {group.questions.map((question, questionIndex) => (
                <QuestionItem
                  key={question.id}
                  mode="solve"
                  question={question as Question}
                  questionIndex={questionIndex}
                />
              ))}
            </div>
          ))}
        </pre>
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 text-red-600">
            Please answer all required questions
          </div>
        )}
        {submitError && <div className="mt-4 text-red-600">{submitError}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </form>
    </FormProvider>
  );
};
