import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TestConfigurationBullet from '@/app/[locale]/(dashboard)/test-creator/components/navigation/TestConfigurationBullet';
import QuestionGroupBullet from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionGroupBullet';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';

const GroupList: FC = () => {
  const {
    questionGroups,
    isQuestionGroupConfiguratorOpen,
    isAddedGeneralConfiguration,
    addQuestionGroup,
    setIsSortFormOpen,
  } = useTestContext((state) => state);

  const isSingleGroup = questionGroups.length <= 1;

  return (
    <div
      className={cn(
        'flex min-h-[60px] items-center space-x-4',
        isQuestionGroupConfiguratorOpen && 'col-start-1'
      )}
    >
      <TestConfigurationBullet />
      {questionGroups.map((group) => (
        <QuestionGroupBullet
          key={group.id}
          group={group}
        />
      ))}
      {isAddedGeneralConfiguration && (
        <>
          <Button
            className="cursor-pointer whitespace-nowrap"
            onClick={addQuestionGroup}
          >
            {isSingleGroup ? 'Podziel test na grupy' : 'Dodaj Grupę Pytań'}
          </Button>
          <Button
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setIsSortFormOpen(true)}
          >
            Zmień ułożenie
          </Button>
        </>
      )}
    </div>
  );
};

export default GroupList;
