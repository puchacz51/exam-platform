'use client';
import React, { useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../store/storeContext';
import TestCreatorForm from './TestCreatorTestForm';
import TestCreatorQuestionsForm from './questions/TestCreatorQuestionsForm';
import BulletBar from './navigation/BulletBar';
import TestCreatorQuestionGroupForm from './questions/TestCreatorQuestionGroupForm';

const TestCreator: React.FC = () => {
  const test = useTestContext((state) => state.test);
  const questionGroups = useTestContext((state) => state.questionGroups);
  const currentQuestionGroup = useTestContext(
    (state) => state.currentQuestionGroup
  );
  const setCurrentQuestionGroup = useTestContext(
    (state) => state.setCurrentQuestionGroup
  );
  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);

  const handleFinishTest = useCallback(() => {
    console.log('Test creation finished');
    // Here you would typically save the test data
  }, []);

  const handleAddQuestionGroup = useCallback(() => {
    const newGroupOrder = questionGroups.length + 1;
    addQuestionGroup({
      id: `group-${Date.now()}`, // You might want to use a more robust ID generation method
      name: `Group ${newGroupOrder}`,
      order: newGroupOrder,
      maxQuestionPerPage: 1, // Default value, adjust as needed
    });
  }, [questionGroups, addQuestionGroup]);

  useEffect(() => {
    if (test.title && questionGroups.length === 0) {
      handleAddQuestionGroup();
    }
  }, [test.title, questionGroups.length, handleAddQuestionGroup]);

  return (
    <div className="container mx-auto p-4">
      <BulletBar />
      <TestCreatorForm />
      {test.title && (
        <>
          {questionGroups.length > 0 && (
            <Button
              className="mb-2 mt-4"
              onClick={handleAddQuestionGroup}
            >
              Add Question Group
            </Button>
          )}
          {questionGroups.map((group) => (
            <div
              key={group.id}
              className="mt-6"
            >
              <TestCreatorQuestionGroupForm
                group={group}
                isOpen={currentQuestionGroup?.id === group.id}
                onToggle={() => setCurrentQuestionGroup(group.id)}
              />
              {currentQuestionGroup?.id === group.id && (
                <TestCreatorQuestionsForm
                  className="mt-4"
                  groupId={group.id}
                />
              )}
            </div>
          ))}
          {questionGroups.some((group) => group.questions.length > 0) && (
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
