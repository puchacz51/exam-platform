import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '../../store/storeContext';
import { TestCreatorQuestionGroup } from '../../types/questionGroup';

interface QuestionGroupBulletProps {
  questionGroup: TestCreatorQuestionGroup;
}

const QuestionGroupBullet: FC<QuestionGroupBulletProps> = ({
  questionGroup,
}) => {
  const { currentQuestionGroup, setCurrentQuestionGroup } = useTestContext(
    (state) => state
  );
  const setIsQuestionGroupConfiguratorOpen = useTestContext(
    (state) => state.setIsQuestionGroupConfiguratorOpen
  );

  const handleClick = () => {
    if (currentQuestionGroup?.id === questionGroup.id) {
      setIsQuestionGroupConfiguratorOpen(true);
      return;
    }

    setCurrentQuestionGroup(questionGroup.id);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-colors duration-200 ease-in-out ${
        currentQuestionGroup?.id === questionGroup.id
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
      aria-label={`Select question group: ${questionGroup.name}`}
    >
      <span
        className={`h-3 w-3 rounded-full transition-colors duration-200 ease-in-out ${
          currentQuestionGroup?.id === questionGroup.id
            ? 'bg-white'
            : 'bg-gray-400'
        }`}
      />
      <span>{questionGroup.name}</span>
    </Button>
  );
};

export default QuestionGroupBullet;
