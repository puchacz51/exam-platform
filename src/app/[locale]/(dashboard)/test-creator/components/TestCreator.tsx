'use client';
import { FC, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { createTestAction } from '@actions/test/createTest';

import { useTestContext } from '../store/storeContext';
import TestCreatorForm from './TestCreatorTestForm';
import BulletBar from './navigation/BulletBar';
import TestCreatorQuestionsForm from './TestCreatorQuestionsForm';

const TestCreator: FC = () => {
  const isInitialConfig = useTestContext(
    (state) => state.isAddedGeneralConfiguration
  );
  const questionGroups = useTestContext((state) => state.questionGroups);
  const currentQuestionGroup = useTestContext(
    (state) => state.currentQuestionGroupId
  );
  const test = useTestContext((state) => state.test);

  const isTestConfiguratorShowed = useTestContext(
    (state) => state.isTestConfiguratorShowed
  );
  const handleFinishTest = useCallback(() => {
    createTestAction(test, questionGroups);
    console.log('Test creation finished');
  }, []);

  return (
    <div className="container mx-auto p-4">
      <BulletBar />
      {isTestConfiguratorShowed && <TestCreatorForm />}
      {isInitialConfig && (
        <>
          {questionGroups.map((group) => (
            <div
              key={group.id}
              className="mt-6"
            >
              {currentQuestionGroup === group.id && (
                <TestCreatorQuestionsForm className="mt-4" />
              )}
            </div>
          ))}
          {questionGroups.some((group) => !!group?.questions?.length) && (
            <Button
              className="mt-4"
              onClick={handleFinishTest}
            >
              Zakończ tworzenie testu
            </Button>
          )}
        </>
      )}
      {JSON.stringify({ test, questionGroups }, null, 2)}
    </div>
  );
};

export default TestCreator;
