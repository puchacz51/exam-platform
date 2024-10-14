import React from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../../store/storeContext';
import TestConfigurationBullet from './TestConfigurationBullet';
import QuestionGroupBullet from './QuestionGroupBullet';

const BulletBar = () => {
  const questionGroups = useTestContext((state) => state.questionGroups);

  const addQuestionGroup = useTestContext((state) => state.addQuestionGroup);

  return (
    <div className="my-4 flex items-center space-x-2">
      <TestConfigurationBullet />
      {questionGroups.map((group) => (
        <QuestionGroupBullet
          key={group.id}
          questionGroup={group}
        />
      ))}
      {questionGroups.length > 0 && (
        <Button
          className="mb-2 mt-4"
          onClick={addQuestionGroup}
        >
          Add Group
        </Button>
      )}
    </div>
  );
};

export default BulletBar;
