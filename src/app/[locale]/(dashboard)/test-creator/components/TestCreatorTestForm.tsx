import React, { FC, HTMLAttributes, useState } from 'react';

import { Form, FormProvider, useForm } from 'react-hook-form';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Layout,
  LockKeyhole,
  Medal,
  Save,
  Settings2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestCreatorTestScoring from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestScoring';
import TestCreatorTestBasic from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestBasic';
import TestCreatorTestAccess from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestAccess';
import TestCreatorTestNavigation from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestNavigation';
import TestCreatorTestDisplay from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestDisplay';
import TestCreatorTestResults from '@/app/[locale]/(dashboard)/test-creator/components/test/TestCreatorTestResults';

const TestCreatorForm: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isOpen, setIsOpen] = useState(true);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',

      accessType: 'CODE',
      accessCode: '',

      navigationMode: 'FREE',
      allowGoBack: true,
      confirmBeforeGroupChange: true,

      scoringSystem: 'STANDARD',
      allowPartialPoints: true,
      minimumPointsPerQuestion: 0,
      negativePointsPercentage: 0,
      roundingPrecision: 2,

      questionDisplayMode: 'ALL',
      questionsPerPage: 1,
      shuffleQuestionsInGroup: false,
      shuffleAnswers: false,

      showProgressBar: true,
      showTimeRemaining: true,
      showQuestionPoints: true,
      allowQuestionFlagging: true,
      autosaveInterval: 60,

      showPartialResults: false,
      showCorrectAnswers: false,
      showPointsPerQuestion: true,
      showFinalScore: true,
    },
  });

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className={cn('bg-white shadow-lg', className)}>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            <CardTitle>Konfiguracja testu</CardTitle>
          </div>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid w-full grid-cols-6">
              <TabsTrigger
                value="basic"
                className="flex items-center gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Podstawowe
              </TabsTrigger>
              <TabsTrigger
                value="access"
                className="flex items-center gap-2"
              >
                <LockKeyhole className="h-4 w-4" />
                Dostęp
              </TabsTrigger>
              <TabsTrigger
                value="navigation"
                className="flex items-center gap-2"
              >
                <Layout className="h-4 w-4" />
                Nawigacja
              </TabsTrigger>
              <TabsTrigger
                value="scoring"
                className="flex items-center gap-2"
              >
                <Medal className="h-4 w-4" />
                Punktacja
              </TabsTrigger>
              <TabsTrigger
                value="display"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Wyświetlanie
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Wyniki
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormProvider {...form}>
                  <TestCreatorTestBasic />
                  <TestCreatorTestAccess />
                  <TestCreatorTestNavigation />
                  <TestCreatorTestScoring />
                  <TestCreatorTestDisplay />
                  <TestCreatorTestResults />
                </FormProvider>
                <div className="flex justify-end border-t pt-6">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                  >
                    Zapisz konfigurację
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default TestCreatorForm;
