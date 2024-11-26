'use client';

import { FC, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { createTestAction } from '@actions/test/createTest';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import BulletBar from '@/app/[locale]/(dashboard)/test-creator/components/navigation/BulletBar';
import TestCreatorForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorTestForm';
import { AiQuestionGenerator } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/AiQuestionGenerator';
import TestCreatorQuestionsAddForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsAddForm';
import { QuestionEditModal } from '@/app/[locale]/(dashboard)/test-creator/components/modals/QuestionEditModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from '@/i18n/routing';

const TestCreator: FC = () => {
  const router = useRouter();
  const isInitialConfig = useTestContext(
    (state) => state.isAddedGeneralConfiguration
  );

  const isTestConfiguratorOpen = useTestContext(
    (state) => state.isTestConfiguratorOpen
  );
  const setIsTestConfiguratorOpen = useTestContext(
    (state) => state.setIsTestConfiguratorOpen
  );
  const questionGroups = useTestContext((state) => state.questionGroups);
  const test = useTestContext((state) => state.test);
  const currentQuestionGroupId = useTestContext(
    (state) => state.currentQuestionGroupId
  );
  const hasQuestions = questionGroups.some(
    (group) => !!group?.questions?.length
  );

  const handleFinishTest = useCallback(async () => {
    const { success, data, errors, error } = await createTestAction(
      test,
      questionGroups
    );
    console.log('success', success, data, error, errors);

    if (success && data?.id) {
      router.push({ pathname: '/test/[id]', params: { id: 'new' } });
    }
  }, [test, questionGroups]);

  return (
    <div className="container mx-auto w-full p-4">
      <BulletBar />

      <div className="mt-6">
        {!isInitialConfig ? (
          <TestCreatorForm />
        ) : (
          <Dialog
            open={isTestConfiguratorOpen}
            onOpenChange={(state) => {
              setIsTestConfiguratorOpen(state);
            }}
          >
            <DialogContent className="flex h-[90vh] max-w-4xl flex-col p-0">
              <DialogHeader className="flex-shrink-0 border-b px-6 py-4">
                <DialogTitle>Konfiguracja testu</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">
                <div className="px-6 py-4">
                  <TestCreatorForm />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

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
