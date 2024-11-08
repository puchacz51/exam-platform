'use client';

import { FC, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { createTestAction } from '@actions/test/createTest';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import BulletBar from '@/app/[locale]/(dashboard)/test-creator/components/navigation/BulletBar';
import TestCreatorForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorTestForm';
import TestCreatorQuestionsForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsForm';

const TestCreator: FC = () => {
  const isInitialConfig = useTestContext(
    (state) => state.isAddedGeneralConfiguration
  );
  const questionGroups = useTestContext((state) => state.questionGroups);

  const test = useTestContext((state) => state.test);

  const isTestConfiguratorOpen = useTestContext(
    (state) => state.isTestConfiguratorOpen
  );
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );

  const hasQuestions = questionGroups.some(
    (group) => !!group?.questions?.length
  );

  const handleFinishTest = useCallback(() => {
    createTestAction(test, questionGroups);
  }, [test, questionGroups]);

  return (
    <div className="container mx-auto p-4">
      <BulletBar />

      {isTestConfiguratorOpen && (
        <div className="mt-6">
          <TestCreatorForm />
        </div>
      )}

      {isInitialConfig && (
        <div className="space-y-6">
          {questionGroups.map(
            (group) =>
              currentQuestionGroupId === group.id && (
                <div key={group.id}>
                  <TestCreatorQuestionsForm className="mt-4" />
                </div>
              )
          )}

          {hasQuestions && (
            <Button onClick={handleFinishTest}>Zakończ tworzenie testu</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestCreator;
