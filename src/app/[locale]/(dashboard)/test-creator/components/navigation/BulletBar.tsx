import { cn } from '@/lib/utils';

import { useTestContext } from '../../store/storeContext';
import TestCreatorQuestionGroupForm from '../TestCreatorQuestionsGroupForm';
import GroupList from './GroupList';
import QuestionList from './QuestionList';

const BulletBar = () => {
  const { currentQuestionGroupId, isQuestionGroupConfiguratorOpen } =
    useTestContext((state) => state);

  return (
    <div
      className={cn(
        'grid gap-6',
        isQuestionGroupConfiguratorOpen && 'md:grid-cols-2'
      )}
    >
      <GroupList />
      {currentQuestionGroupId && <QuestionList />}
      {isQuestionGroupConfiguratorOpen && <TestCreatorQuestionGroupForm />}
    </div>
  );
};

export default BulletBar;
