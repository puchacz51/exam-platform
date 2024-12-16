'use client';

import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { QuestionItem } from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionItem';
import { Question } from '@/types/questions';
import { TestAttemptFormData } from '@/types/forms/testAttemptForm';
import { prepareFormSubmission } from '@/utils/formSubmissionUtils';
import { createAnswer } from '@actions/attempt/createAnswer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { prepareQuestionToAttempt } from '@/utils/prepareQuestionsToAttempt';

import { QuestionFlowResponse } from '../../../../../../types/attempt';

interface TestAttemptGroupsProps {
  userAttemptFlow: QuestionFlowResponse;
}

const TestAttemptQuestion: FC<TestAttemptGroupsProps> = ({
  userAttemptFlow,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const testAssignmentId = params.id as string;
  const { allowGoBack } = userAttemptFlow?.testSettings;
  const {
    questionsGroups,
    attemptId,
    nextQuestionId,
    previousQuestionId,
    currentQuestionId,
  } = userAttemptFlow;
  const methods = useForm<TestAttemptFormData>({
    defaultValues: {
      questions:
        prepareQuestionToAttempt(questionsGroups[0]?.questions || [], {
          attemptId,
        }) || [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
    setValue,
  } = methods;

  const moveToQuestion = (questionId: string) => {
    router.replace(`${pathname}?questionId=${questionId}`, {
      scroll: false,
    });
  };

  const onSubmit = async (data: TestAttemptFormData) => {
    const formattedAnswers = prepareFormSubmission(data, attemptId);

    const result = await createAnswer(testAssignmentId, formattedAnswers);

    const questionPoints =
      !!result.data &&
      'points' in result.data &&
      result.data.points.find(
        (point) => point.questionId === currentQuestionId
      );

    if (questionPoints) {
      setValue(`questions.${currentQuestionId}.points`, questionPoints.points);
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
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{currentQuestionId}</h2>
                <div className="space-y-6">
                  {questionsGroups[0].questions.map(
                    (question, questionIndex) => (
                      <QuestionItem
                        key={question.id}
                        mode="solve"
                        question={question as Question}
                        questionIndex={questionIndex}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6">
              {allowGoBack && previousQuestionId && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {}}
                >
                  Go back
                </Button>
              )}

              {!isSubmitted ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6"
                >
                  {nextQuestionId ? 'Submit Question' : 'Submit Test'}
                </Button>
              ) : (
                <Button
                  onClick={() => moveToQuestion(nextQuestionId as string)}
                  disabled={isSubmitting}
                  className="px-6"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </FormProvider>
  );
};

export default TestAttemptQuestion;
