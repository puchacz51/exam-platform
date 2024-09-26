'use client';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../store/storeContext';
import TestCreatorForm from './TestCreatorTestForm';
import TestCreatorQuestionsForm from './questions/TestCreatorQuestionsForm';

const TestCreator: React.FC = () => {
  const [step, setStep] = useState<'test' | 'questions'>('questions');
  const [questionCount, setQuestionCount] = useState(0);

  const test = useTestContext((state) => state.test);
  const addQuestion = useTestContext((state) => state.addQuestion);
  const setTest = useTestContext((state) => state.setTest);

  const handleTestSubmit = useCallback(
    (testData: Partial<typeof test>) => {
      setTest(testData);
      setStep('questions');
    },
    [setTest]
  );

  const handleQuestionSubmit = useCallback(
    (questionData: any) => {
      addQuestion(questionData);
      setQuestionCount((prevCount) => prevCount + 1);
    },
    [addQuestion]
  );

  const handleFinishTest = useCallback(() => {
    console.log('Test creation finished');
  }, []);

  return (
    <div className="container mx-auto p-4">
      {step === 'test' && (
        <TestCreatorForm
          onSubmit={handleTestSubmit}
          initialData={test}
        />
      )}
      {step === 'questions' && (
        <>
          <h2 className="mb-4 text-xl font-bold">
            Pytanie {questionCount + 1}
          </h2>
          <TestCreatorQuestionsForm  />
          {questionCount > 0 && (
            <Button
              className="mt-4"
              onClick={handleFinishTest}
            >
              Zakończ tworzenie testu
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TestCreator;
