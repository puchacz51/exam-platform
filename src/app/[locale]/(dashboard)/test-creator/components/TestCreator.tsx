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
  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const isAiGeneratorOpen = useTestContext((state) => state.isAiGeneratorOpen);

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
                  {currentQuestion && (
                    <div>
                      <h2 className="mb-4 text-2xl font-bold text-blue-900">
                        Edit Question
                      </h2>
                      <TestCreatorQuestionsEditForm />
                    </div>
                  )}
                  {isAiGeneratorOpen && (
                    <div>
                      <h2 className="mb-4 text-2xl font-bold text-slate-900">
                        AI Generator
                      </h2>
                      <AiQuestionGenerator />
                    </div>
                  )}
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                      Add New Question
                    </h2>
                    <TestCreatorQuestionsAddForm />
                  </div>
                </div>
              )
          )}

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
    </div>
  );
};

export default TestCreator;
