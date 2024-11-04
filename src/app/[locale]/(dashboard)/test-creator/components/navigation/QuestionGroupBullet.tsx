import React, { FC } from 'react';

import { Button } from '@/components/ui/button';

import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { TestCreatorQuestionGroup } from '@/app/[locale]/(dashboard)/test-creator/types/questionGroup';

interface QuestionGroupBulletProps {
  group: TestCreatorQuestionGroup;
}

const QuestionGroupBullet: FC<QuestionGroupBulletProps> = ({ group }) => {
  const { currentQuestionGroupId, setCurrentQuestionGroup } = useTestContext(
    (state) => state
  );

  const handleClick = () => {
    setCurrentQuestionGroup(group.id);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-colors duration-200 ease-in-out ${
        currentQuestionGroupId === group.id
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
    >
      <span
        className={`h-3 w-3 rounded-full transition-colors duration-200 ease-in-out ${
          currentQuestionGroupId === group.id ? 'bg-white' : 'bg-gray-400'
        }`}
      />
      <span>{group.name}</span>
    </Button>
  );
};

export default QuestionGroupBullet;
