'use client';

import { FC} from 'react';

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
      <div className="pt-4">
        <h1 className="mb-4 text-2xl font-bold">Test Assignment </h1>
        <Card className="mx-2 max-w-5xl px-1 sm:mx-4 sm:px-2 md:mx-5 lg:mx-auto ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container mx-auto p-4"
          >
            {questionGroups.map((group) => (
              <div key={group.id}>
                <h2 className="mb-2 text-xl font-bold">{group.name}</h2>
                <div className="flex flex-col gap-y-3 py-4 md:gap-y-5">
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
            <div className="mt-4 flex justify-between">
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
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
              <Button
                variant="secondary"
                type="button"
                disabled={isSubmitting}
              >
                next
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </FormProvider>
  );
};

export default TestAttemptGroups;
