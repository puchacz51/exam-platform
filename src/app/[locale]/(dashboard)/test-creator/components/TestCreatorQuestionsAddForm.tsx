import React, { FC, HTMLAttributes } from 'react';

import { randomBytes } from 'crypto';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HelpCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { TestCreatorQuestion } from '@/types/test-creator/question';
import TestCreatorQuestionsForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsForm';
import { questionTypeSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { QuestionType } from '@/types/test-creator/answers';

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
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );

  const addQuestion = useTestContext((state) => state.addQuestion);

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: { ...initialQuestion },
    shouldUnregister: true,
  });

  const handleQuestionTypeSubmit = async (
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
        'w-full overflow-hidden border-t-4 border-t-emerald-500 bg-white shadow-lg',
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-between border-b bg-emerald-50 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Question Details
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
      </div>

      <div className="p-6">
        <FormProvider {...form}>
          <TestCreatorQuestionsForm
            handleSubmit={handleQuestionTypeSubmit}
            className="space-y-8"
          />
        </FormProvider>
      </div>
    </Card>
  );
};

export default TestCreatorQuestionsAddForm;
