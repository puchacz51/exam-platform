import React, { FC } from 'react';

import { useTestContext } from '../../store/storeContext';
import { QuestionGroup } from '../../store/store';

interface QuestionGroupBulletProps {
  questionGroup: QuestionGroup;
}

const QuestionGroupBullet: FC<QuestionGroupBulletProps> = ({
  questionGroup,
}) => {
  const isQuestionGroupConfiguratorOpen = useTestContext(
    (state) => state.isQuestionGroupConfiguratorOpen
  );
  const currentQuestionGroup = useTestContext(
    (state) => state.currentQuestionGroup
  );
  const setCurrentQuestionGroup = useTestContext(
    (state) => state.setCurrentQuestionGroup
  );

  const handleClick = () => {
    setCurrentQuestionGroup(questionGroup.id);
  };

  return (
    <button
      onClick={handleClick}
      className={`h-3 w-3 rounded-full transition-colors duration-200 ease-in-out ${
        isQuestionGroupConfiguratorOpen ||
        currentQuestionGroup?.id === questionGroup.id
          ? 'bg-green-500'
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      aria-label={`Select question group: ${questionGroup.name}`}
    />
  );
};

export default QuestionGroupBullet;
