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
import { useToast } from '@/hooks/useToast'; // Import useToast

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
    userAttemptAnswers,
  } = userAttemptFlow;
  const methods = useForm<TestAttemptFormData>({
    defaultValues: {
      questions:
        prepareQuestionToAttempt(questionsGroups[0]?.questions || [], {
          attemptId,
          userAttemptAnswers,
        }) || [],
    },
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = methods;
  const { toast } = useToast();
  const currentQuestionForm = watch(`questions.${currentQuestionId}`);
  console.log(currentQuestionForm);

  const shouldBeDisabled = !allowGoBack && currentQuestionForm?.answered;

  const moveToQuestion = (questionId: string) => {
    console.log('moveToQuestion', questionId);
    router.replace(`${pathname}?questionId=${questionId}`, {
      scroll: false,
    });
  };

  const onSubmit = async (data: TestAttemptFormData) => {
    try {
      const formattedAnswers = prepareFormSubmission(data, attemptId);
      const result = await createAnswer(testAssignmentId, formattedAnswers);

      const points =
        !!result.data && 'points' in result.data && result.data.points;
      const answeredQuestions =
        !!result.data &&
        'answeredQuestions' in result.data &&
        result.data.answeredQuestions;

      if (points) {
        points.forEach((point) => {
          if (point.questionId === currentQuestionId) {
            setValue(`questions.${point.questionId}.points`, point.points);
          }
        });
      }
      if (answeredQuestions) {
        answeredQuestions.forEach((questionId) => {
          setValue(`questions.${questionId}.answered`, true);
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'An unexpected error occurred while submitting your answer.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto max-w-6xl px-1 py-6">
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
                        disableAnswers={!allowGoBack}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              {previousQuestionId && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => moveToQuestion(previousQuestionId as string)}
                >
                  Go back
                </Button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || shouldBeDisabled}
                className="px-6"
              >
               Submit
              </Button>

              <Button
                onClick={() => moveToQuestion(nextQuestionId as string)}
                disabled={isSubmitting}
                className="px-6"
                type="button"
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

export default TestAttemptQuestion;
