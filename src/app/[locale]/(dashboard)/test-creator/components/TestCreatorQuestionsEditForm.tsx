import React, { FC, HTMLAttributes, useEffect } from 'react';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import TestCreatorQuestionsForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsForm';
import { questionTypeSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { QuestionType } from '@/types/test-creator/answers';

const initialQuestion = {
  text: '',
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

  return (
    <div className={cn('w-full pb-8', className)}>
      <FormProvider {...form}>
        <Form {...form}>
          <TestCreatorQuestionsForm
            handleSubmit={handleQuestionTypeSubmit}
            className="space-y-6"
          />
        </Form>
      </FormProvider>
    </div>
  );
};

export default TestCreatorQuestionsEditForm;
