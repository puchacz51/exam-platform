'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { aiGeneratorSchema, type AiGeneratorFormData } from './schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { questionTypeEnum } from '@schema/questions';
import { TypeSelectionSection } from './TypeSelectionSection';
import { ConfigurationSection } from './ConfigurationSection';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { GeneratedQuestionsView } from './GeneratedQuestionsView';
import { Question } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { generateQuestions } from '@actions/test/ai/model';

export function AiQuestionGenerator() {
  const [step, setStep] = useState<'select' | 'configure'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<
    Question[] | null
  >(null);

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

  const handleAcceptQuestions = () => {
    if (generatedQuestions) {
      setGeneratedQuestions(null);
      setStep('select');
      form.reset();
    }
  };

  const handleRejectQuestions = () => {
    setGeneratedQuestions(null);
  };

  const onSubmit = async (data: AiGeneratorFormData) => {
    setIsLoading(true);
    setError(null);
    console.log('data', data);
    try {
      const questions = await generateQuestions(data);
      setGeneratedQuestions(questions);
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
              <CardTitle>AI Question Generator</CardTitle>
              <CardDescription>
                Create questions using AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={step}
                onValueChange={(v) => setStep(v as 'select' | 'configure')}
              >
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="select">1. Select Types</TabsTrigger>
                  <TabsTrigger
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
            {JSON.stringify(form.getValues())}
          </form>
        </Form>
      </Card>

      {generatedQuestions && (
        <GeneratedQuestionsView
          questions={generatedQuestions}
          onAccept={handleAcceptQuestions}
          onReject={handleRejectQuestions}
        />
      )}
    </div>
  );
}
