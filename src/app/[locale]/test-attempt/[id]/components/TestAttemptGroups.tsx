'use client';

import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { QuestionItem } from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionItem';
import { Question } from '@/types/questions';
import { TestAttemptFormData } from '@/types/forms/testAttemptForm';
import { AnswerInput } from '@/types/answers/testAttemptAnswers';
import { prepareFormSubmission } from '@/utils/formSubmissionUtils';
import { createAnswer } from '@actions/attempt/createAnswer';
import { AssignmentWithTest } from '@actions/test/getAssignmentWithTest';
import { useGetAssignmentWithTestQuery } from '@/hooks/useGetAssignmentWithTest';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TestAttemptGroupsProps {
  testAssignmentWithTest: AssignmentWithTest;
}

const TestAttemptGroups: FC<TestAttemptGroupsProps> = ({
  testAssignmentWithTest,
}) => {
  const {
    // isNoMoreQuestionsToAnswer,
    test: { settings },
  } = testAssignmentWithTest;
  const { allowGoBack } = settings;
  const testAssignmentId = testAssignmentWithTest.id;
  const { refetch } = useGetAssignmentWithTestQuery(testAssignmentId, {});
  const { questionGroups, attempts } = testAssignmentWithTest;
  const attemptId = attempts[0].id;

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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TestAttemptFormData) => {
    const formattedAnswers = prepareFormSubmission(data, attemptId);
    console.log(formattedAnswers);

    const result = await createAnswer(testAssignmentId, formattedAnswers);

    if (!result.error) {
      refetch();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Test Assignment</h1>
        <Card className="overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6"
          >
            <div className="space-y-8">
              {questionGroups.map((group) => (
                <div
                  key={group.id}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold">{group.name}</h2>
                  <div className="space-y-6">
                    {group.questions.map((question, questionIndex) => (
                      <QuestionItem
                        key={question.id}
                        mode="solve"
                        question={question as Question}
                        questionIndex={questionIndex}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6">
              {allowGoBack && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    /* Go back */
                  }}
                >
                  Go back
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
              <Button
                variant="secondary"
                type="button"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </FormProvider>
  );
};

export default TestAttemptGroups;
