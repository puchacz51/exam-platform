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

import { GroupFlowResponse } from '../../../../../../types/attempt';

interface TestAttemptGroupsProps {
  userAttemptFlow: GroupFlowResponse;
}

const TestAttemptGroups: FC<TestAttemptGroupsProps> = ({ userAttemptFlow }) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const testAssignmentId = params.id as string;
  const { allowGoBack } = userAttemptFlow?.testSettings;

  const {
    currentGroupId,
    questionsGroups,
    attemptId,
    nextGroupId,
    previousGroupId,
  } = userAttemptFlow;
  const currentGroup = questionsGroups.find(
    (group) => group.id === currentGroupId
  );
  const methods = useForm<TestAttemptFormData>({
    defaultValues: {
      questions:
        prepareQuestionToAttempt(currentGroup?.questions || [], {
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

  const moveToQuestionGroup = (questionId: string) => {
    router.replace(`${pathname}?groupId=${questionId}`, {
      scroll: false,
    });
  };

  const onSubmit = async (data: TestAttemptFormData) => {
    const formattedAnswers = prepareFormSubmission(data, attemptId);

    const result = await createAnswer(testAssignmentId, formattedAnswers);

    const points =
      !!result.data && 'points' in result.data && result.data.points;

    if (points) {
      points.forEach((point) => {
        if (currentGroup?.questions.some((q) => q.id === point.questionId)) {
          setValue(`questions.${point.questionId}.points`, point.points);
        }

        setValue(`questions.${point.questionId}.points`, point.points);
      });
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
                <h2 className="text-xl font-bold">
                  {/* {currentGroup?.name || 'test'} */}
                </h2>
                <div className="space-y-6">
                  {currentGroup?.questions.map((question, questionIndex) => (
                    <QuestionItem
                      key={question.id}
                      mode="solve"
                      question={question as Question}
                      questionIndex={questionIndex}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6">
              {allowGoBack && previousGroupId && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {}}
                >
                  Go back
                </Button>
              )}
              {isSubmitted ? (
                <Button
                  type="button"
                  onClick={() =>
                    nextGroupId && moveToQuestionGroup(nextGroupId)
                  }
                  disabled={isSubmitting}
                  className="px-6"
                >
                  {nextGroupId ? 'next group' : 'show results'}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6"
                >
                  {nextGroupId ? 'Submit Question' : 'Submit Test'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
      <div className="h-20" />
    </FormProvider>
  );
};

export default TestAttemptGroups;
