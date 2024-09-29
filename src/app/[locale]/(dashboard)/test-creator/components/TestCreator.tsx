'use client';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../store/storeContext';
import TestCreatorForm from './TestCreatorTestForm';
import TestCreatorQuestionsForm from './questions/TestCreatorQuestionsForm';

const TestCreator: React.FC = () => {
  const test = useTestContext((state) => state.test);

  const handleFinishTest = useCallback(() => {
    console.log('Test creation finished');
  }, []);

  return (
    <div className="container mx-auto p-4">
      <TestCreatorForm />
      {test.title && (
        <>
          <TestCreatorQuestionsForm className="mt-6" />
          {test.questions.length > 0 && (
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
