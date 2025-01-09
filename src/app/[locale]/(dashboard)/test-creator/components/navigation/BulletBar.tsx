import { cn } from '@/lib/utils';
import DragDropQuestionGroups from '@/app/[locale]/(dashboard)/test-creator/components/navigation/drag-and-drop/DragDropQuestionGroups';
import { useTestContext } from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import TestCreatorQuestionGroupForm from '@/app/[locale]/(dashboard)/test-creator/components/TestCreatorQuestionsGroupForm';
import GroupList from '@/app/[locale]/(dashboard)/test-creator/components/navigation/GroupList';
import QuestionList from '@/app/[locale]/(dashboard)/test-creator/components/navigation/QuestionList';

const BulletBar = () => {
  const {
    currentQuestionGroupId,
    isQuestionGroupConfiguratorOpen,
    isSortFormOpen,
  } = useTestContext((state) => state);

  return (
    <div
      className={cn(
        'grid max-w-full gap-2 overflow-x-hidden',
        isQuestionGroupConfiguratorOpen && 'md:grid-cols-2'
      )}
    >
      {!isSortFormOpen && <GroupList />}
      {currentQuestionGroupId && !isSortFormOpen && <QuestionList />}
      {isQuestionGroupConfiguratorOpen && !isSortFormOpen && (
        <TestCreatorQuestionGroupForm />
      )}
      {isSortFormOpen && <DragDropQuestionGroups />}
    </div>
  );
};

export default BulletBar;
