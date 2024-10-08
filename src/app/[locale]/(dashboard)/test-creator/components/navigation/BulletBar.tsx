import React from 'react';

import { useTestContext } from '../../store/storeContext';
import TestConfigurationBullet from './TestConfigurationBullet';
import { QuestionGroup } from '../../store/testStore'; // Assuming you've exported this type

const GroupBullet = ({ group, isOpen, onToggle }) => (
  <button
    className={`h-4 w-4 rounded-full ${isOpen ? 'bg-blue-500' : 'bg-gray-300'}`}
    onClick={onToggle}
  />
);

const QuestionBullet = ({ question, isActive }) => (
  <div
    className={`h-3 w-3 rounded-full ${
      isActive ? 'bg-green-500' : 'bg-gray-200'
    }`}
  />
);

const BulletBar = () => {
  const currentQuestion = useTestContext((state) => state.currentQuestion);
  const questionGroups = useTestContext((state) => state.questionGroups);
  const currentQuestionGroup = useTestContext(
    (state) => state.currentQuestionGroup
  );
  const setCurrentQuestionGroup = useTestContext(
    (state) => state.setCurrentQuestionGroup
  );

  const [openGroups, setOpenGroups] = React.useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
    setCurrentQuestionGroup(groupId);
  };

  const isGroupOpen = (groupId: string) => openGroups.includes(groupId);

  return (
    <div className="my-4 flex items-center space-x-2">
      <TestConfigurationBullet />
      {questionGroups.map((group) => (
        <div
          key={group.id}
          className="flex items-center space-x-1"
        >
          <GroupBullet
            group={group}
            isOpen={isGroupOpen(group.id)}
            onToggle={() => toggleGroup(group.id)}
          />
          {isGroupOpen(group.id) && questionGroups.length > 1 && (
            <div className="flex items-center space-x-1">
              {group.questions.map((question) => (
                <QuestionBullet
                  key={question.id}
                  question={question}
                  isActive={currentQuestion?.id === question.id}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BulletBar;
