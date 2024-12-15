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
import { AnswerInput } from '@/types/answers/testAttemptAnswers';

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
        prepareQuestionToForm(currentGroup?.questions || [], { attemptId }) ||
        [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const moveToQuestionGroup = (questionId: string) => {
    router.replace(`${pathname}?groupId=${questionId}`, {
      scroll: false,
    });
  };

  const onSubmit = async (data: TestAttemptFormData) => {
    const formattedAnswers = prepareFormSubmission(data, attemptId);

    const result = await createAnswer(testAssignmentId, formattedAnswers);

    if (!result.error) {
      if (nextGroupId) {
        moveToQuestionGroup(nextGroupId);
      }
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
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6"
              >
                {nextGroupId ? 'Next' : 'Submit'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <div className="h-20" />
    </FormProvider>
  );
};

export default TestAttemptGroups;

const prepareQuestionToForm = (
  questions: GroupFlowResponse['questionsGroups'][number]['questions'],
  { attemptId }: { attemptId: string }
) =>
  questions.reduce(
    (acc, question) => {
      if (question.questionType === 'ORDER') {
        acc[question.id] = {
          type: 'ORDER',
          questionId: question.id,
          attemptId: attemptId,
          items:
            question.orderItems.map((item) => ({
              id: item.id,
              position: item.order,
              order: item.order,
              text: item.text,
              questionId: question.id,
            })) || [],
        };
      }

      if (question.questionType === 'MATCHING') {
        acc[question.id] = {
          type: 'MATCHING',
          questionId: question.id,
          attemptId,
          pairs:
            question.matchingPairs.map((pair) => ({
              key: pair.key,
              value: pair.value,
              id: pair.id,
              questionId: question.id,
            })) || [],
        };
      }

      if (
        question.questionType === 'SINGLE_CHOICE' ||
        question.questionType === 'MULTIPLE_CHOICE'
      ) {
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          answers:
            question.answers.map((answer) => ({
              answerId: answer.id,
            })) || [],
        };
      }

      if (
        question.questionType === 'NUMERIC' ||
        question.questionType === 'NUMERIC_GROUP'
      ) {
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          answers:
            question.GSQ.map((answer) => ({
              subQuestionId: answer.id,
              value: answer.numericAnswer,
            })) || [],
        };
      }

      if (
        question.questionType === 'BOOLEAN_GROUP' ||
        question.questionType === 'BOOLEAN'
      ) {
        acc[question.id] = {
          type: question.questionType,
          questionId: question.id,
          attemptId,
          answers: question.GSQ.map((subQuestion) => ({
            subQuestionId: subQuestion.id,
            booleanAnswer: subQuestion.booleanAnswer,
          })),
        };
      }

      if (question.questionType === 'OPEN') {
        acc[question.id] = {
          type: 'OPEN',
          questionId: question.id,
          attemptId,
          answer: {
            text: '',
          },
        };
      }

      return acc;
    },
    {} as Record<string, AnswerInput>
  );
