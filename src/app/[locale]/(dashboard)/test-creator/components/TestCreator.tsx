'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../store/storeContext';
import TestCreatorForm from './TestCreatorTestForm';
import TestCreatorQuestionForm from './TestCreatorQuestionForm';

const TestCreator: React.FC = () => {
  const [step, setStep] = useState<'test' | 'questions'>('test');
  const [questionCount, setQuestionCount] = useState(0);
  const { test, setTest, addQuestion } = useTestContext((state) => ({
    test: state.test,
    setTest: state.setTest,
    addQuestion: state.addQuestion,
  }));



  return (
    <div className="container mx-auto p-4">
      {step === 'questions' && (
        <>
          <h2 className="mb-4 text-xl font-bold">
            Pytanie {questionCount + 1}
          </h2>
          {questionCount > 0 && (
            <Button
              className="mt-4"
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
