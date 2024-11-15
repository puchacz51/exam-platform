import React, { FC, HTMLAttributes } from 'react';

import { randomBytes } from 'crypto';

import { Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import {
  QuestionType,
  questionTypeSchema,
} from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { TestCreatorQuestion } from '@/app/[locale]/(dashboard)/test-creator/types/question';
import TestCreatorQuestionsForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsForm';

const initialQuestion = {
  text: '',
  isPublic: false,
  points: 1,
};
interface TestCreatorQuestionsFormProps
  extends HTMLAttributes<HTMLDivElement> {}

const TestCreatorQuestionsAddForm: FC<TestCreatorQuestionsFormProps> = ({
  className,
}) => {
  const isQuestionConfiguratorOpen = useTestContext(
    (state) => state.isQuestionConfiguratorOpen
  );
  const setIsQuestionConfiguratorOpen = useTestContext(
    (state) => state.setIsQuestionConfiguratorOpen
  );
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );

  const addQuestion = useTestContext((state) => state.addQuestion);

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: { ...initialQuestion },
    shouldUnregister: true,
  });

  const handleQuestionTypeSubmit = (
    data: z.infer<typeof questionTypeSchema>
  ) => {
    if (!currentQuestionGroupId) return;

    const questionId = randomBytes(16).toString('hex');
    const questionWithId: TestCreatorQuestion = {
      ...data,
      id: questionId,
      groupId: currentQuestionGroupId,
    };

    addQuestion(questionWithId);
    form.reset({ ...initialQuestion });
  };

  return (
    <Card
      className={cn(
        'w-full overflow-hidden border-t-4 border-t-emerald-500 bg-white backdrop-blur-sm transition-all duration-200',
        !isQuestionConfiguratorOpen && 'rounded-lg py-2',
        isQuestionConfiguratorOpen && 'transform-gpu shadow-lg hover:shadow-xl',
        className
      )}
    >
      <div
        className={cn(
          'relative z-10 flex items-center justify-between p-4',
          !isQuestionConfiguratorOpen && 'mb-0',
          isQuestionConfiguratorOpen && 'border-b bg-emerald-50'
        )}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Question
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 cursor-help text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">
                  Create and configure your test question here. Choose the type,
                  set points, and add your content.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          onClick={() =>
            setIsQuestionConfiguratorOpen(!isQuestionConfiguratorOpen)
          }
          variant="ghost"
          size="sm"
          className="hover:bg-emerald-100/50"
        >
          {isQuestionConfiguratorOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {isQuestionConfiguratorOpen && (
        <div className="p-6 duration-300 animate-in slide-in-from-top">
          <FormProvider {...form}>
            <Form {...form}>
              <TestCreatorQuestionsForm
                handleSubmit={handleQuestionTypeSubmit}
                className="space-y-8"
              />
            </Form>
          </FormProvider>
        </div>
      )}
    </Card>
  );
};

export default TestCreatorQuestionsAddForm;
