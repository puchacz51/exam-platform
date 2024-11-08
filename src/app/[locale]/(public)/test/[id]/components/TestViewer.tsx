'use client';
import { useState } from 'react';

import { AlertCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useGetTest from '@/app/[locale]/(dashboard)/test-creator/hooks/test/useGetTest';
import { TestHeader } from '@/app/[locale]/(public)/test/[id]/components/TestHeader';
import TestProgress from '@/app/[locale]/(public)/test/[id]/components/TestProgress';
import QuestionGroup from '@/app/[locale]/(dashboard)/test-creator/components/navigation/drag-and-drop/QuestionGroup';
import { TestNavigation } from '@/app/[locale]/(public)/test/[id]/components/TestNavigation';

interface TestViewerProps {
  testId: string;
}

const TestViewer = ({ testId }: TestViewerProps) => {
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
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Test not found. Please check the test ID and try again.
        </AlertDescription>
      </Alert>
    );
  }

  const questionGroups = test.questionGroups || [];
  const currentGroup = questionGroups[currentGroupIndex];
  const totalGroups = questionGroups.length;
  const progress = ((currentGroupIndex + 1) / totalGroups) * 100;

  const handleNextGroup = () => {
    if (testSettings.requireAllAnswers) {
      // const currentQuestions = currentGroup.questions || [];
      // const answeredQuestions = currentQuestions.filter((q) => answers[q.id]);
    }

    if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex((prev) => prev + 1);
    }
  };

  const handlePreviousGroup = () => {
    if (!testSettings.changeable && currentGroupIndex > 0) {
      setCurrentGroupIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <TestHeader
            title={test.title}
            description={test.description}
            accessType={test.accessType}
            category={test.category}
            isChangeable={testSettings.changeable}
          />
        </CardHeader>

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
            isChangeable={testSettings.changeable}
            onPrevious={handlePreviousGroup}
            onNext={handleNextGroup}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestViewer;
