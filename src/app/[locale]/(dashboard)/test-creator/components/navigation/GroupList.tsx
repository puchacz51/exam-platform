import { FC } from 'react';

import { ListX, Plus } from 'lucide-react';

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
        'flex min-h-[60px] items-center gap-4 rounded-lg bg-white p-2 shadow-sm',
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
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-gray-50"
            onClick={addQuestionGroup}
          >
            <Plus className="h-4 w-4" />
            <span>
              {isSingleGroup ? 'Podziel test na grupy' : 'Dodaj Grupę Pytań'}
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-gray-50"
            onClick={() => setIsSortFormOpen(true)}
          >
            <ListX className="h-4 w-4" />
            <span>Zmień ułożenie</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupList;
