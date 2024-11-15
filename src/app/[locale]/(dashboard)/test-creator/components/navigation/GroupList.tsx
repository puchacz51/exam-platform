import { FC } from 'react';

import { ListX, Plus, Sparkles } from 'lucide-react';

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
    setIsAiGeneratorOpen,
  } = useTestContext((state) => state);

  const isSingleGroup = questionGroups.length <= 1;

  return (
    <div
      className={cn(
        'flex min-h-[60px] max-w-full items-center gap-4 rounded-lg bg-white p-2 shadow-sm',
        isQuestionGroupConfiguratorOpen && 'col-start-1'
      )}
    >
      <div className="flex items-center gap-4 overflow-x-auto">
        <TestConfigurationBullet />
        {questionGroups.map((group) => (
          <QuestionGroupBullet
            key={group.id}
            group={group}
          />
        ))}
      </div>
      {isAddedGeneralConfiguration && (
        <div className="ml-auto flex shrink-0 gap-2">
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
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsAiGeneratorOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          >
            <Sparkles className="h-4 w-4" />
            AI Generator
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupList;
