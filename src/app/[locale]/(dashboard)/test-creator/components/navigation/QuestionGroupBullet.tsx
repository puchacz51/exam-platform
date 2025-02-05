import React, { FC, useState } from 'react';

import { CheckCircle, Circle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import { TestCreatorQuestionGroup } from '@/types/test-creator/questionGroup';
import QuestionGroupSettingsModal from '@/app/[locale]/(dashboard)/test-creator/components/modals/QuestionGroupSettingsModal';

interface QuestionGroupBulletProps {
  group: TestCreatorQuestionGroup;
}

const QuestionGroupBullet: FC<QuestionGroupBulletProps> = ({ group }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { currentQuestionGroupId, setCurrentQuestionGroup } = useTestContext(
    (state) => state
  );

  const handleClick = () => {
    if (currentQuestionGroupId === group.id) {
      return setIsSettingsModalOpen(true);
    }

    setCurrentQuestionGroup(group.id);
  };
  const isActive = currentQuestionGroupId === group.id;

  return (
    <>
      <Button
        variant="outline"
        onClick={handleClick}
        className={`flex items-center space-x-3 rounded-full px-5 py-3 transition-all duration-300 ease-in-out ${
          isActive
            ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg'
            : 'bg-gray-200 text-black hover:bg-gray-300'
        }`}
      >
        {isActive ? (
          <CheckCircle className="h-5 w-5 text-white" />
        ) : (
          <Circle className="h-5 w-5 text-gray-400" />
        )}
        <span className="font-semibold">{group.name}</span>
      </Button>
      <QuestionGroupSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};

export default QuestionGroupBullet;
