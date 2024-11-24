'use client';

import { FC, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { createTestAction } from '@actions/test/createTest';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import BulletBar from '@/app/[locale]/(dashboard)/test-creator/components/navigation/BulletBar';
import TestCreatorForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorTestForm';
import { AiQuestionGenerator } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/AiQuestionGenerator';
import TestCreatorQuestionsAddForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsAddForm';
import TestCreatorQuestionsEditForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsEditForm';
import { QuestionEditModal } from './modals/QuestionEditModal';

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
    <div className="container mx-auto w-full p-4">
      <BulletBar />

      {isTestConfiguratorOpen && (
        <div className="mt-6">
          <TestCreatorForm />
        </div>
      )}

      {isInitialConfig && (
        <div className="mt-8 w-full space-y-8">
          {questionGroups.map(
            (group) =>
              currentQuestionGroupId === group.id && (
                <div
                  key={group.id}
                  className="flex w-full flex-col space-y-8"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Add New Question
                      </h2>
                    </div>
                    <TestCreatorQuestionsAddForm />
                  </div>
                </div>
              )
          )}

          <AiQuestionGenerator />

          {hasQuestions && (
            <div className="flex justify-end border-t pt-8">
              <Button
                onClick={handleFinishTest}
                size="lg"
                className="px-8"
              >
                Finish Test Creation
              </Button>
            </div>
          )}
        </div>
      )}

      <QuestionEditModal />
    </div>
  );
};

export default TestCreator;
