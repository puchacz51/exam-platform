import React, { FC, HTMLAttributes, useEffect } from 'react';

import { z } from 'zod';
import { HelpCircle, X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
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
import TestCreatorQuestionsForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsForm';
import { Button } from '@/components/ui/button';

const initialQuestion = {
  text: '',
  isPublic: false,
  points: 1,
};
interface TestCreatorQuestionsFormProps
  extends HTMLAttributes<HTMLDivElement> {}

const TestCreatorQuestionsEditForm: FC<TestCreatorQuestionsFormProps> = ({
  className,
}) => {
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );
  const currentQuestion = useTestContext((state) => state.currentQuestion);

  const updateQuestion = useTestContext((state) => state.updateQuestion);
  const setCurrentQuestion = useTestContext(
    (state) => state.setCurrentQuestion
  );

  const form = useForm<QuestionType>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: { ...currentQuestion },
    shouldUnregister: true,
  });

  useEffect(() => {
    if (currentQuestion) {
      form.reset(currentQuestion);
    }
  }, [currentQuestion]);

  const handleQuestionTypeSubmit = (
    data: z.infer<typeof questionTypeSchema>
  ) => {
    if (!currentQuestionGroupId || !currentQuestion) return;

    updateQuestion(currentQuestionGroupId, currentQuestion.id, data);
    form.reset({ ...initialQuestion });
    return;
  };

  const handleClose = () => {
    setCurrentQuestion(null);
  };

  return (
    <Card
      className={cn(
        'w-full overflow-hidden border-t-4 border-t-blue-500 bg-white shadow-lg transition-all duration-200',
        'relative transform-gpu hover:shadow-xl',
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-between border-b bg-blue-50 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Edit Question</h2>
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
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8 rounded-full hover:bg-blue-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="p-6">
        <FormProvider {...form}>
          <Form {...form}>
            <TestCreatorQuestionsForm
              handleSubmit={handleQuestionTypeSubmit}
              className="space-y-8"
            />
          </Form>
        </FormProvider>
      </div>
    </Card>
  );
};

export default TestCreatorQuestionsEditForm;
