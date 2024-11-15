'use client';

import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { questionTypeEnum } from '@schema/questions';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { Question } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { generateQuestions } from '@actions/test/ai/model';

import { TypeSelectionSection } from './TypeSelectionSection';
import { ConfigurationSection } from './ConfigurationSection';
import { GeneratedQuestionsView } from './GeneratedQuestionsView';
import { type AiGeneratorFormData, aiGeneratorSchema } from './schema';

export const AiQuestionGenerator = () => {
  const setIsAiGeneratorOpen = useTestContext(
    (state) => state.setIsAiGeneratorOpen
  );
  const [step, setStep] = useState<'select' | 'configure'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questionGroups = useTestContext((state) => state.questionGroups);
  const addQuestion = useTestContext((state) => state.addQuestion);
  const aiQuestions = useTestContext((state) => state.aiQuestions);
  const setAiQuestions = useTestContext((state) => state.setAiQuestions);
  const clearAiQuestions = useTestContext((state) => state.clearAiQuestions);
  const categories = useTestContext(
    (state) => state.testConfiguration.categories
  );

  const form = useForm<AiGeneratorFormData>({
    resolver: zodResolver(aiGeneratorSchema),
    defaultValues: {
      topic: '',
      detail: '',
      selectedTypes: [],
      category: undefined,
    },
  });

  const selectedTypes = form.watch('selectedTypes');
  const totalQuestions = selectedTypes.reduce((sum, qt) => sum + qt.count, 0);

  const handleTypeSelect = (type: string) => {
    const current = form.getValues('selectedTypes');
    if (current.some((t) => t.type === type)) {
      form.setValue(
        'selectedTypes',
        current.filter((t) => t.type !== type)
      );
    } else {
      form.setValue('selectedTypes', [...current, { type, count: 1 }]);
    }
  };

  const handleRandomSelect = () => {
    const availableTypes = questionTypeEnum.enumValues;
    const randomCount = Math.floor(Math.random() * 3) + 1;
    const randomTypes = [...availableTypes]
      .sort(() => Math.random() - 0.5)
      .slice(0, randomCount)
      .map((type) => ({ type, count: Math.floor(12 / randomCount) }));
    form.setValue('selectedTypes', randomTypes);
  };

  const handleAcceptQuestions = useCallback(
    (groupId: string, selectedQuestions: Question[]) => {
      if (!selectedQuestions.length || !aiQuestions) return;

      // Batch all updates
      const batch = () => {
        // Add questions
        selectedQuestions.forEach((question) => {
          addQuestion({
            ...question,
            groupId,
            id: `question-${Date.now()}-${Math.random()}`,
          });
        });

        const selectedIds = new Set(selectedQuestions.map((q) => q.id));
        const remaining = aiQuestions.filter((q) => !selectedIds.has(q.id));
        setAiQuestions(remaining.length > 0 ? remaining : null);
      };

      batch();
    },
    [aiQuestions, addQuestion, setAiQuestions]
  );

  const handleRejectQuestions = useCallback(() => {
    clearAiQuestions();
  }, [clearAiQuestions]);

  const onSubmit = async (data: AiGeneratorFormData) => {
    setIsLoading(true);
    setError(null);
    console.log('data', data);
    try {
      const questions = await generateQuestions(data);
      setAiQuestions(questions);
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
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Question Generator</CardTitle>
                  <CardDescription>
                    Create questions using AI assistance
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAiGeneratorOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Hide AI Generator</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={step}
                onValueChange={(v) => setStep(v as 'select' | 'configure')}
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
                    form={form}
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
                  onClick={() => setStep('select')}
                  className="hover:bg-slate-100"
                >
                  ← Back
                </Button>
              )}
              <div className="ml-auto">
                <Button
                  type="submit"
                  disabled={
                    !form.getValues('topic') ||
                    totalQuestions === 0 ||
                    isLoading
                  }
                  className="min-w-[200px]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⚪</span> Generating...
                    </span>
                  ) : (
                    'Generate Questions'
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {aiQuestions && aiQuestions.length > 0 && (
        <GeneratedQuestionsView
          key={aiQuestions.map((q) => q.id).join(',')}
          questions={aiQuestions}
          questionGroups={questionGroups}
          onAccept={handleAcceptQuestions}
          onReject={handleRejectQuestions}
        />
      )}
    </div>
  );
};
