'use client';
import { useState } from 'react';

import { AlertCircle } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useGetTest from '@/app/[locale]/(dashboard)/test-creator/hooks/test/useGetTest';
import TestProgress from '@/app/[locale]/(dashboard)/test/[id]/components/TestProgress';
import { TestNavigation } from '@/app/[locale]/(dashboard)/test/[id]/components/TestNavigation';
import { QuestionGroup } from '@/app/[locale]/(dashboard)/test/[id]/components/Questions/QuestionGroup';

interface TestViewerProps {
  testId: string;
}

const TestViewer = ({ testId }: TestViewerProps) => {
  const t = useTranslations('dashboard.testViewer');
  const form = useForm();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const { test } = useGetTest(testId);
  const testSettings = {
    changeable: true,
    timeLimit: 30,
    requireAllAnswers: true,
  };

  if (!test) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('error.title')}</AlertTitle>
        <AlertDescription>{t('error.description')}</AlertDescription>
      </Alert>
    );
  }

  const questionGroups = test.QG || [];
  const currentGroup = questionGroups[currentGroupIndex];
  const totalGroups = questionGroups.length;
  const progress = ((currentGroupIndex + 1) / totalGroups) * 100;

  const handleNextGroup = () => {
    if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex((prev) => prev + 1);
    }
  };

  const handlePreviousGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex((prev) => prev - 1);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="mx-auto max-w-4xl p-4">
        <Card className="shadow-lg">
          <CardHeader className="border-b" />
          <TestProgress
            timeLimit={testSettings.timeLimit}
            currentGroupIndex={currentGroupIndex}
            totalGroups={totalGroups}
            progress={progress}
          />

          <CardContent className="p-6">
            <QuestionGroup
              group={currentGroup}
              currentGroupIndex={currentGroupIndex}
            />
          </CardContent>

          <CardFooter>
            <TestNavigation
              currentGroupIndex={currentGroupIndex}
              totalGroups={totalGroups}
              onPrevious={handlePreviousGroup}
              onNext={handleNextGroup}
            />
          </CardFooter>
        </Card>
      </div>
    </FormProvider>
  );
};

export default TestViewer;
