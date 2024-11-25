'use client';

import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { questionTypeEnum } from '@schema/questions';
import { generateQuestions } from '@actions/test/ai/model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { ConfigurationSection } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/ConfigurationSection';
import { TypeSelectionSection } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/TypeSelectionSection';
import { GeneratedQuestionsView } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/GeneratedQuestionsView';
import {
  AiGeneratorFormData,
  aiGeneratorSchema,
} from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/schema';
import { Question } from '@/types/test/questionTypes';
import { QuestionType } from '@/types/test-creator/answers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const AiQuestionGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questionGroups = useTestContext((state) => state.questionGroups);
  const setAiQuestions = useTestContext((state) => state.setAiQuestions);
  const aiQuestions = useTestContext((state) => state.aiQuestions);

  const categories = useTestContext(
    (state) => state.testConfiguration.categories
  );

  const methods = useForm<AiGeneratorFormData>({
    resolver: zodResolver(aiGeneratorSchema),
    defaultValues: {
      topic: '',
      detail: '',
      selectedTypes: [],
      language: 'en',
      category: undefined,
      step: 'select',
      selectedGroupId: '',
      selectedQuestionIds: [],
      generatedQuestions: null,
    },
  });

  const { setValue, watch, getValues } = methods;
  const selectedTypes = watch('selectedTypes');
  const step = watch('step');
  const totalQuestions = selectedTypes.reduce((sum, qt) => sum + qt.count, 0);

  const handleTypeSelect = (type: string) => {
    const current = getValues('selectedTypes');
    if (current.some((t) => t.type === type)) {
      setValue(
        'selectedTypes',
        current.filter((t) => t.type !== type)
      );
    } else {
      setValue('selectedTypes', [
        ...current,
        { type: type as QuestionType['questionType'], count: 1 },
      ]);
    }
  };

  const handleRandomSelect = () => {
    const availableTypes = questionTypeEnum.enumValues;
    const randomCount = Math.floor(Math.random() * 3) + 1;
    const randomTypes = [...availableTypes]
      .sort(() => Math.random() - 0.5)
      .slice(0, randomCount)
      .map((type) => ({ type, count: Math.floor(12 / randomCount) }));
    setValue('selectedTypes', randomTypes);
  };

  const onSubmit = async (data: AiGeneratorFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: questions, error } = await generateQuestions(data);
      if (!!questions) {
        setAiQuestions(questions as Question[]);
        setValue('step', 'configure');
      }

      if (error) {
        throw new Error(error);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate questions. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isOpen = useTestContext((state) => state.isAiGeneratorOpen);
  const setIsOpen = useTestContext((state) => state.setIsAiGeneratorOpen);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col gap-0 p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>AI Question Generator</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <FormProvider {...methods}>
            <div className="space-y-6 p-6">
              <Card className="w-full border-0 shadow-none">
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <CardContent>
                    <Tabs
                      value={step}
                      onValueChange={(v) =>
                        setValue('step', v as 'select' | 'configure')
                      }
                    >
                      <TabsList className="mb-6 grid w-full grid-cols-2">
                        <TabsTrigger
                          type="button"
                          value="select"
                        >
                          1. Select Types
                        </TabsTrigger>
                        <TabsTrigger
                          type="button"
                          value="configure"
                          disabled={selectedTypes.length === 0}
                        >
                          2. Configure Questions
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="select">
                        <TypeSelectionSection
                          selectedTypes={selectedTypes}
                          onTypeSelect={handleTypeSelect}
                          onRandomSelect={handleRandomSelect}
                        />
                      </TabsContent>

                      <TabsContent value="configure">
                        <ConfigurationSection
                          totalQuestions={totalQuestions}
                          categories={categories}
                        />
                      </TabsContent>
                    </Tabs>

                    {error && (
                      <Alert
                        variant="destructive"
                        className="mt-4"
                      >
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="mt-4 flex items-center gap-4 border-t pt-4">
                    {step === 'configure' && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setValue('step', 'select')}
                        className="hover:bg-slate-100"
                      >
                        ← Back
                      </Button>
                    )}
                    <div className="ml-auto">
                      <Button
                        type="submit"
                        disabled={
                          !methods.getValues('topic') ||
                          totalQuestions === 0 ||
                          isLoading
                        }
                        className="min-w-[200px]"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin">⚪</span>{' '}
                            Generating...
                          </span>
                        ) : (
                          'Generate Questions'
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </Card>

              {aiQuestions && aiQuestions.length > 0 && (
                <GeneratedQuestionsView questionGroups={questionGroups} />
              )}
            </div>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiQuestionGenerator;
